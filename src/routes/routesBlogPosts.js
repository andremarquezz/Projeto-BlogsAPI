const express = require('express');
const blogPostController = require('../controllers/blogPostController');
const { validateInfoBlogPosts } = require('../middlewares/validateInfoBlogPosts');
const { validateToken } = require('../middlewares/validateToken');

const router = express.Router();

router.get('/', validateToken, blogPostController.getAll);
router.get('/:id', validateToken, blogPostController.getOne);
router.post('/', validateToken, validateInfoBlogPosts, blogPostController.addBlogPost);

module.exports = router;
