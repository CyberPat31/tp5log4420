import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Config } from './config';

/**
 * Defines a Product.
 */
export class Product {
  productId: number;
  quantity: number;
}

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

@Injectable()
export class OrdersService {

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
   * Initializes a new instance of the OrdersService class.
   *
   * @param http                    The HTTP service to use.
   */
  constructor(private http: HttpClient) { }

  /*
   * Gets the order associated with the orderId.
   */
  getOrder(orderId: number): Promise<Order> {
    const url = `${Config.apiUrl}/orders/${orderId}`;
	const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers, withCredentials: true };
    return this.http.get(url, options)
      .toPromise()
      .then(order => order as Order)
      .catch(OrdersService.handleError);
  }

  /**
   * Adds the order to the database  
   */
  addOrder(id: number, firstName: string, lastName: string, email: string, phone: string, products: Product[]): Promise<{}> {
    const url = `${Config.apiUrl}/orders/`;
	const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers, withCredentials: true };
    return this.http.post(url, JSON.stringify({
      id: id,
      firstName: firstName,
	  lastName: lastName,
      email: email,
	  phone: phone,
      products: products
    }), options)
    .toPromise()
    .then()
    .catch(OrdersService.handleError);
  }
}