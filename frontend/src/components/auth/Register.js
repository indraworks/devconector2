import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
//import auth action
import { registerUser } from '../../actions/auth';

import PropTypes from 'prop-types';
//catatan bisa kita pakau langsung: =({setAlert,regusterUser}) utk mwwakili props
//gak perlu nulis props.setAlert etc tpi gak papa biar bljar biasain dulu
const Register = (props) => {
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

  const formSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      //disini kita kluarkan alert krn password gak match
      // console.log('password not match')
      //di action isi passing parameternya alret adalah:msg, alertType
      props.setAlert('Password donot match', 'danger'); //danger -->utk clasnmae diset di css
      //utk buat supaya muncul kita buat alert componentnya ntar diimpor disini
    } else {
      // console.log(formData); jika success
      //kita passing disini email,nama,password dari formData
      //brupa object destructing
      props.registerUser({ name, email, password });
    }
  };
  const { name, email, password, password2 } = formData;

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit={(e) => formSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
            // required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            // required
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
            // required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            onChange={(e) => onChange(e)}
            value={password2}
            // minLength='6'
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
Register.propTypes = {
  //nama prop Action yg masuk kiri : kakan  jnis propTypes nya
  setAlert: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
};

//kiri,kanan
//(statte,action)
export default connect(null, { setAlert, registerUser })(Register);

/*//////////////KETERANGAN TENTANG STATE //////////////
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
//

nah kalau mrubah state tinggl this.setState({email:nilaiBaru})
//utk form action kita ganti dgn form submit func 

*/

/* //////TENTANG AXIOS KITA REGISTER ////////////
 nah disini dibagian jika pasword 1 === password 2 maka kita akan 
 lgin nah kita tampung itu isi value form dlm object 
 valueForm = { name:name,email:email,password:password} 
 kita pakai axios ke route /api/users
 utk register kita gak pakai sdiakan token 
 



*/

/* TENTANG PROPS  jadi property adalah supaya si action bisa masuk 
 inject nah propertynya supaya masuk dan dkinali makanya di taruh di passing parameter
 const register=(props)=> {

  ....props.setAlert()
 }
//KEDEPANNYA BISA LANGSUNG DI DESTRUCTION 
JADI SPERTI INI:

const regster=({setAlert}) {

   penulisan udah gak pake props :
     setAlert()
s
}

//CATATAN TENANG PROPTYPES nah jadi props yg masuk atau injet 
jenis datanya apa maka perlu didecrale
snipet impt import proptypes
utk yg ibawah bisa pakai ptfr jika propTYpe nya func ,r adalah required
                         pts jika propType string bisa liat di library vs-exted snipetnya


*/

/* COMPONENET KALAU MAU CONECT KE ACTION ATAU STATE  DIREDUC HARUS PAKAI {CONNECT}
  --iport connect
  --buat pernyataam sambung di paling bawah stlah exprt efault connect()(nama_module) 



*/
