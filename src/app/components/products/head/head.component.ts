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
  headIds: string[] = [];

  constructor(private headService: HeadService, private router: Router) { }
  ngOnInit(): void {
    this.formInit();  // call formInit method
  }
  formInit() {
    this.headForm = new FormGroup({ // create new form group
      "name": new FormControl('', Validators.required),
      "name_ar": new FormControl('', Validators.required),
    })
  }


  addHead() {
    this.headService.addHead(this.headForm.value).subscribe((res: Head) => {
      this.headIds.push(res._id);
      let ids = this.headIds.join(',');
      this.headService.headIds.next(ids);
      this.headForm.reset();
    })
  }

  goToCutting() {

    this.router.navigate(['products', 'cutting']);
  }



}
