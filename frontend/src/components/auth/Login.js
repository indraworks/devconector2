import React, { Fragment, useState } from 'react';
//sama kayak register import connect,import actionnya ,masukan propsnya
import { connect } from 'react-redux';
import { loginUser } from '../../actions/auth';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';

const Login = (props) => {
  const [formLogin, setFormLogin] = useState({
    email: '',
    password: '',
    password2: '',
  });

  const onChange = (e) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      props.setAlert('wrong  password', 'danger');
    } else {
      props.loginUser({ password, email });
    }
  };

  const { email, password, password2 } = formLogin;

  return (
    <Fragment>
      <section class='container'>
        {/* <div class='alert alert-danger'>Invalid credentials</div> */}
        <h1 class='large text-primary'>Sign In</h1>
        <p class='lead'>
          <i class='fas fa-user'></i> Sign into Your Account
        </p>
        <form class='form' onSubmit={(e) => onFormSubmit(e)}>
          <div class='form-group'>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div class='form-group'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class='form-group'>
            <input
              type='password'
              placeholder='Password2'
              name='password2'
              value={password2}
              onChange={(e) => onChange(e)}
            />
          </div>

          <input type='submit' class='btn btn-primary' value='Login' />
        </form>
        <p class='my-1'>
          Don't have an account? <Link to='/register'>Sign Up</Link>
        </p>
      </section>
    </Fragment>
  );
};

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
};
export default connect(null, { setAlert, loginUser })(Login);
