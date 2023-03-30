import { CuttingService } from './../../../services/cutting.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cutting } from 'src/app/model/product-cutting-model';

@Component({
  selector: 'app-cutting',
  templateUrl: './cutting.component.html',
  styleUrls: ['./cutting.component.css']
})
export class CuttingComponent implements OnInit {
  cuttingForm!: FormGroup;
  cuttings: Cutting[] = [];

  constructor(private cuttingService: CuttingService, private router: Router) { }
  ngOnInit(): void {
    this.formInit();  // call formInit method
    this.getAllCuttings(); // call getAllCuttings method
  }
  formInit() {
    this.cuttingForm = new FormGroup({ // create new form group
      "name": new FormControl('', Validators.required),
      "name_ar": new FormControl('', Validators.required),
    })
  }
  addCutting() {
    this.cuttingService.addCutting(this.cuttingForm.value).subscribe((res: any) => {
      this.cuttingForm.reset(); // reset form
      this.getAllCuttings(); // call getAllCuttings method
    })
  }
  getAllCuttings() { 
    this.cuttingService.getAllCuttings().subscribe({ 
      next: (data: any) => { 
        this.cuttings = data; // assign data to cuttings array
      },
      error: (error: any) => { 
        console.log(error);
       }
    })
  }
  deleteCutting(id: string) { 
    this.cuttingService.deleteCutting(id).subscribe({
      next: (data: any) => {
        this.getAllCuttings(); // call getAllCuttings method
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }
  deleteAll() {
    this.cuttingService.deleteAll().subscribe({
      next: (data: any) => {
        this.getAllCuttings(); // call getAllCuttings method
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }
  back() {
    this.router.navigate(['/products']); // navigate to products page
  }


}
