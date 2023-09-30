const { get_blogs_stats, search_blogs } = require('../controllers/blogs.controllers');
const router = require('express').Router();

router.get('/blog-stats', get_blogs_stats)
router.get('/blog-search', search_blogs)

module.exports = router;