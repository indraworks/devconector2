const express = require('express');
const connectDB = require('./config/db');
// const cors = require('cors');
const app = express();

//cors
// app.use(cors());

//connectDB
connectDB();

//init midleware
app.use(express.json({ extended: false }));

//define routers
app.use('/api/users', require('./routes/api/users')); //utk login
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 6500;
app.listen(PORT, () => console.log(`listening port ${PORT}`));

/*
catatan node tahu kalau ada req.body
dgn iitmiddleware :app.use(express.json({extended:false}))


*/
