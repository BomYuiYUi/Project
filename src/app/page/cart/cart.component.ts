import { Component ,OnInit} from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { userdetail } from 'src/app/model/userdetail';
import { CartResponse } from 'src/app/model/carts';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  myCart: CartResponse[];
  myUser: userdetail;
  sum: number = 0
  
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
         this.cartServive.getCarts(this.myUser.username).subscribe({
          next:(data)=>{
            this.myCart = data;
            console.log(this.myCart)
          }
         });
  
        },
        error:(response)=>{
          console.log(response)
          alert(response.error.message);
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
      });
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  delete(CartId:any, i:any) {
    console.log(CartId);
    if(window.confirm('Do you want to go ahead?')) {
    this.cartServive.DelOneProduct(CartId).subscribe({
      next:(proce)=>{
        console.log(proce)
        this.myCart.splice(i, 1);
      },
      error:(response)=>{
        console.log(response)
      },
      complete:()=>{
        this.sum = this.myCart.map(x => x.ProPrice).reduce((a,b) => a+ b);
        console.log(this.sum);
      }
    })
    }
  }
}
