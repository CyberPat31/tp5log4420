import { Component } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';
import { Item } from './shopping-cart.service';

/**
 * Defines the main component of the application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  
  constructor(
	private shoppingCartService: ShoppingCartService) { }

  items: Item[];
  count: number;

  readonly authors = [
    'Bastien Dubourg',
    'Patrick Nadeau'
  ];

  ngOnInit() {
    this.count = 0;
    this.getCount();
  }

  getCount(): void{
    this.shoppingCartService.getItems().then(items => items.forEach(item => this.count += item.quantity));
  }
}
