const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //Get token from header
  const token = req.header('x-auth-token');

  //check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token authorization denied' });
  }

  //verify if token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user; // decoded.user mksudnya ambil value dari
    //key user object user:{id:user.id}

    console.log('req.user =', req.user); //hasil :req.user = { id: '5fec3264a1924573ce50e580' }
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

/*////CATAAN JALANNYA DAN GUNA WEBTOKEN////
disni kit akan buat midleware yaitu utk proteksi route2 yg private
yg mana yg boleh access ke route ini adalah user yg sudah login
nah kktia user login maka 
user bawa header ,maka oleh nodeb dibaca dan jug apayloadnya di bca
nodeb ada scret +payload+header === secret+payload_header yg sblumnya 
ada di buat oleh nodejs( token yg dibuat pdwaktu user  login
ktika mau access route yg rpivate maka nodejs mllaui midleware inilah filter
dan ceck itu tadi validasi nya 
saya terangkan lagi :
jadi user mau access route private misal /api/profile mau edit(PUT) atau GET
nah otomatis dia req kerouter dgn bawa header ,nah si node check header itu yg isi token
jika gak ada maka gak bisa masuk /gak authentik,
jika ada token maka check tokennya jika ia dimasukan di req.user 
jika ada error waktu token dicheck maka respon msg error token
nah req.user ini info tadi adalah payloada trgantung diisi apa kalau disini 
pada kusrsus ii diisi  user.id 

////////////////PENJELASAN HUBUNGANNNYA SAMA REDUX LOADER nah ini dia
jadi USER_LOADER adalah periksa utk periksa token distorage masih valid apa tidak 
jika valid maka isAuthenticated dipasang dng true 
jika tikda maka kirim error nah disini maka akan 
didevode token dgn json verify dilihat isi idnya user_id 
nah dimasukan ke req.user nah req user masuk ke dalam 
auth ( di router)  yg skrgn ini kan auth di midleware  utk decode saja 
nah di auth route isinya adalah utk periksa user.req idnya apa ada di dalam database jika ada
maka dia valid




*/
