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
    console.log(post, 'controller');
    return res.status(201).json(post);
  },
};

module.exports = blogPostController;
