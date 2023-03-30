import { environment } from './../../environments/environemnts';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Head } from '../model/product-head-model';

@Injectable({
  providedIn: 'root'
})
export class HeadService {

  headIds = new Subject<string>();
  constructor(private http: HttpClient) { }

  addHead(head: FormData): Observable<Head> {
    return this.http.post<Head>(`${environment.apiUrl}/head/add`, head);
  }

  getAllHeads(): Observable<Head[]> {
    return this.http.get<Head[]>(`${environment.apiUrl}/head/all`);
  }

  deleteHead(id: string) {
    return this.http.delete(`${environment.apiUrl}/head/${id}`);
  }

  deleteAll() {
    return this.http.delete(`${environment.apiUrl}/head/all`);
  }
}
