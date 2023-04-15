import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { OrderResponse } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  URL = 'http://localhost:3000';
  constructor(private http: HttpClient, private router: Router) { }
  getOrderUser(username: string){
    const body = { username: username };
    return this.http.post<any>(this.URL+'/getOrder',body);
  }
  getOrderDetail(id:any){
    return this.http.get<any>(this.URL+'/getorderdetail/'+id)
  }
  getOrder(id:any){
    return this.http.get<any>(this.URL+'/order/'+id)
  }

}
