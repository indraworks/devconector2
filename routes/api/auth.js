//route auth
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

//@route   GET api/auth
//@desc    Test route
//@access  Private

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    //dipakai findById dimana req.user adlaah isi dari user.id = req.user = { id: '5fec3264a1924573ce50e580' } nilai sbgai contoh
    res.json(user); //tampilkan smua user field except passwordnya
    console.log(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

//@route   POST api/auth;
//@desc    Login Authentication (email,password) & get Token
//@access  Public

router.post(
  '/',

  [
    check('email', 'Please include valid email').isEmail(),
    check('password', 'Please Password required').exists(),
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
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      // console.log(' hello this is user ', user);
      if (!user) {
        //jika email gak ada
        return res.status(400).json({
          error: [{ msg: 'Invalid Credential !' }],
        });
      }

      //compare password input vs pasword db
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          error: [{ msg: 'Invalid Credential !' }],
        });
      }

      //return json web token
      //dibawah ini payload di encrypt yg mrupakan data user yg lgin
      //utk dibuatkan token ,dan nanti datanya di buka kalau mau access route private
      //didiecode dari midlreware/auth jika user tadai acess route yg prive
      //nanti adalah id,name dari user
      const payload = {
        user: {
          id: user.id,
          //krn pakai mongoose bisa gkperlu _id
        },
      };
      //res.send('Users registered');
      //jadi setlah login dimasukin payload data utk si user
      //maka di compres dibuat token baru dikirm balik ke local storagenya user
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

/*CATATAN :
kita coba route /api/auth kita private dgn taruh midleware module auth,js
didepan calback function ,shingga user yg ligin au access dipreiksa tokennya 
oleh node js 

cara coba utk di postmane 
di headaer type sblahkiri panel :x-auth-token
utk token sblakh kana panel tingal tulis  no tokenya tanpa perlu pakai Bearer
sprti biasanya 

//tentang key value pada object misalkan:
aslinya data payload  isinya :
user:{id: '5fec3264a1924573ce50e580'}
kmudian mau ambil valuenya maka yg kadi dot adalah user
maka cara panggil :req.user ===>hasil: {id: '5fec3264a1924573ce50e580'}
nah jika ingin ambil value dari key id maka dotnya adalah id
req.user.id  shingga di dapat =valuenya saja '5fec3264a1924573ce50e580
kalua blum paham coba pljari object javascript
dimana sleslau  { key: value } <--ini mrupakan obejct literal


Pnegtesan login auth.post jika berhasil 
dan mau check verfy benar apa tidak user tsb maka di postman 
gunakan get /api/auth 
masukan token yg didapat dari login tadi nanati jika reponse muncul sama dari user.id ...email
brarti sudah valid atau bnar!

*/
