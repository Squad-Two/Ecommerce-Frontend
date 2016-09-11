'use strict';

const app = require('../app');


const createOrder = (data) => {
  return new Promise((resolve, reject) => {
    return $.ajax({
      url: app.api + '/orders',
      method: "POST",
      headers: {
        Authorization: 'Token token=' + app.user.token,
      },
      data,
      success: (response) => {
        console.log(response);
        resolve(response);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};



const addStripeCharge = (data) => {
  return new Promise((resolve, reject) => {
    return $.ajax({
      url: app.api + '/charge',
      method: "POST",
      headers: {
        Authorization: 'Token token=' + app.user.token,
      },
      data,
      success: (response) => {
        resolve(response);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};


const changePaidStatus = (id) => {
  return new Promise((resolve, reject) => {
    return $.ajax({
      url: app.api + '/orders/' + id,
      method: "PATCH",
      headers: {
        Authorization: 'Token token=' + app.user.token,
      },
      data: {
        "order": {
          "paid": true
        }
      },
      success: (response) => {
        resolve(response);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};


module.exports = {
  createOrder,
  addStripeCharge,
  changePaidStatus,
};
