'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {type:String, required:true, unique:true, minlength:1},
  joined: {type:Date},
  foundations: [{type: mongoose.Schema.Types.ObjectId, ref: 'foundation'}],
  contribution: {type:Number}
});

module.exports = mongoose.model('user', userSchema);
