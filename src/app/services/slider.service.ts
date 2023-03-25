import { environment } from './../../environments/environemnts';
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Slider} from "../model/slider-model";

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  constructor(private  http:HttpClient) { }


  addNewSliderImage(image:FormData){
    return this.http.post(`${environment.apiUrl}/slider/add`, image)
  }

  getAllSlider():Observable<Slider[]>{
    return this.http.get<Slider[]>(`${environment.apiUrl}/slider/`)
  }

  deleteSlideById(id:string){
    return this.http.delete(`${environment.apiUrl}/slider/${id}`);
  }

  deleteAllSliderImages(){
    return this.http.delete(`${environment.apiUrl}/slider`);
  }
}
