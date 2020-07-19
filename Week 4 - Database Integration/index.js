'use strict';
const express = require("express");
const bodyParser = require("body-parser");
let exphbs = require("express-handlebars");

const members = require('./models/Members.js');

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname +'/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({defaultLayout: false}));
app.set("view engine", "handlebars");

app.get('/', (req, res) => {
    return members.find({}).lean()
        .then((team) => {
            res.render('home', { team });
        })
        .catch(err => next(err));
});

app.get('/detail', (req, res) => {
    return members.findOne({ id: req.query.id }).lean()
        .then((member) => {
            res.render('detail', { member });
        })
        .catch(err => next(err));
});

app.get('/delete', (req, res) => {
    members.findOneAndDelete({ id: req.query.id }).lean()
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

app.use( (req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log("Express Started");
});