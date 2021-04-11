import axios from 'axios';
import { setAlert } from './alert';
import { loadUser } from './auth';
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
} from '../actions/type';

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { err: err.msg },
    });
  }
};

//addLike
export const addLike = (post_id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${post_id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { post_id, likes: res.data },
    });
    dispatch(setAlert('add like successfuly', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.responseText, status: err.response.status },
    });
  }
};

//unlike
//remove like
export const removeLike = (post_id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${post_id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { post_id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.responseText, status: err.response.status },
    });
  }
}; //stlahnya ke reducer ...utk trima actionnya

//delete post id

export const deletePost = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
    dispatch(setAlert('delete done', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/posts', formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.message },
    });
  }
};
