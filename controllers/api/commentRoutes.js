const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../../models');


//I believe this is the route http://localhost:3001/api/comment/
// Create a new comment
router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create({
      comment_text: req.body.comment_text,
      user_id: req.body.user_id,
      post_id: req.body.post_id,
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating comment' });
  }
});

router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["name"], 
        },
        {
          model: Post,
          attributes: ["id"],
        },
      ],
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
    try {
      const comment = await Comment.findByPk(req.params.id);
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      res.status(200).json(comment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error finding comment' });
    }
  });


  router.put('/:id', async (req, res) => {
    try {
      const comment = await Comment.findByPk(req.params.id);
  
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
  
      await comment.update({
        comment_text: req.body.comment_text,
      });
  
      res.status(200).json({ message: 'Comment updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating comment' });
    }
  });

 router.delete('/:id', async (req, res) => {
    try {
      const comment = await Comment.findByPk(req.params.id);
  
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
  
      await comment.destroy();
  
      res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting comment' });
    }
  });


  module.exports = router;