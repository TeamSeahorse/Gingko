const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const loginSchema = new Schema({ 
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}, 
  interests: {type: Array, default: []}
});

module.exports = mongoose.model('users', loginSchema); 