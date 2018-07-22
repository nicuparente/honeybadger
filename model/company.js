'use strict';

const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
  name: {type:String, required:true, unique:true, minlength:1},
  foundations: [
    {
      foundationId: { type: mongoose.Schema.Types.ObjectId, ref: 'foundation' },
      foundationName: {type: String},
      foundationContribution: {type:Number}
    }
  ],
  campaigns: [{type: mongoose.Schema.Types.ObjectId, ref: 'campaign'}],
  totalContributions: {type:Number},
  contributionTimeline: [{timestamp:{type:Number},value: {type:Number}}]
});

module.exports = mongoose.model('company', companySchema);
