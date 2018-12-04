import { Component } from '@angular/core';

/**
* Defines the component responsible to manage the confirmation page.
*/
@Component({
  selector: 'confirmation',
  templateUrl: './confirmation.component.html'
})

/**
 * Defines an Order.
 */
export class Order {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  products: Product[];
}

export class ConfirmationComponent {
	// TODO: À compléter
	// Vraiment pour tester hahaha
	order: Order = {
		id: 1,
		firstName: 'Maxime',
		lastName: 'Ouellette'
	};
  
	constructor() { }
}
