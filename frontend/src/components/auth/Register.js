//new
import React, { useState, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  //kalau gak mau pake props bisa di destruct dari dalam passing param func
  //=({setAlert})=>{} atau disini dibawha ini dlm func

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
     
      setAlert('wrong password', 'danger'); // di action ada 2 msg,type
      //yg typenya ini utk dipasang di css (className="alert-danger")
      //agar ada tampilnanwarna merah furher bisa di lihaat di css
    } else {
      // console.log('ok we goto send to server the data');
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    //prop dari state reducer dari bawah  propsnya di destructed
    return <Redirect to='/dashboard' />;
  }
  return (
    <Fragment>
      <section className='container'>
        <h1 className='large text-primary'>Sign Up</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Create Your Account
        </p>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
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
              minLength='6'
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Confirm Password'
              name='password2'
              value={password2}
              onChange={(e) => onChange(e)}
              minLength='6'
            />
          </div>
          <input type='submit' className='btn btn-primary' value='Register' />
        </form>
        <p className='my-1'>
          Already have an account? <Link to='/login'>Sign In</Link>
        </p>
      </section>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register })(Register);

/*
tnpa redux jika success maka akan post ke server di end point:


*/
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
