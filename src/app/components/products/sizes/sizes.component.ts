import { Size } from './../../../model/product-size-model';
import { SizesService } from './../../../services/sizes.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sizes',
  templateUrl: './sizes.component.html',
  styleUrls: ['./sizes.component.css']
})
export class SizesComponent implements OnInit {

  sizeForm!: FormGroup;
  sizes: Size[] = [];
  constructor(private sizesService: SizesService, private router: Router) { }

  ngOnInit(): void {
    this.formInit();  // call formInit method
    this.getAllSizes(); // call getAllSizes method
  }
  formInit() {
    this.sizeForm = new FormGroup({ // create new form group
      "name": new FormControl('', Validators.required),
      "name_ar": new FormControl('', Validators.required),
      "price_uae": new FormControl('', Validators.required),
      "price_ksa": new FormControl('', Validators.required),
    })
  }
  addSize() {
    this.sizesService.addSize(this.sizeForm.value).subscribe({
      next: (data: any) => {
        this.sizeForm.reset(); // reset form
        this.getAllSizes(); // call getAllSizes method
        console.log(data);
      },
      error: (error: any) => {
        alert(error.message);
      },
    })
  }
  getAllSizes() {
    this.sizesService.getAllSizes().subscribe({
      next: (data: any) => {
        this.sizes = data; // assign data to sizes array
      },
      error: (error: any) => {
        alert(error.message);
      },
    })
  }
  deleteSize(id:string) {
    this.sizesService.deleteSize(id).subscribe({
      next: (data: any) => {
        this.getAllSizes(); // call getAllSizes method
        console.log(data);
      },
      error: (error: any) => {
        alert(error.message);
      },
    })
  }
  deleteAll() {
    this.sizesService.deleteAll().subscribe({
      next: (data: any) => {
        this.getAllSizes(); // call getAllSizes method
        console.log(data);
      },
      error: (error: any) => {
        alert(error.message);
      },
    })
  }
  back() {
    this.router.navigate(['/products']); // navigate to products page
  }

}
