'use strict';

const { Router } = require('express');
const jsonParser = require('body-parser').json();
const mongoose = require('mongoose');

const User = mongoose.model('user');
const Company = mongoose.model('company');
const Campaign = mongoose.model('campaign');
const Foundation = mongoose.model('foundation');

const giveRouter = module.exports = new Router();

giveRouter.post('/api/give',jsonParser, (req, res, next) => {
  let donatedAmount = req.body.donated
  User.findById(req.body.userId)
    .then(user => {
      let companyFound = false;
      let foundationFound = false;
      console.log(req.body)
      //Update Company Contributions in User 
      let userCompaniesNew = user.companies.map(company => {
        console.log(req.body.companyId == company.companyId)
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
        console.log(req.body.foundationId == foundation.foundationId)
        if(foundation.foundationId == req.body.foundationId){
          foundationFound = true;
          foundation.foundationContribution += donatedAmount;
        }
          return foundation;
      })

      if(!foundationFound){
        console.log(req.body.foundationName);
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
      res.send({"status": "Successful"})
    })
    .catch(() => new Error('Cannot update'))
});

