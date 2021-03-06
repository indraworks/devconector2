import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ara lama
//const Alert=(props)=> {
//   return (
//     <div>

//     </div>
//   )
// }

const Alert = ({ alerts }) => {
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
Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert, // sebalah kanan:state.alert adalah state dgn anma state yg ada direducers
  //yg sebelah kirir adalah nama varibale tuk tampung state tadi  di
  //component ini skrg
});
export default connect(mapStateToProps)(Alert);

/*
jadi sklai lagi kalau propsnya didestructing
aslinya ini kan merupakan inject property dari action atau state dari reducer
=(props)=> {} diganti
jadi nama statenya langsung 
=({setAlert}) = > {}



*/

/*
jadi sikomponent Alert ini ambil statenya alert reducer utk ditampilkan 
kan dari action isinya msg,sama type_mesage( utk className) trus di truskan ke komponent
register pada saat kita mau register pas bisa muncul  karena password yg sama
nah di component register kita harus import action setAlert,kmudian conect
utk supaya bisa conect di redux store trhubung react-reduxnya
nah actionya diconect paling bawah nama actionnya,
nah stelah disetAlert kita akan mesti tahu pingin munculkan di bifroend end nah kita ambil statenya
yg alnil statenya dgn buat component utk tampilkan nama komponennya adalah Alert
nah dicomponent ini harus sama 
  - import conect bait biasa hubungi redux store update state yg aman ada reducernya 
  nah dkita conect dgn buat mapStaeToProps=state=>({
    //variable-statekita :state dari reducer
    alerts:state.alert <----nama state direducer!
  })

*/
