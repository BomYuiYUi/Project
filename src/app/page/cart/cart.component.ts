import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { userdetail } from 'src/app/model/userdetail';
import { CartResponse } from 'src/app/model/carts';
import { OrderResponse } from 'src/app/model/order';
import { OrderDetailsend } from 'src/app/model/orderdetail';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  myCart: CartResponse[] = [];
  myUser: any = {};
  myOrder: OrderResponse;
  myOrderDetail: OrderDetailsend[] = [];
  sum: number = 0;
  items: number = 0;

  constructor(
    private cartServive: CartService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.myOrderDetail)
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.getAuth(token).subscribe({
        next: (user) => {
          this.myUser = user
          console.log(this.myUser)
          this.cartServive.getCarts(this.myUser.username).subscribe({
            next: (data) => {
              this.myCart = data;
              this.items = this.myCart.length
              this.sum = this.myCart.map(x => x.ProPrice).reduce((a, b) => a + b);
            },
            error: (res) => {
              console.log(res)
              alert(res.error.message);
            }
          });

        },
        error: (response) => {
          console.log(response)
          alert(response.error.message);
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
      });
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  delete(CartId: any, i: any) {
    console.log(CartId);
    if (window.confirm('Do you want to Delete?')) {
      this.cartServive.DelOneProduct(CartId).subscribe({
        next: (proce) => {
          console.log(proce)
          this.myCart.splice(i, 1);
        },
        error: (response) => {
          console.log(response)
        },
        complete: () => {
          this.items = this.myCart.length
          if (this.items === 0) {
            location.reload();
          }
          console.log(this.items)
          this.sum = this.myCart.map(x => x.ProPrice).reduce((a, b) => a + b);
          console.log(this.sum);
        }
      })
    }
  }

  checkout() {
    if (window.confirm('checkout')) {
      const tax = this.sum * 0.07;
      const ship = this.items * 50;
      const total = this.sum + tax + ship;
      this.cartServive.addOrder(this.myUser.username, this.sum, tax, ship, total, this.myUser.address).subscribe({
        next: (data) => {
          this.myOrder = data;
          for (var i = 0; i < this.items; i++) {
            const newOrderDetail: OrderDetailsend = {
              OrderId: this.myOrder.OrderId,
              ProID: this.myCart[i].ProID,
              ProImg: this.myCart[i].ProImg,
              ProName: this.myCart[i].ProName,
              ProQty: this.myCart[i].ProQty,
              ProPrice: this.myCart[i].ProPrice
            };
            this.myOrderDetail.push(newOrderDetail);
          }
          for (var i = 0; i < this.items; i++) {
            this.myOrderDetail[i].OrderId = this.myOrder.OrderId;
            this.myOrderDetail[i].ProID = this.myCart[i].ProID;
            this.myOrderDetail[i].ProImg = this.myCart[i].ProImg;
            this.myOrderDetail[i].ProName = this.myCart[i].ProName;
            this.myOrderDetail[i].ProQty = this.myCart[i].ProQty;
            this.myOrderDetail[i].ProPrice = this.myCart[i].ProPrice;
          }
          console.log(this.myOrderDetail)
        },
        error: (err) => {
          console.log(err.error.message)
          return;
        },
        complete: () => {
          this.cartServive.addOrderdetail(this.myOrderDetail).subscribe({
            next:(response)=>{
              this.cartServive.Delcart(this.myUser.username).subscribe({
                next:(data)=>{
                  alert('CheckOut Complete')
                  location.reload();
                },
                error:(err)=>{
                  console.log(err)
                }})
            },
            error:(err)=>{
              console.log(err)
            }
          })
        }
      })
    }
  }
}


