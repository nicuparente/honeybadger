'use strict';

const { Router } = require('express');
const jsonParser = require('body-parser').json();
const Foundation = require('../model/foundation.js');
const foundationRouter = module.exports = new Router();

foundationRouter.post('/api/foundation', jsonParser, (req, res, next) => {
  Foundation.create(req.body)
    .then(token => res.send(token))
    .catch(next);
});

foundationRouter.get('/api/foundation/:id', (req, res, next) => {
  Foundation.findById(req.params.id)
    .then(foundation => {
      res.json(foundation);
    })
    .catch(next);
});

foundationRouter.get('/api/foundation/', (req, res, next) => {
  Foundation.find({})
    .then(foundation => {
      res.json(foundation);
    })
    .catch(next);
});

foundationRouter.put('/api/foundation/:id', jsonParser, (req, res, next) => {
  Company.findByIdAndUpdate(req.params.id, req.body)
    .then(foundation => res.json(foundation))
    .catch(next);
});

foundationRouter.delete('/api/foundation/:id', (req, res, next) => {
  Company.findById(req.params.id)
    .then(foundation => foundation.remove())
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
});