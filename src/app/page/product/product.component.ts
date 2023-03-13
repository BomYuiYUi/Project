import { Component,OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/data-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  myProduct: any=[];
  constructor(private dts:DataServiceService){}

  ngOnInit(): void {
    this.dts.getProduct().subscribe((data)=> {this.myProduct = data})
  }
}
