import { Size } from './../model/product-size-model';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environemnts';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SizesService {

  constructor(private http: HttpClient) { }

  addSize(size: FormData): Observable<Size> {
    return this.http.post<Size>(`${environment.apiUrl}/sizes/add`, size);
  }

  getAllSizes(): Observable<Size[]> {
    return this.http.get<Size[]>(`${environment.apiUrl}/sizes/all`); 
  }

  deleteSize(id: string) {
    return this.http.delete(`${environment.apiUrl}/sizes/${id}`);
  }

  deleteAll() {
    return this.http.delete(`${environment.apiUrl}/sizes/all`);
  }
}
