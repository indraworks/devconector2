import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../../components/layout/Spinner';
import { getProfilesById } from '../../actions/profile';
import ProfileTopScreen from './ProfileTopScreen';
import ProfileBioScreen from './ProfileBioScreen';

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
            auth.user.id === profile.user.id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
          <div className='profile-grid my-1'>
            <ProfileTopScreen profile={profile} />
            <ProfileBioScreen profile={profile} />
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
