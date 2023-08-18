const router = require('express').Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
        },
        {
  
          model: Comment,
        },
      ],
    });

    const allPosts = postData.map((post) => 
      post.get({ plain: true })
    );
    console.log(allPosts);

    res.render("homepage", {
      allPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/post/:id", withAuth, async (req, res) => {
  try {
       
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: 
          User, attributes: ["name"] 
        },
        {
          model: Comment,
          include: 
          [{ model: User, attributes: ["name"] }],
        },
      ],
    });
    const post = postData.get({ plain: true });
    
    res.render("post", {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
        
    res.status(500).json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: ["name"] }],
    });
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("dashboard", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/newpost", withAuth, async (req, res) => {
  res.render("newpost", {
      logged_in: req.session.logged_in
  });
});

router.get("/editpost/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User, attributes: ["name"] }, 
      { model: Comment, include: [User] }],
    });

    res.render("editpost", {
      ...postData.get({ plain: true }),
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.all("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

module.exports = router;