//mmbuat routes utk posts
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
//mongoose data

const Post = require('../../models/Post');

const User = require('../../models/User');

const Profile = require('../../models/Profile');
const { restart } = require('nodemon');

//@route   POST api/posts
//@desc    Test route
//@access  private buth auth middleware

router.post(
  '/',
  [auth, check('text', 'Text is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        erorrs: errors.array(),
      });
    }

    try {
      //cari user id brdsarakn req.user.id dari frontend
      const user = await User.findById(req.user.id).select('-password');
      //masukan newPost kedalma database newpost baru
      const newPost = new Post({
        //create instatiate field schema
        text: req.body.text, //brsdarkan form imputan form
        name: user.name, //dari database
        avatar: user.avatar, //dari database
        user: req.user.id, //dari user id broser/brdasar inputan
      });
      //sav post
      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);
//@route   GET api/posts
//@desc    Test route
//@access  private buth auth middleware
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  GET api/posts/:id
//@desc    Test route
//@access  private buth auth middleware
// note : check post base on id

router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send({
        msg: 'post by user id  not found',
      });
    }
    res.json(post);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).send({
        msg: 'post by user id  not found',
      });
    }
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  DElETE  api/posts/:id
//@desc    Test route
//@access  private buth auth middleware
// note : delete berdasarkan user id yg ngepost content tsb

router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); //sengaja di kasih nama id post
    if (!post) {
      return res.status(404).send({
        msg: 'post by user id  not found',
      });
    }
    console.log(post.user, 'hello');
    if (post.user.toString() !== req.user.id) {
      return res.status(401).send({
        msg: 'not atuhorized to delete this post',
      });
    }
    await post.remove();
    res.json({ msg: 'post remove' });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).send({
        msg: 'post by user id  not found',
      });
    }
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//ini utk post like dan unlike 
//@route   api/posts/like/:id
//@desc    Test route
//@access  private buth auth middleware
// note : check put /update like by user id 


module.exports = router;
