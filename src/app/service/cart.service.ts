import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CartResponse } from '../model/carts';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderResponse } from '../model/order';
import { OrderDetailsend } from '../model/orderdetail';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient, private router: Router) { }

  URL = 'http://localhost:3000';

  addProduct(username: string, ProID: number, ProImg: string, ProName: string, ProQty: number, ProPrice: number) {
    const body = { username, ProID, ProImg, ProName, ProQty, ProPrice };
    return this.http.post<any>(this.URL + '/addCart', body);
  }

  getCarts(username: string){
    const body = { username: username };
    return this.http.post<CartResponse[]>(this.URL + '/carts', body);
  }
  DelOneProduct(CartId:any){
    return this.http.delete<any>(this.URL+'/carts/'+CartId)
  }

  addOrder(username: string,OrderPrice: number,OrderTax: number,OrderShip: number,OrderTotal: number,OrderAddress: string){
    const body = { username,OrderPrice,OrderTax,OrderShip,OrderTotal,OrderAddress };
    return this.http.post<OrderResponse>(this.URL+'/order',body)
  }
  addOrderdetail(orderdetail:OrderDetailsend[]){
    return this.http.post<any>(this.URL+'/orderdetail',orderdetail);
  }
  Delcart(username: string){
    return this.http.delete<CartResponse[]>(this.URL + '/cartsDel/'+username);
  }
}
