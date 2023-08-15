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
          //it invokes comments for some reason even though there is no comments model
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

router.get("/post/:id", async (req, res) => {
  try {
       
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["name"] },
        {
          model: Comment,
          include: [{ model: User, attributes: ["name"] }],
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

module.exports = router;

router.all("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});
