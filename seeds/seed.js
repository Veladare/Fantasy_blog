const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  try {
    // Insert user seed data
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    // Insert post seed data
    const posts = await Post.bulkCreate(postData);

    // Insert comment seed data
    for (const comment of commentData) {
      const post = posts[Math.floor(Math.random() * posts.length)]; // Pick a random post
      await Comment.create({
        ...comment,
        user_id: users[Math.floor(Math.random() * users.length)].id, // Pick a random user
        post_id: post.id,
      });
    }

    console.log("Seed data inserted successfully!");
  } catch (error) {
    console.error("Error inserting seed data:", error);
  } finally {
    process.exit(0);
  }
};

seedDatabase();