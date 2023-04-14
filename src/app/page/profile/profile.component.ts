import { Component,OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { userdetail } from 'src/app/model/userdetail';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService,private router: Router) { }
  myUser: any={};
  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.getAuth(token).subscribe(
        (data)=>{this.myUser=data},
        (error) => {
          console.log(error);
          alert(error.error.message);
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
      );
    }
    else{
      this.router.navigate(['/login']);
    }
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
