import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, name, text, user, date, comments, avatar, likes },
}) => (
  <div class='post bg-white p-1 my-1'>
    <div>
      <a href='profile.html'>
        <img class='round-img' src={avatar} alt='' />
        <h4>{name}</h4>
      </a>
    </div>
    <div>
      <p class='my-1'>{text}</p>
      <p class='post-date'>Posted on {date}</p>

      <button onClick={(e) => addLike(_id)} type='button' class='btn btn-light'>
        <i class='fas fa-thumbs-up'></i>{' '}
        {likes.length > 0 && <span>{likes.length}</span>}
      </button>
      <button
        onClick={(e) => removeLike(_id)}
        type='button'
        class='btn btn-light'
      >
        <i class='fas fa-thumbs-down'></i>
      </button>
      <Link to={`/post/${_id}`} class='btn btn-primary'>
        Discussion{' '}
        {comments.length > 0 && (
          <span className='comment-count'>{comments.length}</span>
        )}
      </Link>

      {!auth.loading && user === auth.user._id && (
        <button
          onClick={(e) => deletePost(_id)}
          type='button'
          class='btn btn-danger'
        >
          <i class='fas fa-times'></i>
        </button>
      )}
    </div>
  </div>
);
//ini object ya walaupun udah masuk di posts ( adalah array kalau diliaht direduce
//) kan jaid ikut type dari parennya di post
PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
// const mapStateToProps = (state) => ({
//   post: state.post.posts,
// });
export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
