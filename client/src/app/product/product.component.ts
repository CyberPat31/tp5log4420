import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { Product } from '../products.service';
import {NgForm} from '@angular/forms';

/**
 * Defines the component responsible to manage the product page.
 */
@Component({
  selector: 'product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  /**
   * Initializes a new instance of the ProductComponent class.
   *
   * @param route                   The active route.
   */
  constructor(
  private route: ActivatedRoute,
  private productService: ProductsService) { }

  product: Product; 
  displayDialog: boolean;

  /**
   * Occurs when the component is initialized.
   */
  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    this.getProduct(productId);
    this.displayDialog = false;
  }

  getProduct(productId: string): void {
    this.productService.getProduct(Number(productId)).then(product => this.product = product);
  }

  submit= function(f: NgForm){
  this.displayDialog = true;
  setTimeout(()=> this.displayDialog = false, 5000);
  }
}
