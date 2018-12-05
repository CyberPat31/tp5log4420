import { Component, OnInit, Input } from '@angular/core';
import { OrdersService } from '../orders.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { Order } from '../orders.service';
declare const $: any;

/**
 * Defines the component responsible to manage the order page.
 */
@Component({
  selector: 'order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  orderForm: any;
  order: Order;

  constructor(private orderService: OrdersService,
    private shoppingCartService: ShoppingCartService) { }
  
  

  /**
   * Occurs when the component is initialized.
   */
  ngOnInit() {
    // Initializes the validation of the form. This is the ONLY place where jQuery usage is allowed.
    this.order = new Order();
    this.orderForm = $('#order-form');
    $.validator.addMethod('ccexp', function(value) {
      if (!value) {
        return false;
      }
      const regEx = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[1-9][0-9])$/g;
      return regEx.test(value);
    }, 'La date d\'expiration de votre carte de crédit est invalide.');
    this.orderForm.validate({
      rules: {
        'phone': {
          required: true,
          phoneUS: true
        },
        'credit-card': {
          required: true,
          creditcard: true
        },
        'credit-card-expiry': {
          ccexp: true
        }
      }
    });
    //var cartItems = [];
    this.shoppingCartService.getItems()
    .then(items => {
      this.order.products = items;});
    //this.order.products = cartItems;
    //debugger;
  }

  /**
   * Submits the order form.
   */
  submit() {
    //debugger;
    if (!this.orderForm.valid()) {
      return;
    }

    // TODO: Compléter la soumission des informations lorsque le formulaire soumis est valide.
  	this.orderService.addOrder(1, this.order.firstName, this.order.lastName, this.order.email, this.order.phone, this.order.products);
    /*.then(order => {
      this.firstName = order.firstName;
	  this.lastName = order.lastName;
	  this.orderId = orderId;})*/
  }
}
