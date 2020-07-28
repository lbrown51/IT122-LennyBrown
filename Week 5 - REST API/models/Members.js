const mongoose = require('mongoose');
const team = require('./data.js');
require('dotenv').config();

const user = process.env.MONGO_USERNAME;
const pass = process.env.MONGO_PASSWORD;
const url = process.env.MONGO_URL;
const dbname = 'SCCProjects';

let uri = `mongodb+srv://${user}:${pass}@${url}/${dbname}?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

mongoose.connection.on('open', () => {
    console.log('Mongoose Connected.');
});

const memberSchema = mongoose.Schema({
    id: Number,
    firstName: String,
    lastName: String,
    favoriteWord: String,
    favoritePhrase: String,
    skill: String
});

const Member =  mongoose.model('Member', memberSchema);
Member.deleteMany({}, (err) => {});

const members = team.getAll();
Member.insertMany(members, (err, docs) => {});

module.exports = Member;