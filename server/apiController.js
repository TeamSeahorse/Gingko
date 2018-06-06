/* eslint-disable */
const request = require('request');
const apiController = {};

// let apiLink = 'http://pokeapi.co/api/v2/pokemon/55/';
// let apiLink = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';
// let apiLink = 'https://swapi.co/api/films/1/';

const supportedApiLinks = {
	'0': 'http://pokeapi.co/api/v2/pokemon/55/',
	'1': 'https://swapi.co/api/films/1/',
	'2': 'https://api.sunrise-sunset.org/json?lat=40.727504&lng=-73.980065',
	'3': 'https://api.meetup.com/topics?offset=0&format=json&search=tech&only=id%2Cname&photo-host=public&page=3&order=members&sig_id=189035799&sig=ef93d8ab060061e347e77301b4e1e41336d73931',
	'4': 'https://en.wikipedia.org/w/api.php?action=opensearch&search=javascript&limit=5'
}

apiController.makeSingleReq = (req, expRes, next) => {
	request(apiLink, { json: true }, (err, apiRes, body) => {
	  if (err) { return console.log(err); }
	  // console.log(apiRes);
	  expRes.send({name: body.name});
	});
};

apiController.makeInterestRequests = (req, expRes, next) => {
	// Going to add onto the res.userInfo object that will eventually be sent to the user
	// Interests to loop through should be in expRes.locals.userInfo.interests
	// let apiArr = expRes.locals.userInfo.interests;
	let apiArr = expRes.locals.userInfo.interests;
	// let apiArr = [0];
	let apiResults = [];

	for (let i = 0; i < apiArr.length; i += 1) {

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
	    dataToSend.interests = expRes.locals.userInfo.interests.slice(0);
	    dataToSend._id = expRes.locals.userInfo._id;
	    dataToSend.username = expRes.locals.userInfo.username;
	    dataToSend.password = expRes.locals.userInfo.password;
			dataToSend.apiData = results;
			dataToSend.apiList = [];
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
				console.log('API body: ',body)
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