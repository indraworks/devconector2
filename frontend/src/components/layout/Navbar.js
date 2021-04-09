import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

/*
cara distracting 
const {isAuthenticated,loading} = props.auth
const {logout} = props
nah bisa ditulis pada gerbang function component
=({auth:{isAuthenticated,loading},logout})=>
*/
const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  //kalau irternari dihtml selalu variable pake tanda kurung

  const authLinks = (
    <ul>
      <li>
        <Link to='/profiles'>
          <span>Developers </span>
        </Link>
      </li>
      <li>
        <Link to='/posts'>
          <span>Posts </span>
        </Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user' />
          <span className='hide-sm'>Dashboard </span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-home'></i>{' '}
          <span className='hide-sm'>Logout </span>
        </a>
      </li>{' '}
    </ul>
  );

  //gues-link
  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>
          <span>Developers </span>
        </Link>
      </li>

      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <Fragment>
      <nav className='navbar bg-dark'>
        <h1>
          <Link to='/'>
            <i className='fas fa-code'></i> DevConnector
          </Link>
        </h1>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </nav>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth, //auth ini nanit kita urai dari
  //reducer yg dibutuhkan state2nya adalah : auth {isAuthenticated,loading}
});
Navbar.propTypes = {
  auth: PropTypes.object.isRequired, //kita ambil semua auth reducer objecnyananti diurai /distract yg dibutuhkan saja
  logout: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { logout })(Navbar);

/*
kita mau buat logut dari navbar jadi 
pada saat login nanti akan berubah menu navbarnya 
pada saat login success mnuju page dashboard 
hanya ada satu buah menu daro navbar yaitu logout
action:
--cara set type LOG_OUT
--dispatch action logout :
  dispacth({
    type:LOG_OUT

    reducer:
    -import LOGOUT
   pada switch:
   case LOGOUT:
   localstorage.removeitem(token)
   return {
     ...state,
     lainya sama dengan LOGIN_FAIL,AUTH_ERROR,REGISTER_FAIL
   } 
  

*/

/*
html navbar ini diambil dari html zip braad travearsi yg udah ada pengaturan 
cssnya

*/
//loading defautlnya adalah true,
/*
jadi setelah fetch atau ada error maka akan ditampilkann menu
karena jsx kita pakai ternary 
{!loading:jika benar: null( jika salah)}
ini sama artinya dengan {!loading && (staement yg benar ditampilkan)}


*/

/*
Masalah Private ROute di bahas lengkap di 
jadi udah pattern <Route render={} />
https://stackoverflow.com/questions/60124524/reactjs-render-private-route-if-authenticated-after-promise-resolved



*/
