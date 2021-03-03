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
// note : check put /update like by user id kalo sudah ada mmaka tidak
//akan bertambah lagi

router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).send({
        msg: 'not found the id',
      });
    }
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({
        msg: 'user already like this post',
      });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: 'server error',
    });
  }
});
module.exports = router;

//ini post unlike
//@route   api/posts/unlike/:id
//@desc    Test route
//@access  private buth auth middleware
// note : check put /update unlike by user id

router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (
      post.likes.map((like) => like.user.toString === req.user.id).length === 0
    ) {
      return res.status(400).json({
        msg: 'no post that avalailble to unlike',
      });
    }
    //cari req.user.id index dalam array likes masuk variable
    const findIndex = post.likes
      .map((like) => like.user.toString)
      .indexOf(req.user.id);
    //dari variable ini kita delete
    post.likes.splice(findIndex, 1);
    //update dgn mengesavenya
    await post.save();
    res.json({
      msg: `${req.user.id} already remove`,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      msg: 'sever error',
    });
  }
});

///////COMENT //////
//@route   POST api/posts/:id/comments
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
      //req.user.id dari auth didicode di middleware
      const user = await User.findById(req.user.id);
      const post = await Post.findById(req.params.id); //cari id post di dtabase

      const newComment = {
        text: req.body.text, //from input form
        name: user.name, //dari dattabase
        avatar: user.avatar, //dari database
        id: req.user.id, //from inputform ==> auth wihc decoded by jwt
      };
      //masukan ke dalam comment fields yg berupa aray krn id post  sudah ktmu diatas
      //dari req.params.id
      //link bacaan :https://alligator.io/js/push-pop-shift-unshift-array-methods/
      post.comments.unshift(newComment); //masukan di fields commenst(yg brerupa aaarray) di table post
      //unshift artinya tmbahkan di paling awal array (selalu)
      //yg id post udah didapat dari atas findbyid(req.params.id)

      await post.save();
      res.json(post.comments);
    } catch (err) {
      console.log(err.message);
      res.status(500).json({
        message: 'server error',
      });
    }
  }
);

/*
penjelasan pada put likes :
di model utk post.lieks.user ini isinya adalah objectId yg direferensikan 
pada id_user yg like yg berasal dari req.user.id 
pada saat auth midleware ini token dibuka isi user adalah user.id dan user.name
nah ini yg jadi acuan pada saat kita filter apakah user yg like di dalam array likes
ini 
post.likes.filter((like) => like.user.toString() === req.user.id).length > 0

models pistS  dgn schema likes:
likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],s

///Penjelsaan unlike sam adgn like 
error kalau dia udah ==0 gak yg didileike lagi 
nah ita cari  dgn tampung variable index dari indexOf(req.user.id ) kit acari index dari userUd yg ada di araray likes
nah stlah masuk variable kita tinggal remove aja bersarkan variableIndex tadi 
coment kita ccpy dari post





*/

/*

penjelasan coment ini sama dgn post hanya kalau post simpnanya didatabase
kalau coment bentuknya object disimpan dalam aarray object


*/
