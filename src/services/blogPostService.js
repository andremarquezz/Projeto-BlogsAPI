const Sequelize = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../database/models');
const { ErrorInternalServer } = require('../errors/ErrorInternalServer');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const { ErrorNotFound } = require('../errors/ErrorNotFound');
require('express-async-errors');

const blogPostService = {
  findUser: async (email) => {
    const { dataValues: user } = await User.findOne({ where: { email } });
    if (!user) throw new ErrorNotFound('User não encontrado');
    return user;
  },
  // findPost: async ({ title, content, userId }) => {
  //   const { dataValues } = await BlogPost.findOne({
  //     where: {
  //       title,
  //       content,
  //       userId,
  //     },
  //   });
  //   if (!dataValues) throw new ErrorNotFound('Post não encontrado');
  //   return dataValues;
  // },

  getAll: async () => {
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
  addInIntermediateTable: async (postId, categoryIds, transaction) => {
    try {
      await Promise.all(
        categoryIds.map((categoryId) =>
          PostCategory.create({ postId, categoryId }, { transaction })),
      );
      return true;
    } catch (error) {
      throw new ErrorInternalServer('Problema ao cadastrar postCategory');
    }
  },
  addBlogPost: async ({ title, content, userId, categoryIds }) => {
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
};

module.exports = blogPostService;
