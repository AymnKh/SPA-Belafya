import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product-model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId!: string;
  product = {} as Product;
  constructor(private productsService: ProductsService , private route:ActivatedRoute) { }
  ngOnInit(): void {
    this.route.params.subscribe(param => {
      console.log(param['id']);
      this.productId = param['id']; // get product id form params
    })
    this.getProduct() // call getAllProducts method
  }

  getProduct() {
    this.productsService.getProductDetails(this.productId).subscribe({ // get product details
      next: (data) => {
        this.product = data; // assign data to product
        console.log(data);
      }, error: (err) => {
        console.log(err); // log error
      }
    })
  }

  print(form: any) {
    console.log(this.product);
  }

}
