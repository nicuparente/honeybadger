'use strict';

const mongoose = require('mongoose');
let Company = mongoose.model('company');

const campaignSchema = mongoose.Schema({
  name: {type:String, required:true, unique:true, minlength:1},
  company: {type: mongoose.Schema.Types.ObjectId, ref: 'company'},
  targetContribution: {type:Number, required:true},
  creationDate: {type: Date, required: true},
  endDate: {type:Date, required: true},
  foundations: [{type: mongoose.Schema.Types.ObjectId, ref: 'foundation'}],
  contributions: {type:Number}
});

campaignSchema.pre('save', function (next) {
  if(this.company != null) {
    Company.findById(this.company)
      .then(company =>{
        let setCampaignId = new Set(company.campaigns);
        setCampaignId.add(this._id);
        company.campaigns = Array.from(setCampaignId);
        return company.save();
      })
      .then(() => next())
      .catch(() => next(new Error('validation failed to create campaign because compaby does not exist')));
  }
  next();
});

module.exports = mongoose.model('campaign', campaignSchema);
