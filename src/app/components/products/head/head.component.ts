import { Head } from './../../../model/product-head-model';
import { Router } from '@angular/router';
import { HeadService } from './../../../services/head.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  headForm!: FormGroup;
  heads: Head[] = [];
  constructor(private headService: HeadService, private router: Router) { }
  ngOnInit(): void {
    this.formInit();  // call formInit method]
    this.getAllHeads(); // call getAllHeads method
  }
  formInit() {
    this.headForm = new FormGroup({ // create new form group
      "name": new FormControl('', Validators.required),
      "name_ar": new FormControl('', Validators.required),
    })
  }
  addHead() {
    this.headService.addHead(this.headForm.value).subscribe({
      next: (data: any) => {
        this.headForm.reset();
        this.getAllHeads(); // call getAllHeads method
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }
  getAllHeads() {
    this.headService.getAllHeads().subscribe({
      next: (data: any) => {
        this.heads = data; // assign data to heads array
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }
  deleteSize(id: string) {
    this.headService.deleteHead(id).subscribe({
      next: (data: any) => {
        this.getAllHeads(); // call getAllHeads method
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }
  deleteAll() {
    this.headService.deleteAll().subscribe({
      next: (data: any) => {
        this.getAllHeads(); // call getAllHeads method
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
