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
  sizezIds: string[] = [];
  constructor(private sizesService: SizesService, private router: Router) { }

  ngOnInit(): void {
    this.formInit();  // call formInit method
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
    this.sizesService.addSize(this.sizeForm.value).subscribe((res: Size) => { // call addSize method 
      this.sizezIds.push(res._id); // push size id to sizezIds array
      let ids = this.sizezIds.join(','); // join sizezIds array to string
      this.sizesService.sizesId.next(ids); // send sizezIds array to sizesId subject
      this.sizeForm.reset(); // reset form
    })
  }

  goToHead() {
    this.router.navigate(['products','head']);
  }


}
