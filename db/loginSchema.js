const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const loginSchema = new Schema({ 
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}, 
  interests: {type: Array, default: []}
});


loginSchema.pre('save', function(next) {
  // console.log('username: ',this.username);
  console.log('save: ',this.password);
  // let that = this;
  bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hash) => {
    console.log('inside password: ',this.password);
    if(hash) {
      this.password = hash;
      console.log('this.password: ', this.password)
      return next();
    }  
    return next(new Error(err));
  });

});

module.exports = mongoose.model('login', loginSchema); 