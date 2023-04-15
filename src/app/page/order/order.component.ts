import { Component ,OnInit} from '@angular/core';
import { OrderService } from 'src/app/service/order.service';
import { AuthService } from 'src/app/service/auth.service';
import { userdetail } from 'src/app/model/userdetail';
import { Router } from '@angular/router';
import { OrderResponse } from 'src/app/model/order';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  myOrder: any=[];
  myUser: userdetail;
  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
    ){}
    ngOnInit():void{
      const token = localStorage.getItem('token');
    if (token) {
      this.authService.getAuth(token).subscribe({
        next:(data)=>{
          this.myUser=data
          this.orderService.getOrderUser(this.myUser.username).subscribe({
            next:(data)=>{
              this.myOrder = data;
            },
            error:(res)=>{
              console.log(res)
              alert(res.error.message);
            }
          })
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
}
