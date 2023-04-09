import { Component,OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/data-service.service';
import { ActivatedRoute} from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder} from '@angular/forms';
import { CartService } from 'src/app/service/cart.service';
import { userdetail } from 'src/app/model/userdetail';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent{
  addForm!: FormGroup;
  myProduct: any={};
  myUser: userdetail;
  constructor(
    public actRoute : ActivatedRoute,
    public dts : DataServiceService,
    private authService: AuthService,
    private cartService: CartService,
    private router: Router,
    private formBuilder: FormBuilder
  ){}
  id = this.actRoute.snapshot.params['id']
  ngOnInit(): void {
    this.dts.getProductOne(this.id).subscribe((data)=>{this.myProduct=data})

    this.addForm = this.formBuilder.group({
      qty: ['']
    });
  }
  onSubmit() {
    const { qty } = this.addForm.value;
    const newprice = qty * this.myProduct.ProPrice;
//check token
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.getAuth(token).subscribe(
        (data)=>{this.myUser=data},
        (error) => {
          console.log(error);
          alert(error.error);
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
      );
    }
    else{
      this.router.navigate(['/login']);
    }

    if (typeof qty !== 'number' || qty <= 0) {
      alert('Invalid quantity');
      return;
    }
    this.cartService.addProduct(this.myUser.username,this.myProduct.ProID,this.myProduct.ProImg, this.myProduct.ProName,qty,newprice).subscribe({
      next:(product)=>{
        console.log('add to carts')
      },
      error:(response)=>{
        console.log(response)
      },
      complete:()=>{
        alert('add to carts')
      }
    });
  }
}