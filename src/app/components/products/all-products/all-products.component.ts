import { ProductsService } from './../../../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  constructor(private ProductsService:ProductsService) { }

  ngOnInit(): void {
    this.ProductsService.getAllProducts().subscribe(
      (data)=>{
        console.log(data);
      }
    )
  }


}
