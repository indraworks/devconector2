import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../actions/auth';

import PropTypes from 'prop-types';

const Login = ({ login, isAuthenticated }) => {
  //ingat action dan state masuk sbgai props
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  //desctructing
  const { email, password } = formData;
  const onSubmit = async (e) => {
    //pokoknya diingat2 kalau async maka aixos pakai await
    //harus selalu! di bagian server juga pakai async await !!
    e.preventDefault();
    console.log('email =', email);
    console.log('password =', password);
    console.log('panggil action authLogin');
    login({ email, password });
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <section className='container'>
        <h1 className='large text-primary'>Login</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Signin With Your Account
        </p>
        <form className='form' onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              value={email}
              onChange={onChange}
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
              onChange={onChange}
              minLength='6'
            />
          </div>

          <input type='submit' className='btn btn-primary' value='Login' />
        </form>
        <p className='my-1'>
          Don't have an account? <Link to='/register'>Sign In</Link>
        </p>
      </section>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};
//ingat ya yg dimport (atas!) itu utk action dan conect diatas
//stkah conect diatas maka dapat kita bisa import state (dibawah!)
//melalui mapStateToProps nah nama state reducersnya yg ada di combineReducers
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
//utk action setalertnya ada di redux login
export default connect(mapStateToProps, { login })(Login);

/*
JALANNYA SET ALERT Ya ,biar tidak bingung ,
jadi gini action di reducer itu setAlert berisi type SET_ALERT,REMOVE_ALERT
nah ktika action dia kirim type action  SET_ALERT dan Action.payload info yg akan di
kirim 
nah sama reducer diterima typeaction sehingga mengubah state update dari yg blum ada
jadi ada SET_ALERT dan isinya payload adalah msg alarm,type alarmnya smua dlm type string
nah action ini bamgkit jika ditriget dari component nah event yg triger dia adalah
waktu submit ,nah supaya dia bisa conect di component dia (alert) ini kit aimport
 -conect supata bisa imprt actionnya dan kita export utk supaya ditangkap reducer
 dgn cara di connect di bagian export dibawah ,kmudian masukan connect(null,{setAlert})(Register)
di Reister hanya lakukan action gak namgkap state 
nah stalh action di kluarkan awaktu submit maka ini diterima reducer
nah sireducer ubah state tsb ,ktika ubah state ada component yg akan berubah apa itu 
alert component kita punya component alert yg memang kita buat berisi css html 
dimana component ini menrima props state bukan kluarkan action ya nah 
sama sperti di Register 
const Alert=({Alerts})=> {}    //aslinya (props)
//const{Alerts} = props
didalamnya function Alert() {
  //jika alert !== null && alerts > 0 && maka kit amaping
  //karena alarm payloadnya isinya berupa array
   alerts.map(alert=>(<div  key={alerts.id} className=`{alert alert-${alert.alertType}}`> ${alert.msg} </div>))
}

nah kmpmida dia exprot komponent ini 
nah dimana kompoent ini ditaruh dia ditaruh di App.js
posisi compoennt ditaruh diatas swithc 
dan hanya muncul berdasarkan logicnya jika alerts.length >0 atau alerts !== null
maka akan dibuat component element tag <div>      
<div  key={alerts.id} className=`{alert alert-${alert.alertType}}`> ${alert.msg} </div>
berikut utk pilihan type alarmnya di css jika danger dan warna background color

.alert-danger {
  background: var(--danger-color);
  color: #fff;
}


.alert-success {
  background: var(--success-color);
  color: #fff;
}

nah itu muncul alert tiap dia tekan mis jika validation error
teru menerus nah supaya bisa hilangkan maka diperlukan state REMOVE_ALERT ( kit akasih anam ini)
nah actipnnya type adalah REMOVE_ALERT
isinya payload hanya payload = .id  (dari uuid)
nah direudcer diterima dan state diterima yaut REMOVE _ALERT
trus gimana processnya kita filter state dimana state.filter(alert.id!==action.payload)
alert.id adalah id yg lama  ,action.payload mmbawa id yg baru 
intinya tampilkan id yg tidak sama dgn alert.id sblumnya jika demkian 
maka payloadnya kan hanya id saja tdak ada msg,atau type  maka tidak akan dtimaplikan apa2
alias kosong di landing page

*/

/*TESTING EBRHASIL ! pertama cors tidak diinstal
pada bagian subit anomyous func memakai async maka harus pakai await
const body = JSON.stringify({ email, password });

    const config = {
      headers: {
        'Content-Type': 'Application/json',
        //gak perlu pake authorization
      },
    };

    try {
      const res = await axios.post('/api/auth', body, config);

      console.log(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };



*/
