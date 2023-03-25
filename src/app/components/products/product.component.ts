import { ProductsService } from './../../services/products.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from './../../model/category-model';
import { CategoriesService } from './../../services/categories.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private categoriesService: CategoriesService, private productsService:ProductsService) { }
  categories: Category[] = [];
  productForm!: FormGroup;
  sizesForm!: FormGroup;
  headForm!: FormGroup;
  cuttingForm!: FormGroup;
  sizes: any[] = [];
  head: any[] = []
  cutting: any[] = []

  ngOnInit() {
    this.categoriesService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    })
    this.formInit();
  }

  formInit() {
    this.productForm = new FormGroup({
      "name": new FormControl('', Validators.required),
      "name_ar": new FormControl('', Validators.required),
      "image": new FormControl('', Validators.required),
      "category": new FormControl('', Validators.required),
      "sizes": new FormControl('', Validators.required),
      "head": new FormControl('', Validators.required),
      "cutting": new FormControl('', Validators.required),
    });

    this.sizesForm = new FormGroup({
      "name": new FormControl('', Validators.required),
      "name_ar": new FormControl('', Validators.required),
      "price_su": new FormControl('', Validators.required),
      "price_em": new FormControl('', Validators.required),
    });

    this.headForm = new FormGroup({
      "name": new FormControl('', Validators.required),
      "name_ar": new FormControl('', Validators.required),
    })

    this.cuttingForm = new FormGroup({
      "name": new FormControl('', Validators.required),
      "name_ar": new FormControl('', Validators.required),
    })
  }


  addSize() {
    this.sizes.push(this.sizesForm.value);
    this.sizesForm.reset();
    // console.log(this.sizes);
   }
  addHead() { 
    this.head.push(this.headForm.value);
    this.headForm.reset();
    // console.log(this.head);
  }
  addCutting() {
    this.cutting.push(this.cuttingForm.value);
    this.cuttingForm.reset();
    // console.log(this.cutting);
   }

  imageUpload(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.productForm.get('image')?.setValue(file);
    }
  }

  selectCategory(event: any) {
    console.log(event.target.value);
    const category = event.target.value;
    this.productForm.get('category')?.setValue(category)
    console.log(this.productForm.value);
  }

 

  addProduct() {
    this.productForm.get('sizes')?.setValue(this.sizes);
    this.productForm.get('head')?.setValue(this.head);
    this.productForm.get('cutting')?.setValue(this.cutting);
    console.log(this.productForm.value);
    const productFormData = new FormData();
    Object.keys(this.productForm.controls).forEach((k => {
      productFormData.append(k, this.productForm.get(k)?.value);
    }));
    this.productsService.addProduct(productFormData).subscribe({
      next: (data) => { 
        console.log(data);
      },
      error: (err) => { 
        console.log(err);
       }
    });

   }




}
