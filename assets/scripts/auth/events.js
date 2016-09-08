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



// load all monsters
const onPageLoad = function () {
  api.getAllMonsters()
     .done(ui.successMonsters)
     .fail(ui.failure);
};


//show a single monster
const onShowMonster = function (id) {
    api.showMonster(id)
   .done(ui.successMonster)
   .fail(ui.failure);
};


// close cart modal
const closeModalCart = function closeModalCart() {
    $('#item').modal('hide');
};


// add monsters to cart
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


const uploadMonster = function (){
  event.preventDefault();
  let data = new FormData(this);
    $.ajax({
    url: 'https://fathomless-everglades-52108.herokuapp.com/monsters',
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
  $('#sign-out').on('submit', onSignOut);
  $('#sign-out1').on('click', closeModalSignOut);


  $("#sign-out1").on('click', function () {
  $('#table, #create-job-modal-link').hide();
          location.reload();
});


  //displays all products upon page load
  $(document).ready(onPageLoad);


  //show a single monster when the monster is clicked
  $(document).on('click', '.col-md-4', function(){
    let id = $(this).data('id');
    console.log(id);
    onShowMonster(id);
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
  $('#multipart-form-data').on('submit', uploadMonster);


  // delete monster (data-id)
  $('.delete-monster-btn').on('click', function (event) {
     event.preventDefault();
     let id = $(this).attr("data-monster-id");
     api.deleteMonster(ui.deleteMonsterSuccess, ui.failure, id);
   });


  //adds a monster id to the submit button
  $('#admin').on('click', '.delete-monster', function(event){
    event.preventDefault();
    let id = $(event.target).attr("data-monster-id");
    $(".delete-monster-btn").attr("data-monster-id", id);
  });


  // update monster (data-id)
  $('#update-monster').on('submit', function (event) {
    event.preventDefault();
    let id = $(".update-monster-btn").attr("data-monster-id");
    let data = getFormFields(this);
    api.updateMonster(ui.updateMonsterSuccess, ui.failure, data, id);
  });

  //adds a job id to the submit button
  $('#admin').on('click', '.update-monster', function(event){
    event.preventDefault();
    let id = $(event.target).attr("data-monster-id");
    $(".update-monster-btn").attr("data-monster-id", id);
  });


   //adds a monster id to the click button
   $(".update-monster-btn").on('click', function () {
   $("#update-monster-modal").hide();
   $(".modal-backdrop").hide();
   });

};


module.exports = {
  addHandlers,

};
