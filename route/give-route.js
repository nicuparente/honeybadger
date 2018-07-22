'use strict';

const { Router } = require('express');
const jsonParser = require('body-parser').json();
const mongoose = require('mongoose');

const User = mongoose.model('user');
const Company = mongoose.model('company');
const Campaign = mongoose.model('campaign');
const Foundation = mongoose.model('foundation');

const giveRouter = module.exports = new Router();

///This needs a huge refactor...... Sweetbaby Jesus

giveRouter.post('/api/give',jsonParser, (req, res, next) => {
  let donatedAmount = req.body.donated

  //Needed to update the User data regarding donation
  let userP = User.findById(req.body.userId)
    .then(user => {
      let companyFound = false;
      let foundationFound = false;
      //Update Company Contributions in User 
      let userCompaniesNew = user.companies.map(company => {
        if(company.companyId == req.body.companyId){
          companyFound = true;
          company.companyContribution += donatedAmount;
        }
          return company;
      })

      if(!companyFound){
         userCompaniesNew.push({
          companyId: req.body.companyId,
          companyName: req.body.companyName,
          companyContribution: donatedAmount
         })
      }

      let userFoundationNew = user.foundations.map(foundation => {
        if(foundation.foundationId == req.body.foundationId){
          foundationFound = true;
          foundation.foundationContribution += donatedAmount;
        }
          return foundation;
      })

      if(!foundationFound){
         userFoundationNew.push({
          foundationId: req.body.foundationId,
          foundationName: req.body.foundationName,
          foundationContribution: donatedAmount
         })
      }
      
      user.companies = userCompaniesNew;
      user.foundations = userFoundationNew;
      user.contributionsTotal += donatedAmount;
      user.save();
    })
    .catch(() => new Error('Cannot update'))
  
  let companyP = Company.findById(req.body.companyId)
    .then(company => {
      let foundationFound = false;
      let companyFoundationNew = company.foundations.map(foundation => {
        if(foundation.foundationId == req.body.foundationId){
          foundationFound = true;
          foundation.foundationContribution += donatedAmount;
        }
          return foundation;
      })
      console.log(foundationFound);
      if(!foundationFound){
        companyFoundationNew.push({
          foundationId: req.body.foundationId,
          foundationName: req.body.foundationName,
          foundationContribution: donatedAmount
         })
      }
      company.foundations = companyFoundationNew;
      company.totalContributions += donatedAmount;
      company.save();
    })
    .catch(() => new Error('Cannot update'))
  
  Promise.all([userP,companyP]).then((result) => {
    res.send({"status": "Successful"})
  })
  .catch(err =>{
    console.log(err)
  })
});

