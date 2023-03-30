import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environemnts';
import { Cutting } from '../model/product-cutting-model';

@Injectable({
  providedIn: 'root'
})
export class CuttingService {


  cuttingIds = new Subject<string>();
  constructor(private http: HttpClient) { }

  addCutting(cutting: FormData) {
    return this.http.post(`${environment.apiUrl}/cutting/add`, cutting);
  }

  getAllCuttings(): Observable<Cutting[]> {
    return this.http.get<Cutting[]>(`${environment.apiUrl}/cutting/all`);
  }

  deleteCutting(id: string) {
    return this.http.delete(`${environment.apiUrl}/cutting/${id}`);
  }

  deleteAll() {
    return this.http.delete(`${environment.apiUrl}/cutting/all`);
  }
}
