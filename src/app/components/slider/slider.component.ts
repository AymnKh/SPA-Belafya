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
  constructor(private sliderService: SliderService) {
  }

  ngOnInit() {
    this.imageUrl = new FormControl('', Validators.required)
    this.getAllSliderImages();
  }
  getAllSliderImages() {
    this.sliderService.getAllSlider().subscribe({
      next: (data) => {
        this.slider = data;
      },
      error: (err) => {
        alert(err)
      }
    });
  }
  deleteImage(id: string) {
    this.sliderService.deleteSlideById(id).subscribe({
      next: (data) => {
        location.reload();
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  deleteAllSliderImages() {
    this.sliderService.deleteAllSliderImages().subscribe({
      next: (data) => {
        location.reload();
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  imageUpload(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.imageUrl.setValue(file);

    }
  }
  upload() {
    const uploadSliderImage = new FormData();
    uploadSliderImage.append("imageUrl", this.imageUrl.value)
    this.sliderService.addNewSliderImage(uploadSliderImage).subscribe({
      next: (data) => {
        location.reload();
      }, error: (err) => {
        console.log(err)
      }
    })
  }

}
