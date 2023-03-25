import { ProductsService } from './../../../services/products.service';
import { CategoriesService } from './../../../services/categories.service';
import { CuttingService } from './../../../services/cutting.service';
import { HeadService } from './../../../services/head.service';
import { SizesService } from './../../../services/sizes.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category-model';
import { Size } from 'src/app/model/product-size-model';
import * as _ from 'lodash';
import { Head } from 'src/app/model/product-head-model';
import { Cutting } from 'src/app/model/product-cutting-model';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {


  productForm!: FormGroup;
  categories: Category[] = [];
  sizes: Size[] = [];
  heads: Head[] = [];
  cuttings :Cutting[] = [];
  sizesIds: string[] = [];
  headIds: string[] = [];
  cuttingIds: string[] = [];

  constructor(private sizesService: SizesService,
    private headService: HeadService,
    private cuttingService: CuttingService,
    private categoriesService: CategoriesService,
    private productsService: ProductsService

  ) { }
  ngOnInit(): void {
    this.formInit();
    this.getCategories();
    this.getSizes();
    this.getCuttings();
    this.getHeads();
  }

  formInit() {
    this.productForm = new FormGroup({ // initialize the form
      "name": new FormControl('', Validators.required),
      "name_ar": new FormControl('', Validators.required),
      "image": new FormControl('', Validators.required),
      "category": new FormControl('', Validators.required),
      "sizes": new FormControl(Validators.required),
      "head": new FormControl('', Validators.required),
      "cutting": new FormControl('', Validators.required),
    });
  }

  getCategories() {
    this.categoriesService.getAllCategories().subscribe((res: Category[]) => {
      this.categories = res;
    })
  }

  getSizes() {
    this.sizesService.getAllSizes().subscribe((res: Size[]) => {
      this.sizes = res;
    })
  }

  getHeads() {
    this.headService.getAllHeads().subscribe((res) => {
      this.heads = res;
    })
  }

  getCuttings() {
    this.cuttingService.getAllCuttings().subscribe((res) => {
      this.cuttings = res;
    })
  }

  chooseCategory(event: any) {
    const category = event.target.value;
    this.productForm.get('category')?.setValue(category); // set the category to the form
  }

  chooseSize(event: any) {
    this.sizesIds.push(event.target.value);
    _.remove(this.sizes, ['_id', event.target.value]); // remove the size from the sizes array
    const ids = this.sizesIds.join(','); // join the sizes ids to a string
    this.productForm.get('sizes')?.setValue(ids); // set the sizes to the form
  }

  chooseHead(event: any) {
    this.headIds.push(event.target.value);
    const res = _.remove(this.heads, ['_id', event.target.value]); // remove the size from the sizes array
    const ids = this.headIds.join(','); // join the sizes ids to a string
    this.productForm.get('head')?.setValue(ids); // set the sizes to the form
  }

  chooseCutting(event: any) {
    this.cuttingIds.push(event.target.value);
    const ids = this.cuttingIds.join(',');
    console.log(ids);
    this.productForm.get('cutting')?.setValue(ids);
  }

  imageUpload(event: any) {
    if (event.target.files.length > 0) { // check if the user selected an image
      const file = event.target.files[0]; // get the image
      this.productForm.get('image')?.setValue(file); // set the image to the form
    }
  }

  addProduct() {
    const productFormData = new FormData();  // create a new form data
    Object.keys(this.productForm.controls).forEach((k => { // loop through the form controls
      productFormData.append(k, this.productForm.get(k)?.value);
    }));
    this.productsService.addProduct(productFormData).subscribe((res) => {
      console.log(res);
    })
  }


}
