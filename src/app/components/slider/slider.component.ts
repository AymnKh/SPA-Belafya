import { Component } from '@angular/core';
import { SliderService } from "../../services/slider.service";
import { Slider } from "../../model/slider-model";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {
  slider: Slider[] = [];
  imageUrl!: FormControl;
  loading: boolean = false;
  constructor(private sliderService: SliderService) {
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
        alert(err.message) // show error
      }
    });
  }
  deleteImage(id: string) {
    this.sliderService.deleteSlideById(id).subscribe({ // delete slider image by id
      next: (data) => {
        location.reload(); // reload page
      },
      error: (err) => {
        console.log(err) // show error
      }
    })
  }
  deleteAllSliderImages() {
    this.sliderService.deleteAllSliderImages().subscribe({ // delete all slider images
      next: (data) => {
        location.reload();  // reload page
      },
      error: (err) => {
        console.log(err) // show error
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
       this.getAllSliderImages() // get all sliders after adding new slider
      }, error: (err) => {
        console.log(err) // show error
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
