import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../products.service';

/**
 * Defines the component responsible to manage the display of the products page.
 */
@Component({
  selector: 'products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  
  constructor(
  private productService: ProductsService) { }

  productCount: number;
  products: Product[];
  savedCriteria: string;
  savedCategory: string;

  ngOnInit() {
  this.productCount = 0;
  this.savedCriteria = 'price-asc';
  this.savedCategory = 'all';
  this.getProducts(this.savedCategory,this.savedCriteria);
  }
  
  getProducts(category: string, criteria: string): void {
    this.productService.getProducts(criteria, category)
    .then(products => {
      this.products = products;
      this.savedCategory = category;
      this.savedCriteria = criteria;
      this.productCount = products.length;})
  }
}
