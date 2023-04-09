import { Component ,OnInit} from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { userdetail } from 'src/app/model/userdetail';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  myCart: any=[];
  myUser: userdetail;
  
  constructor(
    private cartServive:CartService,
    private authService: AuthService,
    private router: Router
    ){}

  ngOnInit(): void {

    const token = localStorage.getItem('token');
    if (token) {
      this.authService.getAuth(token).subscribe({
        next:(user)=>{
         this.myUser = user
         this.cartServive.getCarts(this.myUser.username).subscribe((data)=> {this.myCart = data})
        },
        error:(response)=>{
          alert(response.error);
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
      });
    }
    else{
      this.router.navigate(['/login']);
    }
  }

}
