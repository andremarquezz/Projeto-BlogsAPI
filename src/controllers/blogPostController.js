const blogPostService = require('../services/blogPostService');

const blogPostController = {
  addBlogPost: async (req, res) => {
    const { title, content, categoryIds } = req.body;
    const { email } = res.locals;
    const { id: userId } = await blogPostService.findUser(email);
    const post = await blogPostService.addBlogPost({
      title,
      content,
      userId,
      categoryIds,
    });
    return res.status(201).json(post);
  },
  findAll: async (_req, res) => {
    const posts = await blogPostService.findAll();
    return res.status(200).json(posts);
  },
  findOne: async (req, res) => {
    const { id } = req.params;
    const post = await blogPostService.findOne(id);
    return res.status(200).json(post);
  },
  postByTerm: async (req, res) => {
    const { q: term } = req.query;
    const posts = await blogPostService.postByTerm(term);
    return res.status(200).json(posts);
  },
  editBlogPost: async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.params;
    const { email } = res.locals;
    const editedPost = await blogPostService.editBlogPost({
      title, content, id, email,
    });
    return res.status(200).json(editedPost);
  },
  delBlogPost: async (req, res) => {
    const { id } = req.params;
    const { email } = res.locals;
    await blogPostService.delBlogPost({ id, email });
    return res.status(204).end();
  },
};

module.exports = blogPostController;
