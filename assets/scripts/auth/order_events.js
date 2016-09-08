'use strict';


const orderApi = require('./order_api');
const orderUi = require('./order_ui');


const onCart = function(event) {
  event.preventDefault();
};


const onPreviousOrders = (event) => {
  event.preventDefault();
  orderApi.getPreviousOrders()
  .done(orderUi.getOrderSuccess)
  .fail(orderUi.failure);
};


const addHandlers = () => {
  $('#cart-button').on('click', onCart);
  $('#orders-modal-link').on('click', onPreviousOrders);
  $('#checkout-page').hide();
};


module.exports = {
  addHandlers,
  onCart,
};
