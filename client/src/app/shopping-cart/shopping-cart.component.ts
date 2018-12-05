import { Component } from '@angular/core';
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

class ShoppingCartItem {
  item: Item;
  product: Product;
}

export class ShoppingCartComponent {
  // TODO: À compléter
  constructor(
    private productService: ProductsService,
    private shoppingCartService: ShoppingCartService) { }
  
    items: Item[];
    products: Product[];
    shoppingCartItems: ShoppingCartItem[];
    totalPrice: number;
  
    ngOnInit() {
      this.getItems();
      this.getProducts();
      this.shoppingCartItems = [];
      this.totalPrice = 0;
      for (let i of this.items){
        for (let p of this.products){
          if(i.productId == p.id){
            let sci = new ShoppingCartItem();
            sci.item = i;
            sci.product = p;
            this.shoppingCartItems.push(sci);
            this.totalPrice = this.totalPrice + p.price;
          }
        }
      }
    }
    
    getItems(): void {
      this.shoppingCartService.getItems()
      .then(items => {
        this.items = items;})

    }
    getProducts(): void {
      this.productService.getProducts()
      .then(products => {
        this.products = products;})

    }

    updateTotalPrice(): void {
      this.totalPrice = 0;
      for (let i of this.shoppingCartItems){
            this.totalPrice = this.totalPrice + i.product.price;
      }
    }

    emptyCart(): void {
      this.shoppingCartItems = [];
      this.totalPrice = 0;
      this.shoppingCartService.deleteAllItems();
    }

    removeItem(item: ShoppingCartItem): void {
      this.shoppingCartService.deleteItem(item.item.productId);
      var index = this.shoppingCartItems.indexOf(item);
      if (index > -1) {
        this.shoppingCartItems.splice(index, 1);
      }
      this.updateTotalPrice();
    }

    decreaseItemCount(item: ShoppingCartItem): void {
      for (let i of this.shoppingCartItems){
        if(i.item.productId == item.item.productId && i.item.quantity > 0){
          i.item.quantity = i.item.quantity - 1;
          this.shoppingCartService.updateItem(i.item.productId, i.item.quantity);
        }
      }
      this.updateTotalPrice();
    }

    increaseItemCount(item: ShoppingCartItem): void {
      for (let i of this.shoppingCartItems){
        if(i.item.productId == item.item.productId){
          i.item.quantity = i.item.quantity + 1;
          this.shoppingCartService.updateItem(i.item.productId, i.item.quantity);
        }
      }
      this.updateTotalPrice();
    }
}
