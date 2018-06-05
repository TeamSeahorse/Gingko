/* eslint-disable */
const request = require('request');
const apiController = {};
const login = require('../db/loginSchema');

// let apiLink = 'http://pokeapi.co/api/v2/pokemon/55/';
// let apiLink = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';
// let apiLink = 'https://swapi.co/api/films/1/';

// SET UP AN MLAB/ RUN DB LOCALLY, CHANGE MAKEINTERESTREQUEST MIDDLEWARE


// const supportedApiLinks = {
// 	'0': 'http://pokeapi.co/api/v2/pokemon/55/',
// 	'1': 'https://swapi.co/api/films/1/',
// 	'2': 'https://api.sunrise-sunset.org/json?lat=40.727504&lng=-73.980065'
// }

apiController.makeSingleReq = (req, expRes, next) => {
	request(apiLink, { json: true }, (err, apiRes, body) => {
	  if (err) { return console.log(err); }
	  // console.log(apiRes);
	  expRes.send({name: body.name});
	});
};

apiController.addInterests = (req,res) => {
	// console.log(req.body);
	// res.send(req.body);
	const username = req.body.username;
	const interest = req.body.interest;
	login.findOne({"username": username}, (err, result) => {
		if (err) {
			res.send(err);
		} else {
			result.interests.push(interest);
			console.log(result);
			result.save((err) => { 
				if (err) {
				res.send(err)
			} else {
				res.send(result);
			}})
			// res.send(result);
		}
	})
};

apiController.makeInterestRequests = (req, expRes, next) => {
	// Going to add onto the res.userInfo object that will eventually be sent to the user
	// Interests to loop through should be in expRes.locals.userInfo.interests
	// let apiArr = expRes.locals.userInfo.interests;
	let apiArr = expRes.locals.userInfo.interests;
	// let apiArr = [0];
	let apiResults = [];
	let userAPIs = expRes.locals.userInfo.interests;


	console.log('THIS IS REQ.BODY',req.body);

	for (let i = 0; i < userAPIs.length; i += 1) {

		let newReqPromise = new Promise((resolve, reject) => {
			request(userAPIs[i], { json: true }, (err, apiRes, body) => {
			  if (err) { 
			  	console.log(err);
			  	reject('err');
			  }
			  resolve(body);
			  // expRes.send({name: body.name});
			});
		})

		apiResults.push(newReqPromise);
	}

	Promise.all(apiResults).then((results) => {
	    // Brute force copy object
	    let dataToSend = {};
	    dataToSend.interests = expRes.locals.userInfo.interests.slice(0);
	    dataToSend._id = expRes.locals.userInfo._id;
	    dataToSend.username = expRes.locals.userInfo.username;
	    dataToSend.password = expRes.locals.userInfo.password;
	    dataToSend.apiData = results;
	    console.log('New data to send', dataToSend);
	    expRes.json(dataToSend);
	});

};

apiController.addApi = (req, expRes, next) => {
	console.log('In apiController.addApi - expRes.locals.userInfo: ',expRes.locals.userInfo);
	let apiArr = expRes.locals.userInfo.interests;
	let apiResults = [];
	for(let i = 0; i < apiArr.length; i++) {
		let newReqPromise = new Promise((resolve, reject) => {
			request(supportedApiLinks[apiArr[i]], { json: true }, (err, apiRes, body) => {
			  if (err) { 
			  	console.log(err);
			  	reject('err');
			  }
			  resolve(body);
			  // expRes.send({name: body.name});
			});
		})
		apiResults.push(newReqPromise);
	}

	Promise.all(apiResults).then((results) => {
		// Brute force copy object
		let dataToSend = {};
		dataToSend.apiData = results;
		console.log('New data to send', dataToSend);
		expRes.json(dataToSend);
	});

}

module.exports = apiController;