const express = require('express');
const router = express.Router();
const { Post } = require('../../models');

// Create a new post
router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      text: req.body.text,
      user_id: req.body.user_id,
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating post' });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

// Find a post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error finding post' });
  }
});

router.put('/:id', async (req, res) => {
    try {
      const post = await Post.findByPk(req.params.id);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      await post.update({
        title: req.body.title,
        text: req.body.text,
      });
  
      res.status(200).json({ message: 'Post updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating post' });
    }
  });
  
  // Delete a post by ID
  router.delete('/:id', async (req, res) => {
    try {
      const post = await Post.findByPk(req.params.id);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      await post.destroy();
  
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting post' });
    }
  });
  
  module.exports = router;