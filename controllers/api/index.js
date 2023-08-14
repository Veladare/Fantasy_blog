const router = require('express').Router();
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes')
const postRoutes = require('./postRoutes')

router.use('/post', postRoutes)
router.use('/comment', commentRoutes)
router.use('/users', userRoutes);


module.exports = router;