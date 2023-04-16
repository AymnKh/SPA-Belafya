import { Product } from 'src/app/model/product-model';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  constructor(private productsService:ProductsService) { }
  ngOnInit(): void {
    this.getAllProducts() // call getAllProducts method
  }

  getAllProducts() {
    this.productsService.getAllProducts().subscribe({ // get all products
      next: (data) => {
        this.products = data; //assign data to products array
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  deleteProduct(id:string){
    if (confirm("delete product ?")) { // if user cnfirm
      this.productsService.deleteProduct(id).subscribe({ // delete product
        next: (data) => {
          this.getAllProducts(); // get all products after delete the product
        }, error: (err) => {
          console.log(err);
        }
      })
    }
  }
}
