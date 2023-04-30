
import { Component } from '@angular/core';
import { SliderService } from "../../services/slider.service";
import { Slider } from "../../model/slider-model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {
  slider: Slider[] = [];
  imageUrl!: FormControl;
  loading: boolean = false;
  loadingSpinner: boolean = false;
  constructor(private sliderService: SliderService, private alertifyService:AlertifyService) {
  }

  ngOnInit() {
    this.imageUrl = new FormControl('', Validators.required) // init from
    this.getAllSliderImages(); // get all slider images
  }
  getAllSliderImages() {
    this.sliderService.getAllSlider().subscribe({ // get all slider images
      next: (data) => {
        this.slider = data; // assign slider images to slider array
      },
      error: (err) => {
        this.alertifyService.error(err); // show error
      }
    });
  }
  deleteImage(id: string) {
    this.loadingSpinner = true; // show loading spinner
    this.sliderService.deleteSlideById(id).subscribe({ // delete slider image by id
      next: (data) => {
        this.alertifyService.success(data); // shoow success alert
        this.getAllSliderImages() // get all sliders after adding new slider
      },
      error: (err) => {
        this.alertifyService.error(err); // show error alert
      }, complete: () => {
        this.loadingSpinner = false; 
      }
    })
  }
  deleteAllSliderImages() {
    this.loadingSpinner = true; // show loading spinner
    this.sliderService.deleteAllSliderImages().subscribe({ // delete all slider images
      next: (data) => {
        this.alertifyService.success(data); // shoow success alert
        this.getAllSliderImages() // get all sliders after adding new slider
      },
      error: (err) => {
        this.alertifyService.error(err); // show error alert
      }, complete: () => {
        this.loadingSpinner = false;
      }
    })
  }
  imageUpload(event: any) {
    if (event.target.files.length > 0) { // check if file is selected
      const file = event.target.files[0]; // get file
      this.imageUrl.setValue(file); // set file to imageUrl
    }
  }
  addNewSlider(slider: FormData) {
    this.loading = true;
    this.sliderService.addNewSliderImage(slider).subscribe({ // upload image
      next: (data) => {
        this.alertifyService.success(data); // alert success
        this.getAllSliderImages() // get all sliders after adding new slider
      }, error: (err) => {
        this.loading = false; // loading to false after complete 
        this.alertifyService.error(err); // alert error 
      }, complete: () => {
        this.loading = false; // loading to false after complete 
      }
    })
  }
  upload() {
    const uploadSliderImage = new FormData(); // create new form data
    uploadSliderImage.append("imageUrl", this.imageUrl.value) // append image to form data
    this.addNewSlider(uploadSliderImage); // upload image
  }

}
