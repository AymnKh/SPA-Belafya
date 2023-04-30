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


  addNewSliderImage(image:FormData):Observable<string>{
    return this.http.post<string>(`${environment.apiUrl}/slider/add`, image)
  }

  getAllSlider():Observable<Slider[]>{
    return this.http.get<Slider[]>(`${environment.apiUrl}/slider/`)
  }

  deleteSlideById(id: string): Observable<string>{
    return this.http.delete<string>(`${environment.apiUrl}/slider/${id}`);
  }

  deleteAllSliderImages(): Observable<string>{
    return this.http.delete<string>(`${environment.apiUrl}/slider`);
  }
}
