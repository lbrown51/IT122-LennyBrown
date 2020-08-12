'use strict';
const express = require("express");
const bodyParser = require("body-parser");
let exphbs = require("express-handlebars");

const Members = require('./models/Members.js');

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname +'/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', require('cors')());

app.engine('handlebars', exphbs({defaultLayout: false}));
app.set("view engine", "handlebars");

app.get('/', (req, res) => {
  return Members.find({}).lean()
    .then((team) => {
      res.render('home', { team: JSON.stringify(team) });
    })
    .catch(err => next(err));
});

app.get('/detail', (req, res) => {
  return Members.findOne({ id: req.query.id }).lean()
    .then((member) => {
      res.render('detail', { member });
    })
    .catch(err => next(err));
});

app.get('/delete', (req, res) => {
  Members.findOneAndDelete({ id: req.query.id }).lean()
    .then((member) => {
      if (member) {
        res.render('delete', { status: 'Successful', member });
      } 
      else {
        res.render('delete', { status: 'Failure', member });
      }
    })
    .catch((err) => {
      res.send('Error!');
    });
});

app.get('/about', (req, res) => {
  res.type('text/html');
  res.status(200);
  const firstLine = "Website for all kinds of people, made by Lenny Brown. ";
  const secondLine = "My life path so far is Philadelphia -> Rochester -> Thailand -> Seattle. ";
  const thirdLine =  "I was in the Data Science program at University of Rochester, but now ";
  const fourthLine = "I'm in the App Dev program at North Seattle College.";

  res.end(`<p style="padding: 50px;">${firstLine}${secondLine}${thirdLine}${fourthLine}</p>`);
});


app.get('/api/members/getAll', (req, res) => {
  return Members.find({}).lean()
    .then((members) => {
      res.json(members);
    })
    .catch(err => res.status(500).send('Error occurred: database error.'));
});

app.get('/api/members/get/:id', (req, res) => {
  return Members.findOne({ id: req.params.id }).lean()
    .then((member) => {
      res.json(member);
    })
    .catch(err => res.status(500).send('Error occurred: database error.'));
});

app.get('/api/members/delete/:id', (req, res) => {
  return Members.findOneAndDelete({ id: req.params.id }).lean()
    .then((member) => {
      if (member) {
        res.send(`Member: ${member.firstName} ${member.lastName} deleted successfully`);
      } 
      else {
        res.status(500).send('Error occurred: database error.');
      }
    })
    .catch(err => res.status(500).send('Error occurred: database error.'));
});

app.post('/api/members/upsert', (req, res) => {
  console.log(req.body);
  const { firstName, lastName } = req.body
  return Members.findOneAndUpdate({ id: req.body.id }, req.body, { upsert: true }).lean()
    .then((member) => {
      if (member) {
        res.json(member);
        // res.send(`Member: ${member.firstName} ${member.lastName} (formerly if you changed first or last name) has been updated successfully.`);
      }
      else {
        res.json(member);
        // res.send(`Member: ${firstName} ${lastName} added successfully.`);
      }
    })
    .catch(err => res.status(500).send('Error occurred: database error.'))
});


app.use( (req, res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
  console.log("Express Started");
});