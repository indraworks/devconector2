//mmbuat routes utk users
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator'); //pakai express validator masih bisa
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//require Users models
const User = require('../../models/User');

//@route   POST api/users
//@desc    Register new user name,email,password
//@access  Public

router.post(
  '/',

  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include valid email').isEmail(),
    check(
      'password',
      'Please enter pasword with 6 or more chacracter'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    //console.log(req.body); //test dari frontend kirim req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //jika ada error
      //bad request (400)
      return res.status(400).json({
        errors: errors.array(), //errornya muncul bersarkan aarray
        //dari nvalidation diatas!
      });
    }
    //jika success buat new users dan disave di db mongodb
    const { name, email, password } = req.body;
    try {
      //see if user exist ,give  err.message
      //user exist check di mongodb use findOne
      let user = await User.findOne({ email });
      console.log(user);
      if (user) {
        return res.status(400).json({
          error: [{ msg: 'User already exists' }],
        });
      }
      //get users gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      user = new User({
        //note :ini create object blum disave,tnggu di encrypt dulu pwnya
        name,
        email,
        avatar,
        password,
      });
      const salt = await bcrypt.genSalt(10); //generate algorimtma crypt hash256
      user.password = await bcrypt.hash(password, salt); // field pasword mongdb brisi pasword input yg trencrypt
      //encrypt password :sblum User disave di encruypt dulu password sblum masuk field password di mongodb
      await user.save();

      //return json web token
      const payload = {
        user: {
          id: user.id, //krn pakai mongoose bisa gkperlu _id
        },
      };
      //res.send('Users registered');

      //note:asyncronus lhat note dibwah
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token }); //token:token disingkat krn sama variablenya
          //kalau mau masukan di cookie bisa sprti ini :
          // res.cookie('t', token, { expire: new Date() + 999 });
        }
      );
    } catch (err) {
      console.log(err.message);
      //server Error
      res.status(500).send('server Error');
    }
  }
);

module.exports = router;

/*CATATAN:
re.body adlah inputan user dari fron end ditag html form
mis name,email,password satu kesatuan type submit
atauu satu body tag html
prakteknya:
///POSTMAN///
di postman kita isi req.body
perlu ingat authorization diisi :Content-type :application/json
pada raw body tulis:
{
  "name":"indra",
  "email":"indra.works2019@gmail.com",
  "password":"1234"
}
kita tekan enter dan di node js pada postman respones:
"User route " sbgai hasil res.send
/// CNSOLE LOG response program dari program
di app.js console.log(req.body ):
 istening port 5300
Mongodb connected...
{
  name: 'indra suryawan',
  email: 'indra.works2019@gmail.com',
  password: '1234'
}
intinya apapun yg diketik dari frontend dgn post req.body
dicatata oleh node js maak akan kluar hasilnya ...sesuai 
re.body yg dikirimkan
doc:https://express-validator.github.io/docs/check-api.html
//VALIDATIOn nah kadang yg dikirim gak sesuai req.body ada input2 yg salah 
utk itu di validasi ,kita declare dulu kita require lvaidasi validasi banyaka ada
macam2 body,cookies dll lihat doc,disin kita buth validasi body

note!pada express -validator versi 6.90 masih bisa pakai check 
cuman di required gak perlu ditulis:require {../check!}
contoh dipostman response valiadation jika kita gak masukan email dan password sbb:
"errors": [
        {
            "msg": "Please include valid email", //msg yg kita pasang stlah fields diatas
            "param": "email", // fields dari body (param)
            "location": "body" //yg kit avalidation adala req.body
        },
        {
            "msg": "Please enter pasword with 6 or more chacracter",
            "param": "password",
            "location": "body"
        }
    ]

    Note: Kita tetap pakai async await
    dan digabung try catch(error)

    note diatas kita pakay 
    req.body.name,req.body.email,req.body.password
    bisa di distruction  const {name,emai,password} = req.body

    //note :pemaikan gravatar: https://github.com/emerleite/node-gravatar#readme
    s:size, r:rating pilihan bisa 'x' bisa 'pg',d:default ini jika kendala network
    yg tampilkan apa? bisa '404',bisa 'retro', bisa 'mm'



    */

/*
    CATATAN JSONWEBTOKEN :
    Synchronous Sign with RSA SHA256

       kalau syncroition dia di masukan variable nama token

        /  / sign with RSA SHA256
        var privateKey = fs.readFileSync('private.key');
        var token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256'});
      
      
      /////  Sign asynchronously//////
      kalau aasyncronus gak perlu langsung tulis token di calback functionnya 
      jwt.sign(payload,jwtScret,experiedTIme,(err,token)=>{
          
      })

          jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' }, function(err, token) {
            console.log(token);
          });

  jadi webtoken itu dibuat agar nti jik aada route2 yg dibuat private oleh server 
  hanya user yg autentikate yg boleh acess route trsbut ,nah salah satunya adalah
  dgn kasih feedback token ke node js ketika dia login ,
  jadi pada saat rregister si user di buatkan token nilainya adalah 
  id dari user,kmudian ada screet word,dan expired nah ktika user login lagi 
  maka dia akan kmblikan token tsb di vrify oleh nodejs/server apakah 
    */

/* ///// toke di sinpan di COOKIE/////
  jadi ketika register/login tadi nodejs response dedfaulnya token di simpan di local storage
  tapi kita bisa simpan di cookie dgn cara:
   doc: https://expressjs.com/en/5x/api.html#res.cookie
    //#89. res.cookie('t', token, { expire: new Date() + 999 });
    format function res.cookie : res.cookie(name, value [, options]) 
    valuenya memang kita isi token, name bisa smbarang biasaynya 't' 
    sbgai singaktan token yg dismpan ,option bisa lamanya ada di cookies
    alias eaxpiresnya:
    CONTOH:

   res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true })
   https://www.geeksforgeeks.org/express-js-res-cookie-function/
  */
