import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/service/order.service';
import { ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.css']
})
export class OrderdetailComponent implements OnInit {
  myOrderDetail: any=[];
  myOrder:any={};
  constructor(
    public actRoute : ActivatedRoute,
    private orderService: OrderService,
    private router: Router
  ){}
  id = this.actRoute.snapshot.params['id']
  ngOnInit():void{
    this.orderService.getOrderDetail(this.id).subscribe({
      next:(data)=>{
        this.myOrderDetail = data;
        console.log(this.myOrderDetail)
      },
      error:(res)=>{
        alert(res.error);
      }
    })
    this.orderService.getOrder(this.id).subscribe({
      next:(data)=>{
        this.myOrder = data;
        console.log(this.myOrder)
      },
      error:(res)=>{
        alert(res.error);
      }
    })
  }
}
