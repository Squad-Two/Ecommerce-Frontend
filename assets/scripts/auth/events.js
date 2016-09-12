'use strict';


const getFormFields = require(`../../../lib/get-form-fields`);

const cartStorage = require('./cart_storage');
const api = require('./api');
const ui = require('./ui');


//AUTH EVENTS
// Sign up
const onSignUp = function (event) {
  event.preventDefault();
  let data = getFormFields(this);
   api.signUp(data)
   .done(ui.onSuccess)
   .fail(ui.failure);
};


// sign up modal show and hide
const showSignUpModal = function showSignUpModal(){
  $('#sign-up-modal').modal('show');
};

const closeModalSignUp = function closeModalSignUp() {
    $('#sign-up-modal').modal('hide');
};


// sign in modal show and hide
const showSignInModal = function showSignInModal(){
  $('#sign-in-modal').modal('show');
};

const closeModalSignIn = function closeModalSignIn() {
    $('#sign-in-modal').modal('hide');
};


// sign in
const onSignIn = function (event) {
  let data = getFormFields(this);
  console.log(data);
  event.preventDefault();
  api.signIn(data)
   .done(ui.signInSuccess)
   .fail(ui.failureSignIn);
};


// Change passowrd modal show and hide
const showChangePasswordModal = function showChangePasswordModal(){
  $('#change-password-modal').modal('show');
};

const closeModalChangePassword = function closeModalChangePassword() {
    $('#change-password-modal').modal('hide');
};


// change password
const onChangePassword = function(event) {
  event.preventDefault();
  let data = getFormFields(this);
  console.log(data);
    api.changePassword(data)
    .done(ui.success)
    .fail(ui.failure);
};



// Sign out modal show and hide
const showSignOutModal = function showSignOutModal(){
  $('#sign-out-modal').modal('show');
};

const closeModalSignOut = function closeModalSignOut() {
    $('#sign-out-modal').modal('hide');
};


// sign out
const onSignOut = function (event) {
    event.preventDefault();
    api.signOut()
   .done(ui.signOutSuccess)
   .fail(ui.failure);
};
//END AUTH EVENTS



// load all prints
const onPageLoad = function () {
  api.getAllPrints()
     .done(ui.successPrints)
     .fail(ui.failure);
};


//show a single prints
const onShowPrint = function (id) {
    api.showPrint(id)
   .done(ui.successPrint)
   .fail(ui.failure);
};


// close cart modal
const closeModalCart = function closeModalCart() {
    $('#item').modal('hide');
};


// add prints to cart
const onAddToCart = function (event) {
  event.preventDefault();
  let form = document.getElementById("form");
  let targ = form[1];
    console.log(targ);
  let val = targ.value;
  if (val > 0) {
    closeModalCart();
    cartStorage.addItems();
    $('.item-added').fadeIn(500).fadeOut(1000);
    if (cartStorage.cartObj.items.length > 0) {
      $('.no-items').hide();
    }
  } else {
    $('.invalid').fadeIn(500).fadeOut(1500);
  }
};


// show cart modal
const showCartModal = function showCartModal(){
  $('#cart').modal('show');
};


// orders modal show
const showOrdersModal = function showOrdersModal(){
  $('#orders-modal').modal('show');
};


const uploadPrints = function (){
  event.preventDefault();
  let data = new FormData(this);
    $.ajax({

    url: 'https://floating-lowlands-70144.herokuapp.com/prints',
    // url: 'https://floating-lowlands-70144.herokuapp.com/prints',
    method: 'POST',
    contentType: false,
    processData: false,
    data,
  }).done(ui.uploadSuccess)
    .fail((err) => console.error(err));
};




const addHandlers = () => {

  $('#sign-up-modal-link').on('click', showSignUpModal);
  $('#sign-up').on('submit', onSignUp);
  $('#sign-up1').on('click', closeModalSignUp);


  $('#sign-in-modal-link').on('click', showSignInModal);
  $('#sign-in').on('submit', onSignIn);
  $('#sign-in1').on('click', closeModalSignIn);


  $('#change-password-modal-link').on('click', showChangePasswordModal);
  $('#change-password').on('submit', onChangePassword);
  $('#change-password1').on('click', closeModalChangePassword);


  $('#sign-out-modal-link').on('click', showSignOutModal);

$('#sign-out1').on('submit', onSignOut);


  //displays all products upon page load
  $(document).ready(onPageLoad);


  //show a single prints when the prints is clicked
  $(document).on('click', '.col-md-4', function(){
    let id = $(this).data('id');
    console.log(id);
    onShowPrint(id);
  });


  // cart
  $('.add-to-cart').on('click', onAddToCart);
  $('#cart-modal-link').on('click', function() {
    showCartModal();
  });


  // orders
  $('#orders-modal-link').on('click', showOrdersModal);

  $('#sign-out').on('submit', onSignOut);
  $('#sign-out1').on('click', closeModalSignOut);

  // aws ajax
  $('#multipart-form-data').on('submit', uploadPrints);


  // delete prints (data-id)
  $('.delete-print-btn').on('click', function (event) {
     event.preventDefault();
     let id = $(this).attr("data-print-id");
     api.deletePrint(ui.deletePrintSuccess, ui.failure, id);
   });


  //adds a prints id to the submit button
  $('#admin').on('click', '.delete-print', function(event){
    event.preventDefault();
    let id = $(event.target).attr("data-print-id");
    $(".delete-print-btn").attr("data-print-id", id);
  });


  // update prints (data-id)
  $('#update-print').on('submit', function (event) {
    event.preventDefault();
    let id = $(".update-print-btn").attr("data-print-id");
    let data = getFormFields(this);
    api.updatePrint(ui.updatePrintSuccess, ui.failure, data, id);
  });

  //adds a job id to the submit button
  $('#admin').on('click', '.update-print', function(event){
    event.preventDefault();
    let id = $(event.target).attr("data-print-id");
    $(".update-print-btn").attr("data-print-id", id);
  });


   //adds a prints id to the click button
   $(".update-print-btn").on('click', function () {
   $("#update-print-modal").hide();
   $(".modal-backdrop").hide();
   });

};


module.exports = {
  addHandlers,

};
