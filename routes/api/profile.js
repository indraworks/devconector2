//route profile
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

//@route   GET api/profile/me  ket:ukt me
//@desc    Test route
//@access  Public

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'there is no profle for this user!' });
    }
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    if (err.kond == 'ObjectId') {
      return res.status(400).send('profile not found!');
    }
    res.status(500).send('error server');
  }
});

//@route   POSTapi/profile
//@desc   Create  and Update profile route
//@access  Private

router.post(
  '/',
  [
    auth,
    [
      check('status', 'status is required').not().isEmpty(),
      check('skills', 'Skills is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    //jika gak ada error maka kit amulai
    //kita adestrcuting dulu  yg gak destrtuing adalah xperience,eduacation blkanagan
    const {
      company,
      website,
      location,
      status,
      skills,
      bio, // tambahan diambil dari social
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram,
    } = req.body;
    //kit abuat objectFields pada Profile
    const profileFields = {};
    profileFields.user = req.user.id;
    //jika ada req.body masing2 object dicheck apa ada nilai jika ya maka masukan ke objecfields
    if (company) {
      profileFields.company = company;
    }
    if (website) {
      profileFields.website = website;
    }
    if (location) {
      profileFields.location = location;
    }
    if (status) {
      profileFields.status = status;
    }
    if (bio) {
      profileFields.bio = bio;
    }
    if (skills) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
      // console.log(profileFields.skills);
      // res.send('hello'); //kalau mau uji pake res.send agar ada nilai balik dari postman
    }

    //build utk objct socila metode harus ada dot socila stlah profileField sbab object dalam {}
    //dari social
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (facebook) profileFields.social.facebook = facebook;

    //check profile cari user apa ada jika ada update jika tidak maka
    // tambah sbgai user /prfoile baru baru
    try {
      let profile = await Profile.findOne({ user: req.user.id });
      //update
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id }, //mrupakan filter dari user yg relation ke profile,yg mana user id ini yg diupdate profilenya
          { $set: profileFields }, //set /udate smua
          { new: true }
        );
        return res.json(profile);
      }
      //jika tidak maka create new profile utk user
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('server error');
    }
  }
  //check apakah ada user id jika ada maka update jika tidak maka create
);

//@route   GET api/profile
//@desc    get all Profile
//@access  Public

router.get('/', async (req, res) => {
  try {
    let profile = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profile);
  } catch (err) {
    res.status(500).send('SErver Error');
    console.log();
  }
});

//@route   GET api/profile/user"user_id
//@desc    get all Profile
//@access  Public

router.get('/user/:user_id', async (req, res) => {
  try {
    let profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);
    res.json(profile);
  } catch (err) {
    if (err.kind == 'ObjectId') res.status(400).send('User Not Found!');
    res.status(500).send('SErver Error');
    console.log(err.message);
  }
});

//@route   DELETE api/profile
//@desc   DELETE user  Profile
//@access  rPrivare

router.delete('/', auth, async (req, res) => {
  try {
    //@todo - remove user post

    //remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    console.log(req.user.id);
    //remove userid
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'Delete user and profile done!' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.put(
  '/experience',

  [
    auth,
    [
      check('title', 'title is required').notEmpty(),
      check('company', 'company is required').notEmpty(),
      check('from', 'date is required').notEmpty(),
    ],
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//sekarang kita mau delete utk yg array experience
//@route   DELETE api/profile/experience
//@desc   DELETE  Profile/experience //jadi kiata delete experience  dari profilenya
//
//@access  private

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    //cari profilenya berdarsar userid
    const profile = await Profile.findOne({ user: req.user.id });
    //kmudian  didalam profile ada fields expericen yg mana kita map
    //untuk di cylcing /atau di urai per-item bersdarkan id experiencenya
    //dan kita tahu experience adalah himpunan array maka kita pilih index mana yg
    //mau di remove bersarkan yg kit aklik atau pilih waktu di fornt end dan disend kesini
    //jadi berupa  req.params.experience_id

    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    //stlah dapat remove indexnya /atau index yg mau dremove kita implementasikan
    profile.experience.splice(removeIndex, 1); // 1 disitu counter brapa element diremove
    //update profile stlah remove dgn disave
    await profile.save();

    res.json(profile);

    //index tunukan idx kbarapa yg start utk diremove!
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// Study

router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is required').notEmpty(),
      check('degree', 'Degree is required').notEmpty(),
      check('fieldofstudy', 'Field of Study Required').notEmpty(),
      check('from', 'Date is required').notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //destruction
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    //update and add study
    try {
      //find Profile
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);
      //unshift utk di tambah diarray education
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err.message);

      res.status(500).send('Server Error');
    }
  }
);

router.delete('/education/:edu_id', auth, async (req, res) => {
  //cari profilenya
  try {
    //find the Profile user id
    const profile = await Profile.findOne({ user: req.user.id });
    //di urai dan loping berdasarkan id dari edication aarray
    const remove_eduIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);
    //jadi an di education adalah aray dan kita uray per object dimana id-nya jadi patookan
    //stlahnya disusul index idnya di arraynya sebabkan array ini [{schol,degre,id},{schol,degre,id}
    //jadi kalau kit apilih object bersarkan id, kalau kmudian kita di frotn end ketik no_id_edcuation
    //yaitu objecynya tapi kita juga liaht di deretan object2 ini kan array maka kita lihat index keberapa dia
    //dari himpunan object2 yg ada di array education tsb
    profile.education.splice(remove_eduIndex, 1);
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

/*
 CATATAN :
ote bedalan ya nama module adalah User,
kalau nama schema adalah user!!!
dan pperlu diingat kelau kit abuat async req.res
mamak di bagian try } catch {} ===>dibagian kalang try harus ada await!


//tentang masalah normalize dibahas :
https://stackoverflow.com/questions/51143871/how-to-normalize-a-url


tentang findOneandUpdate:
https://mongoosejs.com/docs/tutorials/findoneandupdate.html
jangan  lupa kasih {new }
utk set setlah update 

kalau mau buat new Document mongoose :
https://stackoverflow.com/questions/38290684/mongoose-save-vs-insert-vs-create
selalu const valriable = new nameSchma( namaDocumentFIelds)

tentang paramas apa itu degn bedanya dgn req.body?
https://medium.com/@musliadi/apa-perbedaan-req-body-req-params-req-query-pada-nodejs-eb3450914447

2. req.params, req.params berfungsi untuk menangkap nilai yang dikirimkan melalui url yang mengirimkan 
nilai secara langsung tanpa key (lihat contoh url pertama) 
mislanya http://localhost:3000/search/kangmus/16. M
aka untuk menangkap value yang dikirim dari url tersebut pada nodejs/express caranya adalah :

//kita buth error.kind utk response jika 


//finOneAndRemove vs findOneandDelete 
https://stackoverflow.com/questions/50602037/difference-between-findoneanddelete-and-findoneandremove



CATAAN UTK Yg Object di Model yg object dimodel di buat dgn
const objFields = {}
kalau yg object dalam object maka di buat
const objFields.anaObjectFIeld = {}
nah yg di bagian destruct tetap sama
didalam kurung kurwal baik object maupun anak objetc
 const {
   objFields,
   nameFieldAnak objects

 } = req.body

 //nah utk array jika array fieldnya 
Maka disarankan buat route dgn /experience atau nama field yg ada arraynya tadi 
route.put(/experiecne ,()=>{})
 destrucnya tetap sama  :
 const {
   field1,
   field2,
   ...
 } = req.body

 baru buat masukan ke new obj variable
 const newFieldArray = {
   field1,field2 ...
 }

 kalu ngisi caranya 
 Profile.expericene.unshift(newFieldArray)



*/
