import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({ getPost, post: { post, loading }, match }) => {
  //ambil satu post aja dan disini buat form sndri aja tidak seprti brad traversy
  //biar tak terlalu ribet bingung
  //ini dimasukan diroute krn mrupkan page yg dituju
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/posts' className='btn'>
        Back to Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm post_id={post._id} />
      <div className='comments'>
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
      {window.location.reload}
    </Fragment>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);

/*
form postItem itu sama dgn porm post yg disini  cuman bedanya adalah 
gak ada tampilan like dislike sama bustton discussion dan delete 
nah yg isini itu diilangin semua itu saja ,nah om brad buat dia kasih props
di form item yaitu adgn ShowAction = true jadi itu componen dalam postItem tampil semua 
dislike like dan discussion serta delete postnya 
dia form postItem di re-use dgn prop showAction = false jadi gak tampil itu button2nya
alias kosong


*/
/*
nah kita import PostItem krn kita pinjam component Postnya 
pada saat loading kalau blum kluar atau data post dari getPost = null
maka kita tampilkan spinner jika ada data maka kita tampilkan 
dimana kit amasukan post sbgai props dan showActions = false


*/
