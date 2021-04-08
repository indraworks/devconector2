import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
// import Spinner from '../layout/Spinner';
import { getGithubRepos } from '../../actions/profile';
import PropTypes from 'prop-types';
//disni actionya ambil github repos

const GithubScreen = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos]);
  //tampilkan jika ada github user namenya
  return (
    <div className='profile-github'>
      <h2 className='text-primary my-1'>Github Repos</h2>
      {repos === null ? (
        <h4>No Github Repos </h4>
      ) : (
        repos.map((repo) => (
          <div key={repo._id} className='repo bg-white p-1 my-1'>
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li className='badge badge-primary'>
                  Stars:{repo.stargazers_count}
                </li>
                <li className='badge badge-dark'>
                  Watchers:{repo.watchers_count}
                </li>
                <li className='badge badge-light'>Forks:{repo.forks_count}</li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

GithubScreen.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  repos: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profileReducers.repos,
});
export default connect(mapStateToProps, { getGithubRepos })(GithubScreen);
