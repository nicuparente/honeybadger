'use strict';

const User = require('./model/user.js');
const Company = require('./model/company.js');
const Foundation = require('./model/foundation.js');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

function seedDB(data){
  User.remove({}, (data)=> data);
  Company.remove({}, (data)=> data);
  Foundation.remove({}, (data)=> data);

  let users = data.users
  let companies = data.companies
  let foundations = data.foundations
  

  users.map(user => User.create(user));

  
  companies.map(company => Company.create(company))
 

  
  foundations.map(foundation => Foundation.create(foundation))
  
  console.log('seed complete?')
}

module.exports = seedDB;

const userSet = [
  {
    name: 'Tom',
    contributionsTotal: 0
  },
  {
    name: 'Alexa',
    contributionsTotal: 0
  },
  {
    name: 'Bill',
    contributionsTotal: 0
  },
  {
    name: 'Becky',
    contributionsTotal: 0
  }
];

const companySet = [
  {
    name: 'Facebook',
    totalContributions: 48723
  },
  {
    name: 'YouTube',
    totalContributions: 32793
  },
  {
    name: 'Candy Crush',
    totalContributions: 13798
  },
  {
    name: 'Twitter',
    totalContributions: 25783
  },
  {
    name: 'SnapChat',
    totalContributions: 32883
  },
  {
    name: 'Tinder',
    totalContributions: 78443
  }
]

const foundationSet = [
  {
    name: "Fisher House",
    totalRaised: 75888
  },
  {
    name: "St. Judes",
    totalRaised: 85893
  },
  {
    name: "Red Cross",
    totalRaised: 34903
  },
  {
    name: "Make A Wish",
    totalRaised: 75888
  },
  {
    name: "Americares",
    totalRaised: 75888
  },
];

const data = {
  users: userSet,
  companies: companySet,
  foundations: foundationSet
}

seedDB(data);
