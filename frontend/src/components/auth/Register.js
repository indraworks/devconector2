import React, { Fragment, useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    //state aawal nilai di declare dulu
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  //copy template html dari theme Frontend
  //destrctuction
  // eslint-disable-next-line
  const onChange = (e) => {
    //yg lama
    //ini adalah targetnya field name !
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //menirma (e) event action dari ktika tombol button klick
  
  const formSubmit =(e)=> {
      e.preventDefault();
      if(password !== password2) {
        console.log('password not match')
      } else {
        console.log(formData)
      }
    }
  const { name, email, password, password2 } = formData;

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit={e=>formSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            onChange={(e) => onChange(e)}
            value={password2}
            minLength='6'
          />
        </div>
        
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <a href='login.html'>Sign In</a>
      </p>
    </Fragment>
  );
};

export default Register;

/*
kalau diclass state itu didelcare di dalam constructor
sbb
constructor {
  super() {
    state = {
      //jdi brupa object 
      formData: {
        //nilai awal = ''
            name:'',
            email:'';
            password:'';

      }
    }
  }

}
//nah kalau mrubah state tinggl this.setState({email:nilaiBaru})
//utk form action kita ganti dgn form submit func 



*/
