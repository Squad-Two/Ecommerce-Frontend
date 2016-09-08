'use strict';

//cart that stores cart data from user (all front end)
let cartObj = {
  items: [],
  total: 0
};


// are there prints in cart
let inCartStatus = "";
const arr = cartObj.items;


const inCart = function (val) {
  if (this[1] === val.name) {
    val.quantity += parseInt(this[0]);
    inCartStatus = "yes";
  }
};


// total price
const calculateTotal = function (val) {
  this.push(val.price * val.quantity);
};


// update total number of prints
const updateTotal = function () {
  let itemTotal = [];
  arr.forEach(calculateTotal,itemTotal);
  cartObj.total = itemTotal.reduce((pv, cv) => pv+cv, 0);
  $('.show-cart').children('h5').text("Total: $" + cartObj.total);
};


// populate modal cart
const populateCart = function (data) {
  let cartTemplate = require ('../templates/cart.handlebars');
  $('.cart-items').html(cartTemplate(data));
};


// add items in cart
const addItems = function () {
  let cartItem = [];
  inCartStatus = "";
  //form is the form id for prints that populates within handlebars.
  let form = document.getElementById("form");
  for (let i = 1; i < 5; i++) {
       let field = form[i];
       cartItem.push(field.value);
     }
  arr.forEach(inCart,cartItem);
  if (inCartStatus !== "yes") {
    arr[arr.length] = {
          quantity: parseInt(cartItem[0]),
          name: cartItem[1],
          price: parseInt(cartItem[2]),
          id: cartItem[3]
    };
  }
  updateTotal();
  return populateCart(cartObj);
};


module.exports = {
  addItems,
  cartObj,
  updateTotal,
};
