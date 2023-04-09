import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CartResponse } from '../model/carts';
import { Router } from '@angular/router';

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

  getCarts(username: string) {
    const body = { username: username };
    return this.http.post<CartResponse>(this.URL + '/Cart', body);
  }
}
