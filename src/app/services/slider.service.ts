import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as http from "http";
import {Observable} from "rxjs";
import {Slider} from "../model/slider-model";

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  constructor(private  http:HttpClient) { }


  addNewSliderImage(image:any){
    return this.http.post('http://localhost:3000/api/v1/slider/add',image)
  }

  getAllSlider():Observable<Slider[]>{
    return this.http.get<Slider[]>('http://localhost:3000/api/v1/slider/')
  }

  deleteSlideById(id:string){
    return this.http.delete(`http://localhost:3000/api/v1/slider/${id}`);
  }

  deleteAllSliderImages(){
    return this.http.delete('http://localhost:3000/api/v1/slider');
  }
}
