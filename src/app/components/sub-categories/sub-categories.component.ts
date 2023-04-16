import { SubCategoriesService } from './../../services/subCategories.service';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/model/category-model';
import { Product } from 'src/app/model/product-model';
import { CategoriesService } from 'src/app/services/categories.service';
import * as _ from 'lodash';
import { SubCategory } from 'src/app/model/subCategory.model';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.css']
})
export class SubCategoriesComponent implements OnInit {

  subCategoriesForm!: FormGroup;
  categories: Category[] = [];
  subCategories: SubCategory[] = [];
  products: Product[] = [];
  productsId: string[] = [];
  adding: boolean = true;

  constructor(private categoriesService: CategoriesService, private productsService: ProductsService, private subCategoriesService: SubCategoriesService) { }
  ngOnInit(): void {
    this.formInit();
    this.getAllCategories(); // call getAllCategories method
    this.getAllProducts(); // call getAllProducts method
    this.getAllSubCategoris();// call getAllSubCategories Method
  }
  formInit() {
    this.subCategoriesForm = new FormGroup({ // initialize the form
      "name": new FormControl('', Validators.required),
      "name_ar": new FormControl('', Validators.required),
      "category": new FormControl('', Validators.required),
      "products": new FormControl('', Validators.required),
    });
  }
  getAllCategories() {
    this.categoriesService.getAllCategories().subscribe({ // get all categories
      next: (data) => {
        console.log(data);
        this.categories = data; // assign the data to the categories array
      },
      error: (err) => {
        alert(err) // log the error
      }
    });
  }
  getAllProducts() {
    this.productsService.getAllProducts().subscribe({ //get all products
      next: (data) => {
        this.products = data;  //assign the data to the products array
      },
      error: (err) => {
        alert(err) // log error
      }
    })
  }
  getAllSubCategoris() {
    this.subCategoriesService.getAllSubCategories().subscribe({
      next: (data) => {
        this.subCategories = data;
        console.log(data);
      },
      error: (err) => {
        alert(err.message)
      }
    })
  }
  chooseCategory(event: any) {
    const category = event.target.value;
    this.subCategoriesForm.get('category')?.setValue(category); // set the category to the form
  }
  chooseProdut(event: any) {
    this.productsId.push(event.target.value);
    _.remove(this.products, ['_id', event.target.value]); // remove the product from the products array
    const ids = this.productsId.join(','); // join the products ids to a string
    this.subCategoriesForm.get('products')?.setValue(ids); // set the products to the form
  }
  addSubCategory() {
    const subCategory = this.subCategoriesForm.value
    this.subCategoriesService.addSubCategory(subCategory).subscribe({
      next: (data) => {
        this.subCategoriesForm.reset();
        alert('added');
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  deleteCategory(id: string) { }
}
