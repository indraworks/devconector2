const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  //likes dan coments utk users lain yg coment/like pada post kita
  //ini di ref ke users
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    },
  ],
  //utk comment sama direlasi ke userid
  //ditamabah date kapan coment
  comments: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'users' },
      text: { type: String, required: true },
      name: { type: String },
      avatar: { type: String },
      date: { type: Date, default: Date.now() },
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Post = mongoose.model('post', PostSchema);

/*sesuai nama file Posts*/
