import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  //jadi intinnya begini jika halaman posts page dibuka maka akan di load
  //dgn melakukan ambil data smua posts data yaitu dgn action getPost ,ditampung distate
  //dtampung di state posts ;[] mrupakan array  jadi isi post berupa jsson aray
  //bisa dilihat di redux tools!
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'> </h1>
      <p className='lead'>
        <i className='fas fa-user'></i>Welcome to Comunity
      </p>
      <PostForm />
      <div className='posts'>
        {posts.map((post) => (
          // <div key={post._id}>
          //   {post._id} {post.name}{' '}
          // </div>
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { getPosts })(Posts);
