import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrProfile } from '../../actions/profile';
import DashboardAction from './DashboardAction';

import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';

const Dashboard = ({
  getCurrProfile,
  auth: { user },
  profile: { loading, profile },
}) => {
  useEffect(() => {
    getCurrProfile();
  }, [getCurrProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>Welcome {user && user.name}</p>
      {profile !== null ? (
        <Fragment>
          <DashboardAction />
        </Fragment>
      ) : (
        <Fragment>
          <p>you have not yet setup a profile, please add some info </p>
          <Link to='create-profile' className='btn btn-primary my-1'>
            Create Profile{' '}
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profileReducers,
});

export default connect(mapStateToProps, { getCurrProfile })(Dashboard);
