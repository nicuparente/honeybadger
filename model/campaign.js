'use strict';

const mongoose = require('mongoose');

const campaignSchema = mongoose.Schema({
  name: {type:String, required:true, unique:true, minlength:1},
  foundations: [{type: mongoose.Schema.Types.ObjectId, ref: 'foundation'}],
  company: {type: mongoose.Schema.Types.ObjectId, ref: 'company'},
  total_contributions: {type:Number}
});

module.exports = mongoose.model('campaign', campaignSchema);
