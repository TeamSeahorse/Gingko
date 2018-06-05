const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const userController = require('./userController'); 
const apiController = require('./apiController'); 

const mongoose = require('mongoose'); 

const MLAB_URI = 'mongodb://MylesG:ilovetesting1!@ds249530.mlab.com:49530/users';

mongoose.connect(MLAB_URI);
mongoose.connection.once('open', () => { 
	console.log('Connected to Database'); 
});

app.use(bodyParser.json());

app.use(express.static(__dirname + './../dist'));

app.post('/signup', userController.createUser);

app.post('/login', 	userController.verifyUser,
					apiController.makeInterestRequests);

app.post('/addApi', userController.addInterest, apiController.addApi);

app.post('/settings', userController.defaultInterest, (req, res) => {
});

app.post('/interests', apiController.addInterests);


app.listen(3000, (err, res) => {
	if (err) return err;
	console.log('Listening on port 3000!');
});

module.exports = app;
