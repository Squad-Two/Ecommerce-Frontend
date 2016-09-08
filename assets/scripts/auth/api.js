'use strict';

const app = require('../app');

// sign in
const signIn = (data) => $.ajax({
  url: app.api + '/sign-in',
  method: 'POST',
  data,
});


// change password
const changePassword = (data) => $.ajax({
  url: app.api + '/change-password/' + app.user._id,
  method: 'PATCH',
  data,
  headers: {
    Authorization: 'Token token=' + app.user.token,
  }
});


// sign up
const signUp = (data) => $.ajax({
    url: app.api + '/sign-up',
    method: 'POST',
    data,
   });


// sign out
const signOut = () => $.ajax({
  url: app.api + '/sign-out/' + app.user._id,
  method: 'DELETE',
  headers: {
    Authorization: 'Token token=' + app.user.token,
  }
});


// show all prints on main page
const getAllPrints = () => $.ajax({
  url: app.api + '/prints/',
  method: 'GET',
});


// show single print in modal
const showPrint = (id) => $.ajax({
  url: app.api + '/prints/' + id,
    method: 'GET',
});


// get all prints for Admin panel
const getAllPictures = (success, failure) => {
  return $.ajax({
    url: app.api + '/prints',
    method: "GET",
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  })
  .done(success)
  .fail(failure);
};


// delete prints
const deletePrint = (success, failure, id) => {
  $.ajax({
    url: app.api + '/prints/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  })
  .done(success)
  .fail(failure);
};


// update prints
const updatePrint = (success, failure, data, id) => {
  $.ajax({
    method: "PATCH",
    url: app.api + '/prints/' + id,
    data,
    headers: {
      Authorization: 'Token token='+ app.user.token,
    },
  })
  .done(success)
  .fail(failure);
};

module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut,
  getAllPrints,
  showPrint,
  getAllPictures,
  deletePrint,
  updatePrint
};
