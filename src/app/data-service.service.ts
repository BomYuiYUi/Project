import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    return this._http.get<{
      ProId:string;
      ProName:string;
      ProImg:string;
      ProPrice:string;
      ProDetail:string;
    }>(this.apiURL+'/products')
  }
  getProductOne(id:any){
    return this._http.get<{
      ProId:string;
      ProName:string;
      ProImg:string;
      ProPrice:string;
      ProDetail:string;
    }>(this.apiURL+'/products/'+id)
  }
}