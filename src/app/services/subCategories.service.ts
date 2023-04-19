import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environemnts';
import { SubCategory } from '../model/subCategory.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubCategoriesService {

constructor(private http:HttpClient) { }

  
  addSubCategory(subCategory: FormGroup) {
    return this.http.post<SubCategory>(`${environment.apiUrl}/sub-categories/add`, subCategory);
  }

  getAllSubCategories(): Observable<SubCategory[]>{
    return this.http.get<SubCategory[]>(`${environment.apiUrl}/sub-categories/all`);
  }

  deleteSubCategory(id: string) {
    return this.http.delete(`${environment.apiUrl}/sub-categories/${id}`);
  }
}
