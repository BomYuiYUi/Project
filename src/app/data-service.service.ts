import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { product } from './model/product.model';

const HttpOptions ={
headers: new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  apiURL = 'http://localhost:3000'
  constructor(public _http:HttpClient) {}

  getProduct(){
    return this._http.get<product>(this.apiURL+'/products')
  }
  getProductOne(id:any){
    return this._http.get<product>(this.apiURL+'/products/'+id)
  }
}