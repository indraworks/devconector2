import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';

export const PostItem = ({
  auth,
  post: { _id, name, text, user, avatar, likes,comments, date },
}) => (
  <div className='post bg-white p-1 my-1'>
    <div>
      <a href='profile.html'>
        <img class='round-img my-1' src={avatar} alt='' />
        <h4>{name}</h4>
      </a>
    </div>
    <div>
      <p className='my-1'>{text}</p>
      <p className='post-date'>
        Post On <Moment format='YYYY-MM-DD'>{date}</Moment>
      </p>
      <button type='button' className='btn btn-light'>
        <i className='fas fa-thumbs-up'></i>
        <span>{likes.length}</span>
      </button>
      <button type='button' className='btn btn-light'>
        <i className='fas fa-thumbs-down'></i>
      </button>
      <Link to={`/post/${_id}`} className='btn btn-primary'>
        Discussion <span className='comment-count'>{comments.length}</span>
      </Link>
      {!auth.loading && user === auth.user._id && (
        <button type='button' className='btn btn-danger'>
          <i className='fas fa-times'></i>
        </button>
      )}
    </div>
  </div>
);

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, {})(PostItem);

/*
buton merah bisa hapus comment akan muncul jika dan hanya jika 
post === auth.user._id (ini adalah user yg login)

*/
