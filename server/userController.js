const User = require('./../db/loginSchema');

// middleware for logins && signups

const userController = {};
userController.createUser = (req, res) => {

	User.create({
		username: req.body.username,
		password: req.body.password
	}, (err, user) => {
		if (err) {
			console.log(err);
			res.send({error: 'Could not create user'});
		}
		else res.status(200).send(user);
	});

};

userController.verifyUser = (req, res, next) => {
	console.log('verifyUser req.body: ', req.body);
	User.findOne(req.body, (err, userInfo) => {
		console.log('userInfo: ',userInfo);
		if (userInfo == null) {
			console.log('userInfo == null');
			res.send({error: 'user does not exist, please create an account'});
		} else {
			console.log('userInfo != null');
			res.locals.userInfo = userInfo;
			next();
		}
	});

};

function isURL(str) {
	var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
	'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name and extension
	'((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
	'(\\:\\d+)?'+ // port
	'(\\/[-a-z\\d%@_.~+&:]*)*'+ // path
	'(\\?[;&a-z\\d%@_.,~+&:=-]*)?'+ // query string
	'(\\#[-a-z\\d_]*)?$','i'); // fragment locator
	return pattern.test(str);
}

userController.defaultInterest = (req, res, next) => {
	// console.log('receiving from verification: ', res.locals.userInfo);
	User.findOne(res.locals.userInfo, 
		 (err, success) => {
			console.log('err is : ', err);
			console.log('success : ', success);
		//   if (err) return err;
		//   else res.send(success);
		}
	);
};

userController.addInterest = (req, res, next) => {
	console.log('Inside userController - req.body: ', req.body);

	User.findOne({username: req.body.username}, (err, user) => {
		if (err) return console.log(err);
		if (user == null) {
			console.log('user == null');
			res.send({error: 'user does not exist, please create an account'});
		} else {
			console.log('user != null');
			user.set({ interests: req.body.interests });
			user.save(function (saveErr, updatedUser) {
				if (saveErr) return res.send(saveErr);
				// res.send(updatedUser);
				res.locals.userInfo = updatedUser;
				next();
			});
		}
	
	});

};


userController.deleteInterest = (req, res, next) => {

};

module.exports = userController;

