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
  getAll: async (req, res) => {
    const posts = await blogPostService.getAll();
    return res.status(200).json(posts);
  },
};

module.exports = blogPostController;
