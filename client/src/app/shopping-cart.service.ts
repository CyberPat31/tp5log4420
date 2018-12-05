import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Config } from './config';

/**
 * Defines an Item.
 */
export class Item {
  productId: number;
  quantity: number;
}

@Injectable()
export class ShoppingCartService {

  /**
   * Handles the current error.
   *
   * @param error                   The error to handle.
   * @return {Promise<object>}      A promise object.
   */
  private static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.feedbackMessage || error);
  }

  /**
   * Initializes a new instance of the ShoppingCartService class.
   *
   * @param http                    The HTTP service to use.
   */
  constructor(private http: HttpClient) { }

  /**
   * Gets all the items in the shopping cart.
   *
   * @return {Promise<Item[]>}   A promise that contains the items in the shopping cart.
   */
  getItems(): Promise<Item[]> {
    const url = `${Config.apiUrl}/shopping-cart`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers, withCredentials: true };

    return this.http.get(url, options)
      .toPromise()
      .then(items => items as Item[])
      .catch(ShoppingCartService.handleError);
  }

  /**
   * Adds the item with the specified ID to the shopping cart.
   *
   * @param productId               The product ID associated with the product to add.
   * @param quantity                The quantity of product to add.
   * @returns {Promise<{}>}    
   */
  addItem(productId: number, quantity: number): Promise<{}> {
    const url = `${Config.apiUrl}/shopping-cart/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers, withCredentials: true };
    
    return this.http.post(url, JSON.stringify({
      productId: productId,
      quantity: quantity
    }), options)
    .toPromise()
    .then()
    .catch(ShoppingCartService.handleError);
  }

  /**
   * Update the item with the specified ID to the shopping cart.
   *
   * @param productId               The product ID associated with the product to update.
   * @param quantity                The quantity of product to add.
   * @returns {Promise<{}>}    
   */
  updateItem(productId: number, quantity: number): Promise<{}> {
    const url = `${Config.apiUrl}/shopping-cart/${productId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers, withCredentials: true };
    
    return this.http.put(url, JSON.stringify({
      productId: productId,
      quantity: quantity
    }), options)
    .toPromise()
    .then()
    .catch(ShoppingCartService.handleError);
  }

  deleteItem(productId: number): Promise<{}> {
    const url = `${Config.apiUrl}/shopping-cart/${productId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers, withCredentials: true };
    
    return this.http.delete(url, options)
    .toPromise()
    .then()
    .catch(ShoppingCartService.handleError);
  }

  deleteAllItems(): Promise<{}> {
    const url = `${Config.apiUrl}/shopping-cart/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers, withCredentials: true };
    
    return this.http.delete(url, options)
    .toPromise()
    .then()
    .catch(ShoppingCartService.handleError);
  }
}
