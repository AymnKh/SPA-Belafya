import { Size } from './../model/product-size-model';
import { Observable, Subject } from 'rxjs';
import { environment } from './../../environments/environemnts';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SizesService {

  sizesId = new Subject<string>() ; // this is for the sizes component to get the sizes id 

  constructor(private http: HttpClient) { }

  addSize(size: FormData): Observable<Size>{
    return this.http.post<Size>(`${environment.apiUrl}/sizes/add`, size);
  }

  getAllSizes(): Observable<Size[]> { 
    return this.http.get<Size[]>(`${environment.apiUrl}/sizes/all`);
  }
}
