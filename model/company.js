'use strict';

const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
  name: {type:String, required:true, unique:true, minlength:1},
  foundations: [{type: mongoose.Schema.Types.ObjectId, ref: 'foundation'}],
  campaigns: [{type: mongoose.Schema.Types.ObjectId, ref: 'campaign'}],
  total_contributions: {type:Number}
});

module.exports = mongoose.model('company', companySchema);
