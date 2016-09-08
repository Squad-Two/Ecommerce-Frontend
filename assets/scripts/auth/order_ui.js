'use strict';

const app = require('../app.js');


// let displayOrders = function(data) {
//   console.log(data);
//   let getOrders = require('../templates/orders.handlebars');
//     $('#previous-orders').empty().append(getOrders({
//       orders:data.orders
//     }));
//   };

  // let displayOrders = function(data) {
  //   console.log(data);
  //   let getOrders = require('../templates/orders.handlebars');
  //   let templateSource   = $("#orders-template").html(),
  //   template = Handlebars.compile(templateSource),
  //     $('#previous-orders').empty().append(getOrders({
  //       orders:data.orders
  //     }));
  //   };


const getOrderSuccess = (data) => {

  app.orders = data.orders;
  let previousOrders = "<table class = 'order-table'> <tr> <th>Date Purchased</th> <th>Print</th> <th>Price</th> <th>Quantity</th> <th>Total</th> </tr>";
    for (let i = 0; i < app.orders.length; i++) {
      //get the total for each order
      let currentTotal = app.orders[i].total;
      //get the date of each order
      let date = app.orders[i].createdAt.slice(0, 10).split('-');
      let displayDate = date[1] +'/'+ date[2] +'/'+ date[0];
          //for each item in an order
          for(let j=0; j<app.orders[i].items.length;j++) {
            //order date
            if (j === 0) {
            previousOrders = previousOrders + '<tr><td>' + displayDate + '</td>';
          }
            if (j > 0) {
              previousOrders = previousOrders + '<tr><td></td>';
            }
            //name
            previousOrders = previousOrders + '<td>' + app.orders[i].items[j].name + '</td>';
            //price
            previousOrders = previousOrders + '<td>' + app.orders[i].items[j].price + '</td>';
            //quantity
            previousOrders = previousOrders + '<td>' + app.orders[i].items[j].quantity + '</td>';
            //order total
            if (j === 0) {
            previousOrders = previousOrders + '<td>' + currentTotal + '</td></tr>';
            }
            if (j > 0) {
            previousOrders = previousOrders + '<td></td></tr>';
            }
          }
      }
  $('#previous-orders').html(previousOrders);
  $('#prev-orders').hide();
};


module.exports = {
  getOrderSuccess,
};
