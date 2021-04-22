import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addLike, removeLike, deletePost } from '../../actions/post';
import Moment from 'react-moment';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, name, text, user, date, comments, avatar, likes },
  showActions,
}) => {
  const myAddLike = (e) => {
    addLike(_id);
    window.location.reload();
  };
  const myremoveLike = (e) => {
    removeLike(_id);
    window.location.reload();
  };

  const mydeletePost = () => {
    deletePost(_id);
    window.location.reload();
  };
  return (
    <div class='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img class='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>

      <div>
        <p class='my-1'>{text}</p>
        <p class='post-date'>
          Posted on <Moment format='YYYY-MM-DD'>{date}</Moment>
        </p>
        {showActions && (
          <Fragment>
            <button onClick={myAddLike} type='button' class='btn btn-light'>
              <i class='fas fa-thumbs-up'></i>{' '}
              {likes.length > 0 && <span>{likes.length}</span>}
            </button>
            <button onClick={myremoveLike} type='button' class='btn btn-light'>
              <i class='fas fa-thumbs-down'></i>
            </button>
            <Link to={`/posts/${_id}`} class='btn btn-primary'>
              Discussion{' '}
              {comments.length > 0 && (
                <span className='comment-count'>{comments.length}</span>
              )}
            </Link>

            {!auth.loading && user === auth.user._id && (
              <button
                onClick={mydeletePost}
                type='button'
                class='btn btn-danger'
              >
                <i class='fas fa-times'></i>
              </button>
            )}
            {window.location.reload}
          </Fragment>
        )}
      </div>
    </div>
  );
};

//om brad buat Props showAction
//dgn default = true
PostItem.defaultProps = {
  showActions: true,
};

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
