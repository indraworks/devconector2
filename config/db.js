const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

//kita pakai async await bukan promise,dan sllau ada try catch..
const connectDB = async () => {
  //trauh di catch block biar tahu failnya
  try {
    await mongoose.connect(db, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log('Mongodb connected...');
  } catch (err) {
    console.error(err.message);
    //exit process iwith failure
    process.exit();
  }
};

module.exports = connectDB;
