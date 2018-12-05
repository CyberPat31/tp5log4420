import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { Product } from '../products.service';
import { Item } from '../shopping-cart.service';

/**
 * Defines the component responsible to manage the shopping cart page.
 */
@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html'
})

export class ShoppingCartComponent implements OnInit {
  constructor(
    private productService: ProductsService,
    private shoppingCartService: ShoppingCartService) { }
  
    items: Item[];
    products: Product[];
    totalPrice: number;
  
    ngOnInit() {
      this.items = [];
      this.getItems();
      this.getProducts();
      this.totalPrice = 0;
      this.updateTotalPrice();
    }
    
    getItems(): void {
      this.shoppingCartService.getItems()
      .then(items => {
        this.items = items;})
        //debugger;

    }
    getProducts(): void {
      this.productService.getProducts()
      .then(products => {
        this.products = products;})
    }

    getItemPrice(item: Item): number {
      for (let p of this.products){
        if(item.productId == p.id){
          return p.price;
        }
      }
      return 0;
    }

    getItemName(item: Item): string {
      for (let p of this.products){
        if(item.productId == p.id){
          return p.name;
        }
      }
      return "";
    }


    updateTotalPrice(): void {
      this.totalPrice = 0;
      for (let i of this.items){
        this.totalPrice = this.totalPrice + this.getItemPrice(i);
      }
    }

    emptyCart(): void {
      this.items = [];
      this.totalPrice = 0;
      this.shoppingCartService.deleteAllItems();
    }

    removeItem(item: Item): void {
      this.shoppingCartService.deleteItem(item.productId);
      var index = this.items.indexOf(item);
      if (index > -1) {
        this.items.splice(index, 1);
      }
      this.updateTotalPrice();
    }

    decreaseItemCount(item: Item): void {
      for (let i of this.items){
        if(i.productId == item.productId && i.quantity > 0){
          i.quantity = i.quantity - 1;
          this.shoppingCartService.updateItem(i.productId, i.quantity);
        }
      }
      this.updateTotalPrice();
    }

    increaseItemCount(item: Item): void {
      for (let i of this.items){
        if(i.productId == item.productId){
          i.quantity = i.quantity + 1;
          this.shoppingCartService.updateItem(i.productId, i.quantity);
        }
      }
      this.updateTotalPrice();
    }
}
