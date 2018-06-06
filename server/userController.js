const User = require('./../db/loginSchema');

const bcrypt = require('bcrypt');

// middleware for logins && signups

const userController = {};
userController.createUser = (req, res) => {
	
	let createUser = new User({
    username: req.body.username,
    password: req.body.password
	});
	createUser.save((err) => {
    if(err) {
      console.log(err);
			res.send({error: 'Could not create user'});
    } else {
			console.log('no err')
			res.status(200).send();
    }
	});

};

userController.verifyUser = (req, res, next) => {
	console.log('verifyUser req.body: ', req.body);
	User.findOne({username: req.body.username}, (err, userInfo) => {
		console.log('userInfo: ',userInfo);
		if (userInfo == null) {
			// res.send({error: 'user does not exist, please create an account'});
			res.send(err);
		} else {
			console.log('req.body.password: ',req.body.password, ", userInfo.password: ",userInfo.password)
			bcrypt.compare(req.body.password, userInfo.password, (err, result)=> {
				if(result) {
					res.locals.userInfo = userInfo;
					next();
				} else {
					res.send(err);
				}
			});

		}

	});

};

// function isURL(str) {
// 	var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
// 	'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name and extension
// 	'((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
// 	'(\\:\\d+)?'+ // port
// 	'(\\/[-a-z\\d%@_.~+&:]*)*'+ // path
// 	'(\\?[;&a-z\\d%@_.,~+&:=-]*)?'+ // query string
// 	'(\\#[-a-z\\d_]*)?$','i'); // fragment locator
// 	return pattern.test(str);
// }

userController.addInterest = (req, res, next) => {
	console.log('Inside userController - req.body: ', req.body);
	User.findOne({username: req.body.username}, (err, user) => {
		if (err) return console.log(err);
		if (user == null) {
			console.log('user == null');
			res.send(err);
		} else {
			console.log('user != null');
			console.log('user: ',user);
			user.set({ interests: req.body.interests });
			res.locals.userInfo = user;
			User.findByIdAndUpdate(user._id, { $set: { interests: req.body.interests }}, { new: true }, function (err, user) {
				if (err) return handleError(err);
				next();
			});
		}
	});
};


userController.deleteInterest = (req, res, next) => {
	User.findOne({username: req.body.username}, (err, user) => {
		if (err) return console.log(err);
		if (user == null) {
			console.log('user == null');
			res.send(err);
		} else {
			console.log('user != null');
			console.log('user: ',user);
			user.set({ interests: req.body.interests });
			res.locals.userInfo = user;
			User.findByIdAndUpdate(user._id, { $set: { interests: req.body.interests }}, { new: true }, function (err, user) {
				if (err) return handleError(err);
				next();
			});
		}
	});
};

module.exports = userController;

