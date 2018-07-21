'use strict';

const mongoose = require('mongoose');

const foundationSchema = mongoose.Schema({
  name: {type:String, required:true, unique:true, minlength:1},
  companies: [{type: mongoose.Schema.Types.ObjectId, ref: 'company'}],
  users:[{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
  total_amount: {type:Number}
});

module.exports = mongoose.model('foundation', foundationSchema);
