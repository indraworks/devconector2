import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';

const CommentItem = ({
  auth,
  postid,
  comment: { _id, text, name, avatar, user, date },
}) => (
  <div class='post bg-white p-1 my-1'>
    <div>
      <Link to={'/profile/${user}'}>
        <img class='round-img' src={avatar} alt='' />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p class='my-1'>{text}</p>
      <p class='post-date'>
        Posted on <Moment format='YYYY/MM/DD'></Moment>
      </p>
      {!auth.loading && user === auth.user._id && (
        <button
          onClick={(e) => deleteComment(postid, _id)}
          type='button'
          className='btn btn-danger'
        >
          <i className='fas fa-times'></i>
        </button>
      )}
    </div>
  </div>
);
/*
{!auth.loading && user === auth.user._id
  maksudnya adalah apakah auth.loading true ,dan user(id) yg kasih comment sama  saat ini dengan  user yg id user yg login 
  jika benar maka tampilkan button delete jika tidak maka tak perlu 

*/
CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(CommentItem);
