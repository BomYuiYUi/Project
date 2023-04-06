import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LoginResponse } from 'src/assets/login';
import { UserResponse } from 'src/assets/userdetail';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient,private router: Router) { }
  URL = 'http://localhost:3000'
  login(username: string, password: string) {
    
    const body = { username, password };
  
    this.http.post<LoginResponse>(this.URL+'/login', body).subscribe(
      (data) => {
        localStorage.setItem('token', data.token);
        this.router.navigate(['/product']);
      },
      (error) => {
        console.log(error);
        alert(error.error);
      }
    );
  }
  getAuth(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get<{id: number;
      username: string;
      password: string;
      name: string;
      Lname: string;
      address: string;}>(this.URL+'/auth', httpOptions);
  }
}
