import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { Order } from '../orders.service';

/**
* Defines the component responsible to manage the confirmation page.
*/
@Component({
  selector: 'confirmation',
  templateUrl: './confirmation.component.html'
})

export class ConfirmationComponent implements OnInit {
	// TODO: À compléter
	
	constructor(private orderService: OrdersService) { }
	 
	firstName: string;
	lastName: string;
	orderId: number;
	
	ngOnInit() {
		this.getOrder(1);
		this.firstName = "Antoine";
		this.lastName = "Béland";
		this.orderId = 1;
	}
	
	getOrder(orderId: number): void {
    this.orderService.getOrder(orderId)
    .then(order => {
      this.firstName = order.firstName;
	  this.lastName = order.lastName;
	  this.orderId = orderId;})
  }
}
