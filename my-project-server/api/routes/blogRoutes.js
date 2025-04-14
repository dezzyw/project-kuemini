const express = require('express');
const router = express.Router();
const { 
  fetchBlogs, 
  addBlog, 
  deleteBlog, 
  updateBlog, 
  getBlogById // optional, kalau kamu pakai useLoaderData
} = require('../controllers/blogController');

router.get('/', fetchBlogs);
router.post('/', addBlog);
router.delete('/:id', deleteBlog);
router.patch('/:id', updateBlog);        // ✅ Route untuk update blog
router.get('/:id', getBlogById);         // ✅ Optional: Route untuk ambil blog by ID

module.exports = router;
