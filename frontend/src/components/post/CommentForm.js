import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

//taruh commentForm tag di post 
const CommentForm = ({ post_id, addComment }) => {
  const [text, setText] = useState('');
  return (
    <div class='post-form'>
      <div class='bg-primary p'>
        <h3> Leace a Comments</h3>
      </div>
      <form
        class='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          addComment(post_id, { text }); //panggil action adddComment
          setText(''); //set kmblai nilai text dgn kosong
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Create a comment'
          required
        ></textarea>
        <input type='submit' class='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);

/*
formnya sama mirip post


*/
