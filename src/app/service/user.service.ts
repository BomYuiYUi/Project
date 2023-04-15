import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  editpassword(username: string,password:string,newpassword:string){
    const body = { username,password, newpassword};
    return this.http.post<any>(this.URL+'/editpassword',body);
  }
  editProfile(username: string,name:string,lastname:string,email:string,address:string,tel:string){
    const body = { username, name,lastname,email,address,tel};
    return this.http.post<any>(this.URL+'/edituser',body);
  }

}
