import { CuttingService } from './../../../services/cutting.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cutting',
  templateUrl: './cutting.component.html',
  styleUrls: ['./cutting.component.css']
})
export class CuttingComponent implements OnInit {
  cuttingForm!: FormGroup;
  cuttingIds: string[] = [];

  constructor(private cuttingService: CuttingService, private router: Router) { }
  ngOnInit(): void {
    this.formInit();  // call formInit method
  }
  formInit() {
    this.cuttingForm = new FormGroup({ // create new form group
      "name": new FormControl('', Validators.required),
      "name_ar": new FormControl('', Validators.required),
    })
  }


  addCutting() {
    this.cuttingService.addCutting(this.cuttingForm.value).subscribe((res: any) => {
      this.cuttingIds.push(res._id);
      let ids = this.cuttingIds.join(',');
      this.cuttingService.cuttingIds.next(ids);
      this.cuttingForm.reset();
    })

  }

  goToProductImageAndName() {

    this.router.navigate(['products', 'add']);
  }


}
