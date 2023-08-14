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

    // Insert comment seed data sequentially
    for (let i = 0; i < commentData.length; i++) {
      const comment = commentData[i];
      const userIndex = i % users.length; 
      const postIndex = i % posts.length; 

      await Comment.create({
        ...comment,
        user_id: users[userIndex].id,
        post_id: posts[postIndex].id,
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