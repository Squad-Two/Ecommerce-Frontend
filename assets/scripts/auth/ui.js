'use strict';

const app = require('../app');
const api = require('./api');


// change password
const success = (data) => {
  console.log(data);
  console.log("Password was succesfully changed!");
  $( '#change-password' ).each(function(){
    this.reset();
  });
};


// Error modal for taken email
const failure = (error) => {
  console.error(error);
$('#sign-up' ).each(function(){
this.reset();
});
};


// Error modal for wrong password
const failureSignIn = () => {
  console.log("Wrong Password!");
  $('#sign-in' ).each(function(){
  this.reset();
});
};


// Sign up
const onSuccess = function (data) {
  app.user = data.user;
console.log("Sign up was successful!");

$('#sign-up-job-modal').modal('hide');
$(".modal-backdrop").hide();

$('#sign-in-modal-link').show();
$('#sign-up-modal-link').hide();

// reset form fields
$('#sign-up' ).each(function(){
this.reset();
});
};


// handlebars for all uploads for admin page
let displayUploads = function(prints){
  let picturesListingTemplate = require('../templates/pictures.handlebars');
  $('#all-prints').empty();
  // append content from GET request using handlebars
  $('#all-prints').append(picturesListingTemplate({
    prints
  }));
};


const showPicturesSuccess = (data) => {
  app.prints = data.prints;
  displayUploads(data);
  console.log(app.prints);
};


const uploadSuccess =  (data) => {
  console.log(data);
  api.getAllPictures(showPicturesSuccess, failure);
};


// Sign in
const signInSuccess = (data) => {
  console.log(data);
  app.user = data.user;
  console.log(app.user._id);
  console.log(app.user.token);
  console.log(app.user.admin);

   if(app.user.admin === true){
       $('.jumbotron, #prints, #cart-modal-link, #sign-up-modal-link, #sign-in-modal-link, #orders-modal-link, footer, #latest').hide();
       $('#admin, #multipart-form-data, .content').show();
         api.getAllPictures(showPicturesSuccess, failure);
   }
  $('.sign-in-warn').hide();
  $('#checkout-button').show();
    $('#change-password-modal-link, #sign-out-modal-link, #cart-modal-link, #orders-modal-link').show();
};


// Sign out
const signOutSuccess = () => {
  console.log('You signed out succesfully!');
  delete app.user;
};


// show all prints on main page, handlebars
const successPrints = (prints) => {
   $('#prints').empty();
   let displayAllPrints = require('../templates/display-all-prints.handlebars');
   $('#prints').append(displayAllPrints(prints));
};


// show one print in modal, handlebars
const successPrint = (print) => {
  let onePrint = require('../templates/print.handlebars');
  $('#item').modal('show');
  $('#item-add').empty().append(onePrint(print));
};


// delete
const deletePrintSuccess = (data) => {
  console.log(data);
  displayUploads();
  // fire ajax if delete was successful and delete if on the front end
  api.getAllPictures(showPicturesSuccess, failure);
};


// update
const updatePrintSuccess = (data) => {
  console.log(data);
  console.log("Art was updated!");
  // fire ajax if update was successful and show jobs on the front end
  api.getAllPictures(showPicturesSuccess, failure);
};


module.exports = {
  failure,
  success,
  signInSuccess,
  signOutSuccess,
  onSuccess,
  successPrint,
  app,
  failureSignIn,
  successPrints,
  uploadSuccess,
  showPicturesSuccess,
  deletePrintSuccess,
  updatePrintSuccess
};
