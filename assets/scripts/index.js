'use strict';
// user require with a reference to bundle the file and use it in this file
// var example = require('./example');
// use require without a reference to ensure a file is bundled
// require('./example');
const authEvents = require('./auth/events.js');
const cartEvents = require('./auth/cart_events.js');

const stripeEvents = require('./auth/stripe_events.js');
const orderEvents = require('./auth/order_events.js');

$(  () => {
  authEvents.addHandlers();
  cartEvents.addCartHandlers();
  stripeEvents.addHandlers();
  orderEvents.addHandlers();
  $('#multipart-form-data, #admin').hide();
});
