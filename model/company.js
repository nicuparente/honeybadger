'use strict';

const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
  name: {type:String, required:true, unique:true, minlength:1},
  foundations: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'foundation' },
      foundationContribution: {type:Number}
    }
  ],
  campaigns: [{type: mongoose.Schema.Types.ObjectId, ref: 'campaign'}],
  totalContributions: {type:Number}
});

module.exports = mongoose.model('company', companySchema);
