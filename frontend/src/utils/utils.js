import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common;
  }
};

export default setAuthToken;

/*
jadi fucntion ini utk check apa ada di local storage kita ini token
jika tidaj a
da maka kita delete headaernya(axios)
tapi jika ada maka kita masukan isi token sebagai object dari 
bagian headaer(axios)


*/


/*
AXIOS GLOBALL SET !!
SEUMBER BACAAN KALAU MAU LIAT ngeset axios defaultnya jadi dimasukan itu 
ngeset headersnya dan token diwraping  jadi pas manggil axios lagi header nya dan token gak perlu di configure
lafi cukup panggil axios.get atau axios.put/post karena udah ada diwrap dalam axios itu sndiri:
https://stackoverflow.com/questions/51794553/how-do-i-create-configuration-for-axios-for-default-request-headers-in-every-htt

link kedua :
https://github.com/axios/axios#global-axios-defaults


jadi yg di buat brad itu sperti ini  mis dalam sbuah function 


const myAxios =(token)=> {
  axios.default.headers.common['x-auth-token] = token
  //tingal pagglil axios metode dan adress yg header udah ada builtin dalam 
  //dah wraping isi tokennya didalam function axios itu smdiri 
  //
  const res = axios.get('/api/auth')
   if (res) {
     return res.data   //dimasukan data hasilnya yaitu brupa boolean false atau true
   }


}
//porgam utama 

import axios from 'axios';
const token = LocalStorage.token;
let hasiAxios = myAxios(token)

*/
