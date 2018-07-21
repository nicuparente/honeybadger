'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {type:String, required:true, unique:true, minlength:1},
  joined: {type:Date},
  foundations: [
    {
      foundationId: { type: mongoose.Schema.Types.ObjectId, ref: 'foundation' },
      foundationName: {type: String},
      foundationContribution: {type:Number}
    }
  ],
  companies: [
    {
      companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'company' },
      companyName: {type: String},
      companyContribution: {type:Number}
    }
  ],
  contributionsTotal: {type:Number}
});

module.exports = mongoose.model('user', userSchema);
