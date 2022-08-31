const express = require('express');
const blogPostController = require('../controllers/blogPostController');
const { validateInfoBlogPosts } = require('../middlewares/validateInfoBlogPosts');
const { validateToken } = require('../middlewares/validateToken');

const router = express.Router();

router.get('/', validateToken, blogPostController.findAll);
router.get('/:id', validateToken, blogPostController.findOne);
router.post('/', validateToken, validateInfoBlogPosts, blogPostController.addBlogPost);
router.put('/:id', validateToken, blogPostController.editBlogPost);

module.exports = router;
