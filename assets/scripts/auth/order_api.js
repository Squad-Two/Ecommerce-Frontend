'use strict';

const app = require('../app.js');


// get previous orders
const getPreviousOrders = () => {
  return $.ajax({
    url: app.api + '/owner_orders/' + app.user._id,
    method: "GET",
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
};


// delete order
const deleteOrder = function (orderIDtoDelete) {
  return $.ajax({
    url: app.api + '/orders/' + orderIDtoDelete,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  }
  );
};


module.exports = {
  getPreviousOrders,
  deleteOrder,
};
