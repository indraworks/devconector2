import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../../components/layout/Spinner';
import { getProfilesById } from '../../actions/profile';
import ProfileTopScreen from './ProfileTopScreen';
import ProfileBioScreen from './ProfileBioScreen';
import { ExperienceScreen } from './ExperienceScreen';
import { EducationScreen } from './EducationScreen';
import GithubScreen from './GithubScreen';

export const ProfileScreen = ({
  getProfilesById,
  profile: { profile, loading },
  match,
  auth,
}) => {
  useEffect(() => {
    getProfilesById(match.params.id);
  }, [getProfilesById, match.params.id]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>
            Back To Profile
          </Link>
          {auth.isAuthenticated &&
            loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
          <div className='profile-grid my-1'>
            <ProfileTopScreen profile={profile} />
            <ProfileBioScreen profile={profile} />
            <div class='profile-exp bg-white p-2'>
              <h2 className='text-primary'>Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((experience) => (
                    <ExperienceScreen
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No Expererience Credentials</h4>
              )}
            </div>
            <div class='profile-edu bg-white p-2'>
              <h2 className='text-primary'>Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((education) => (
                    <EducationScreen
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No Education Credentials</h4>
              )}
            </div>
            {/* gihub repo */}
            {profile.githubusername && (
              <GithubScreen username={profile.githubusername} />
            )}
          </div>
        </Fragment>
      )}
    </>
  );
};

ProfileScreen.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfilesById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profileReducers,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfilesById })(ProfileScreen);

/*
jadi gini utk profile yg di profilms kan tapil smua profilenya 
nah pas di klik utk masing2 maka akan ngarah kesini profileScreen
disini juga ambilnya getProfileBerdasarkan nlai dari yg ada di browser
match dgn yg diketik di browser match.params.user_id

*/
