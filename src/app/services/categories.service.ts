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

  addCategory(category: FormData) {
    return this.http.post(`${environment.apiUrl}/categories/add`, category);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}/categories`, {
      headers: {
        'accept-language': ''
      }
    });
  }

  deleteCategoryById(id: string) {
    return this.http.delete(`${environment.apiUrl}/categories/${id}`);
  }

  deleteAllCategories() {
    return this.http.delete(`${environment.apiUrl}/categories`);
  }
}
