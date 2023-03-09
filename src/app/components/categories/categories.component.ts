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
  Categories: Category[] = [];
  constructor(private categoriesService: CategoriesService) { }
  ngOnInit(): void {
    this.formInit();
    this.getAllCategories();
  }

  formInit() {
    this.categoryForm = new FormGroup({
      "name": new FormControl('', Validators.required),
      "image": new FormControl('', Validators.required),
    });
  }
  addCategory() {
    const categoryFormData = new FormData();
    Object.keys(this.categoryForm.controls).forEach((k => {
      categoryFormData.append(k, this.categoryForm.get(k)?.value);
    }));
    this.categoriesService.addCategory(categoryFormData).subscribe({
      next: (data) => {
        location.reload();
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  getAllCategories() {
    this.categoriesService.getAllCategories().subscribe({
      next: (data) => {
        this.Categories = data;
      },
      error: (err) => {
        alert(err)
      }
    });
  }

  deleteCategory(id: string) {
    this.categoriesService.deleteCategoryById(id).subscribe({
      next: (data) => {
        location.reload();      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  deleteAllCategories() {
    this.categoriesService.deleteAllCategories().subscribe({
      next: (data) => {
        location.reload();      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  imageUpload(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.categoryForm.get('image')?.setValue(file);
    }
  }


}
