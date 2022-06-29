import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/wetube');

const db = mongoose.connection;

const handleError = error => console.log('❌ DB error', error);
const handleOpen = () => {console.log('✔ Connect to DB')};

db.on('error', handleError);
db.once('open', handleOpen);