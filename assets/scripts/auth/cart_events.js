'use strict';


//cart functionality that populates cart data
const cartStorage = require('./cart_storage.js');


// remove monsters from cart
const onRemoveFromCart = function (event) {
  event.preventDefault();
  let targetName = $(this).parent().parent().attr('id');
  let arr = cartStorage.cartObj.items;
  for (let i = 0; i < arr.length; i++) {
    let val = arr[i];
    if (val.name === targetName) {
      arr.splice(i, 1);
    }
  }
  $(this).parent().parent().html("");
  cartStorage.updateTotal();
  if (arr.length < 1) {
    $('.no-items').show();
  }
};


// change quantity of current cart
const onChangeQuant = function (event) {
  event.preventDefault();
  let id = $(this).parent().parent().attr('id');
  let index = cartStorage.cartObj.items
    .findIndex(val => val.name === id);
  let target = cartStorage.cartObj.items[index];
  target.quantity = $(this).val();
  cartStorage.updateTotal();
  if ($(this).val() < 1) {
    $(this).parent().parent().html("");
    $('.no-items').show();
    cartStorage.cartObj.items.splice(index, 1);
  }
  $('.quant').off('mouseleave');
};


// change quantity when you take your mouse off of quantity
const onSelectQuant = function (event) {
  event.preventDefault();
  $(this).on('mouseleave', onChangeQuant);
};


// cart related event handlers
const addCartHandlers = () => {
  $(document).on('click','.x', onRemoveFromCart);
  $(document).on('click', '.quant', onSelectQuant);
};


module.exports = {
  addCartHandlers,
};
