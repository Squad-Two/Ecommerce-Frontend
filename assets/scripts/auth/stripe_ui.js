'use strict';


const app = require('../app.js');


const success = (data) => {
  if (data) {
  } else {
  }
};


const failure = (error) => {
  console.log(error);
};


const createOrderSuccess = (response) => {
  app.order = response.order;
};


const changePaidStatusSuccess = (response) => {
  console.log(response);
};


module.exports = {
  success,
  failure,
  createOrderSuccess,
  changePaidStatusSuccess,
};
