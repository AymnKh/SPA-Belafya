import { AlertifyService } from './../../services/alertify.service';
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
  selectedItems: Product[] = [];

  constructor(private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private subCategoriesService: SubCategoriesService,
    private alertifyService: AlertifyService
  ) { }
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
        console.log(err);
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
    this.subCategoriesService.getAllSubCategories().subscribe({ //get all subCategories
      next: (data) => {
        this.subCategories = data; //assign data to subCategories array
        console.log(data);
      },
      error: (err) => {
        alert(err.message) //alret error
      }
    })
  }
  chooseCategory(event: any) {
    const category = event.target.value; // get choosen category id
    this.subCategoriesForm.get('category')?.setValue(category); // set the category to the form
  }
  chooseProdut() {
    this.selectedItems.forEach(element => {
      this.productsId.push(element._id); //push every product id to productsId array
      const ids = this.productsId.join(','); // join all ids 
      this.subCategoriesForm.get('products')?.setValue(ids); // set the product to the form
    })
  }
  addSubCategory() {
    this.chooseProdut(); // call chooseProduct method
    const subCategory = this.subCategoriesForm.value //subCategory form value
    this.subCategoriesService.addSubCategory(subCategory).subscribe({ // add new subCategory
      next: (data: string) => {
        this.subCategoriesForm.reset(); // reset the form
        this.alertifyService.success(data); // alert success
        this.getAllSubCategoris(); // call getAllSubCategories method
      },
      error: (err) => {
        this.alertifyService.error(err); // alert error
      }
    })
  }
  deleteSubCategory(id: string) {
    this.subCategoriesService.deleteSubCategory(id).subscribe({ // delete subCategory
      next: (data) => {
        this.alertifyService.success(data); // alert success
        this.getAllSubCategoris(); // call the method after delete
      }, error: (err) => {
        this.alertifyService.error(err); // alert error
      }
    })
  }
  deleteAll() {
    this.subCategoriesService.deleteAllSubCategories().subscribe({ // delete all subCategories
      next: (data) => {
        this.alertifyService.success(data); // alert success
        this.getAllSubCategoris(); // call the method after delete
      }, error: (err) => {
        this.alertifyService.error(err); // alert error
      }
    })
  }
  onChange(event: any) {
    this.selectedItems = event;
  }

}
