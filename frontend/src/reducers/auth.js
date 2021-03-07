import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/type';

//initial state
//smua token alawanya ada di local storage disimpan kita ambil nanti
//state authetication adalah sbb:
//

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null, //defaultnya tapi jika access brhasil maka
  //authenticate adalah true kalau fail nilainya adalah false
  user: null, // diset null krn blum ada isi apa2
  // pass mau login maka ada isinya yaitu nama ,email ,password
};
export default function authReducer(state= initialState, action) {

      switch (action.type) {
        case REGISTER_SUCCESS:
         //ingat harus dikembalikan lagi stelah ubah isi object
         //returnnya dlm btuk objec {}
         //kita tulis utk local storage set item dluar return karn 
         //kita gak nulis distate tapi nulis token yg baru didapat di local storage
         localStorage.setItem('token', action.payload.token)
         return {
           ...state, //update state brarti token brubah ilainya krn di get lagi dri storage
           isAuthenticated:true,
           loading:false, //diprkriakan sdang loading di api
           
         }
        case REGISTER_FAIL:
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