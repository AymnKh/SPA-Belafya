import { AlertifyService } from './../../services/alertify.service';
import { Category } from './../../model/category-model';
import { CategoriesService } from './../../services/categories.service';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoryForm!: FormGroup;
  categories: Category[] = [];
  loading: boolean = false;
  loadingSpinner: boolean = false;
  constructor(private categoriesService: CategoriesService, private alertifyService:AlertifyService) { }
  ngOnInit(): void {
    this.formInit(); // initialize the form
    this.getAllCategories(); // call getAllCategories method
  }

  formInit() {
    this.categoryForm = new FormGroup({ // initialize the form
      "name": new FormControl('', Validators.required),
      "name_ar": new FormControl('', Validators.required),
      "image": new FormControl('', Validators.required),
    });
  }
  addCategory() {
    this.loading = true; //set loading to true to show loader
    const categoryFormData = new FormData();  // create a new form data
    Object.keys(this.categoryForm.controls).forEach((k => { // loop through the form controls
      categoryFormData.append(k, this.categoryForm.get(k)?.value);
    }));
    this.categoriesService.addCategory(categoryFormData).subscribe({ // send the form data to the backend
      next: (data) => {
        this.alertifyService.success(data); // alert success message
        this.getAllCategories(); // get all categories 
        this.categoryForm.reset(); //reset form
      },
      error: (err) => {
        this.alertifyService.error(err);; // alert error message
      },
      complete: () => {
        this.loading = false; // set loading to false
      }
    });
  }
  getAllCategories() {
    this.categoriesService.getAllCategories().subscribe({ // get all categories
      next: (data) => {
        this.categories = data; // assign the data to the categories array
        console.log(data);
      },
      error: (err) => {
        this.alertifyService.error(err); // alert error message
      }
    });
  }
  deleteCategory(id: string) {
    this.loadingSpinner = true; // show loading spinner
    this.categoriesService.deleteCategoryById(id).subscribe({ // delete category by id
      next: (data) => {
        this.alertifyService.success(data); // show success alert
        this.getAllCategories(); // get all categories after delete
      },
      error: (err) => {
        this.alertifyService.error(err); // alert erroe message
      }, complete: () => {
        this.loadingSpinner = false; // set loading spinner to false
      }
    })
  }
  deleteAllCategories() {
    this.loadingSpinner = true; // show loading spinner
    this.categoriesService.deleteAllCategories().subscribe({ // delete all categories
      next: (data) => {
        this.alertifyService.success(data);//alert success message
        this.getAllCategories(); // get all categories after delete
      },
      error: (err) => { // log the error
        this.alertifyService.error(err);// alert erroe message
      }, complete: () => {
        this.loadingSpinner = false ; // set loading spinner to false
      }
    })
  }
  imageUpload(event: any) {
    if (event.target.files.length > 0) { // check if the user selected an image
      const file = event.target.files[0]; // get the image
      this.categoryForm.get('image')?.setValue(file); // set the image to the form
    }
  }
}
