'use strict';


const app = require('../app.js');
const stripeApi = require('./stripe_api');

const success = (data) => {
  if (data) {
  } else {
  }
};


const failure = (error) => {
  console.log(error);
};

const changePaidStatusSuccess = (response) => {
  console.log(response);
};

const createOrderSuccess = (response) => {
  app.order = response.order;
  let id = response.order._id;
  stripeApi.changePaidStatus(id).then(changePaidStatusSuccess).catch(failure);

};





module.exports = {
  success,
  failure,
  createOrderSuccess,
  changePaidStatusSuccess,
};
