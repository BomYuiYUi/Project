import { Component,OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/data-service.service';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit{
  myProduct: any={};
  constructor(
    public actRoute : ActivatedRoute,
    public dts : DataServiceService,
  ){}
  id = this.actRoute.snapshot.params['id']
  ngOnInit(): void {
    this.dts.getProductOne(this.id).subscribe((data)=>{this.myProduct=data})
  }


}
