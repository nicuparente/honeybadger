'use strict';
const { Router } = require('express');
const jsonParser = require('body-parser').json();
const Company = require('../model/company.js');
const companyRouter = module.exports = new Router();

companyRouter.post('/api/company', jsonParser, (req, res, next) => {
  Company.create(req.body)
    .then(company => res.send(company))
    .catch(next);
});

companyRouter.get('/api/company/:id', (req, res, next) => {
  Company.findById(req.params.id)
    .then(company => {
      res.json(company);
    })
    .catch(next);
});

companyRouter.get('/api/company', (req, res, next) => {
  Company.find({})
    .then(companies => {
      res.json(companies);
    })
    .catch(next);
});

companyRouter.put('/api/company/:id', jsonParser, (req, res, next) => {
  Company.findByIdAndUpdate(req.params.id, req.body)
    .then(company => res.json(company))
    .catch(next);
});

companyRouter.delete('/api/company/:id', (req, res, next) => {
  Company.findById(req.params.id)
    .then(company => company.remove())
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
});