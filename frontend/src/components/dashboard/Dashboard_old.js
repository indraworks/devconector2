import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrProfile } from '../../actions/profile';
import { Link } from 'react-router-dom';

const Dashboard = ({
  getCurrProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrProfile();
    // eslint-disable-next-line
  }, [getCurrProfile]);
  //arti {user && user.name  }  = jika user true/exist maka tampilkan username
  //arti {loading && profile ===null ,jika sedang loading dan profile === null maka tampilkan spinner
  // selain itu tampilkan welcome suer dan profilenya}
  return loading===false && profile === null ? (
    <Fragment>
      <p>You not yet have Profile please add some info</p>
      
    </Fragment>
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>Welcome {user && user.username}
      </p>
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

/*
auth merupakan props state dari component login/register


*/

/*
function jadi func itu adalah 
()=>() artinya ini sama dengan function() {return () }
nah kalau 
()=>{
  //wajib dikasih return juga
  return()
}
jadi:
()=>{return()}
*/
