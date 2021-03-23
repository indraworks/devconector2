//buat global heaader func isikan token di headernyajadi tinggal pakai
//jjika tak ada token maka delete headernya
import axios from 'axios';
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
 
 
 
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};
export default setAuthToken;




/*

In two words: If you are using expressJS like me.
For solving the problem: 'Access-Control-Allow-Origin' header on a get request just add:

app.use(function(req, res, next) { res.header("Access-Control-Allow-Origin", "*"); res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); next(); });
See here the solution: https://enable-cors.org/server_expressjs.html

*/