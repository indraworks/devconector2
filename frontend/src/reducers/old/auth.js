import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../actions/type';

//initial state
//dimislalkan smua token alawanya ada di local storage disimpan kita ambil nanti
//state authetication adalah sbb:
//

const initialState = {
  token: localStorage.getItem('token'), // kita check apa di dlm sotorage token masih valid
  isAuthenticated: null, //defaultnya ,tapi jika access brhasil maka
  //authenticate adalah true kalau fail nilainya adalah false
  user: null, // diset null krn blum ada isi apa2
  // pass mau login maka ada isinya yaitu nama ,email ,password nilai state dari form yg dimasukan
  //pasing e sini lewat axios ke server
  loading: true, //kalau udah dapat token & brarti slsai leoadingnya set false
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOADED:
      //ngeset isauthenticated = true dan set yg lainnya dari localstorage yg
      //didapat dari server username,email,
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };

    case REGISTER_SUCCESS: //login success & login_fail sama utk state behavior atau nilainya
    case LOGIN_SUCCESS:
      //ingat harus dikembalikan lagi stelah ubah isi object
      //returnnya dlm btuk objec {}
      //kita tulis utk local storage set item dluar return karna
      //kita gak nulis distate tapi nulis token yg baru didapat di local storage
      //stlahnya baru dispacth update state
      localStorage.setItem('token', action.payload.token);//begitu suscess taruh dloacla storage
      return {
        ...state, //update state brarti token brubah ilainya krn diisi dari server putitem dan kmdian get lagi dri storage
        isAuthenticated: true,
        loading: false, //diprkriakan sdang loading di api
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      //kita brsihkan token di storage
      localStorage.removeItem('token');
      return {
        ...state, //update state brarti token brubah ilainya (kosong)krn di get lagi dri storage
        isAuthenticated: false, //jdi galse krn gagal regsiter
        loading: false, //diprkriakan sdang loading di api
      };
    default:
      return state;
  }
}

//catatan dispreat adalah utk kluarkan array mnjadi indivdu2 yg berdiri sndiri
//jadi berdiri terpisah tapi berkumpul dalam object bukan dalam bentuk array
// yg berindex mis :state = [{address:'jl selat sunda1,email:mokong@gmail.com},
//address:'jl selat sunda1,email:mokong@gmail.com},]
//jika didespreate  hi = {...state,address:'lucky'}
//maka hasilnya adalah addess trupdate

//catatan:stlah susun reducer kita buat actionya aslnya mesti action dulu tapi
//kita buat dari end ke hulu biar bisa ngetrace

//JANGAN LUPA CHECK root reducernya ta,bahkan reducer yg sudah kita buats di file index.js

//loading defautlnya adalah true,
/*
jadi setelah fetch atau ada error maka akan ditampilkann menu
karena jsx kita pakai ternary 
{!loading:jika benar: null( jika salah)}
ini sama artinya dengan {!loading && (staement yg benar ditampilkan)}


*/
