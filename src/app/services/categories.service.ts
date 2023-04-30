import { environment } from './../../environments/environemnts';
import { Category } from './../model/category-model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  addCategory(category: FormData):Observable<string> {
    return this.http.post<string>(`${environment.apiUrl}/categories/add`, category);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}/categories`);
  }
  
  deleteCategoryById(id: string): Observable<string> {
    return this.http.delete<string>(`${environment.apiUrl}/categories/${id}`);
  }

  deleteAllCategories(): Observable<string> {
    return this.http.delete<string>(`${environment.apiUrl}/categories`);
  }
}
