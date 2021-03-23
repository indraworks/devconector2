import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Alert = ({ alerts }) => {
  //harus return ya karena dirender di app.js

  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ))
  );
};
//kalau pakae vraibel.map(x=>(<div>{x}</div>)) //ini udah return
//kalau pakai kata return variable.map(x=>{return <div>{x} </div>})
const mapStateToProps = (state) => ({
  alerts: state.alertReducers, //dari reducer
});
Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(Alert);

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
