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
    return this.http.post('http://localhost:3000/api/v1/categories/add', category);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:3000/api/v1/categories');
  }

  deleteCategoryById(id: string) {
    return this.http.delete(`http://localhost:3000/api/v1/categories/${id}`);
  }

  deleteAllCategories() {
    return this.http.delete('http://localhost:3000/api/v1/categories');
  }
}
