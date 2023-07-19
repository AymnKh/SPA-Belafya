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

  
  addSubCategory(subCategory: FormGroup):Observable<string> {
    return this.http.post<string>(`${environment.apiUrl}/sub-categories/add`, subCategory);
  }

  getAllSubCategories(): Observable<SubCategory[]>{
    return this.http.get<SubCategory[]>(`${environment.apiUrl}/sub-categories`);
  }

  deleteSubCategory(id: string): Observable<string> {
    return this.http.delete<string>(`${environment.apiUrl}/sub-categories/${id}`);
  }
  deleteAllSubCategories(): Observable<string> { 
    return this.http.delete<string>(`${environment.apiUrl}/sub-categories`);
   }
}
