'use strict';
const { Router } = require('express');
const jsonParser = require('body-parser').json();
const Campaign = require('../model/Campaign.js');
const campaignRouter = module.exports = new Router();

campaignRouter.post('/api/campaign', jsonParser, (req, res, next) => {
  Campaign.create(req.body)
    .then(campaign => res.send(campaign))
    .catch(next);
});

campaignRouter.get('/api/campaign/:id', (req, res, next) => {
  Campaign.findById(req.params.id)
    .then(campaign => {
      res.json(campaign);
    })
    .catch(next);
});

campaignRouter.get('/api/campaign', (req, res, next) => {
  Campaign.find({})
    .then(companies => {
      res.json(companies);
    })
    .catch(next);
});

campaignRouter.put('/api/campaign/:id', jsonParser, (req, res, next) => {
  Campaign.findByIdAndUpdate(req.params.id, req.body)
    .then(campaign => res.json(campaign))
    .catch(next);
});

campaignRouter.delete('/api/campaign/:id', (req, res, next) => {
  Campaign.findById(req.params.id)
    .then(campaign => campaign.remove())
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
});