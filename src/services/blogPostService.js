const Sequelize = require('sequelize');
const {
  BlogPost, PostCategory, User, Category,
} = require('../database/models');
const { ErrorInternalServer } = require('../errors/ErrorInternalServer');
const config = require('../database/config/config');
require('express-async-errors');

const sequelize = new Sequelize(config.development);
const { Op } = Sequelize;

const { ErrorNotFound } = require('../errors/ErrorNotFound');
const { ErrorUnauthorized } = require('../errors/ErrorUnauthorized');
const { ErrorBadRequest } = require('../errors/ErrorBadRequest');

const blogPostService = {
  findUser: async (email) => {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new ErrorNotFound('User não encontrado');
    return user.dataValues;
  },
  findAll: async () => {
    const posts = await BlogPost.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        {
          model: Category,
          as: 'categories',
          through: { attributes: [] },
        },
      ],
    });
    return posts;
  },
  findOne: async (id) => {
    const response = await BlogPost.findOne({
      where: { id },
      include: [
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        {
          model: Category,
          as: 'categories',
          through: { attributes: [] },
        },
      ],
    });
    if (!response) throw new ErrorNotFound('Post does not exist');
    return response.dataValues;
  },
  postByTerm: async (term) => BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${term}%` } },
        { content: { [Op.like]: `%${term}%` } },
      ],
    },
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  }),

  addInIntermediateTable: async (postId, categIds, transaction) => {
    try {
      await Promise.all(
        categIds.map((categoryId) => PostCategory.create({ postId, categoryId }, { transaction })),
      );
      return true;
    } catch (error) {
      throw new ErrorInternalServer('Problema ao cadastrar postCategory');
    }
  },
  addBlogPost: async ({
    title, content, userId, categoryIds,
  }) => {
    try {
      const result = await sequelize.transaction(async (transaction) => {
        const post = await BlogPost.create(
          {
            title,
            content,
            userId,
          },
          { transaction },
        );
        await blogPostService.addInIntermediateTable(post.id, categoryIds, transaction);
        return post;
      });
      return result;
    } catch (error) {
      throw new ErrorInternalServer('Problema ao cadastrar post');
    }
  },
  editBlogPost: async ({
    title, content, id, email,
  }) => {
    if (!title || !content) throw new ErrorBadRequest('Some required fields are missing');
    const user = await blogPostService.findUser(email);
    const post = await blogPostService.findOne(id);
    if (post.userId !== user.id) throw new ErrorUnauthorized('Unauthorized user');
    await BlogPost.update(
      {
        title,
        content,
      },
      {
        where: { id, userId: user.id },
      },
    );
    const editedPost = await blogPostService.findOne(id);
    return editedPost;
  },
  delBlogPost: async ({ id, email }) => {
    const user = await blogPostService.findUser(email);
    const post = await blogPostService.findOne(id);
    if (post.userId !== user.id) throw new ErrorUnauthorized('Unauthorized user');
    await BlogPost.destroy({
      where: { id, userId: user.id },
    });
    return true;
  },
};

module.exports = blogPostService;
