const Blog = require('../models/Blog');

const fetchBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Gagal ambil blog', error: err.message });
  }
};

const addBlog = async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.status(201).json({ message: 'Blog ditambahkan', blogId: newBlog.id });
  } catch (err) {
    res.status(500).json({ message: 'Gagal tambah blog', error: err.message });
  }
};

const deleteBlog = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Blog.destroy({ where: { id } });
  
      if (deleted) {
        res.status(200).json({ message: 'Blog berhasil dihapus' });
      } else {
        res.status(404).json({ message: 'Blog tidak ditemukan' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Gagal hapus blog', error: err.message });
    }
  };


  const updateBlog = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, img } = req.body;
  
      const [updated] = await Blog.update(
        { title, description, img },
        { where: { id } }
      );
  
      if (updated) {
        res.status(200).json({ message: 'Blog berhasil diperbarui' });
      } else {
        res.status(404).json({ message: 'Blog tidak ditemukan' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Gagal update blog', error: err.message });
    }
  };

  const getBlogById = async (req, res) => {
    try {
      const { id } = req.params;
      const blog = await Blog.findByPk(id);
  
      if (blog) {
        res.status(200).json(blog);
      } else {
        res.status(404).json({ message: 'Blog tidak ditemukan' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Gagal ambil blog', error: err.message });
    }
  };
  
  
  

module.exports = { fetchBlogs, addBlog, deleteBlog, updateBlog, getBlogById };
