import { environment } from 'src/environments/environemnts';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  addProduct(product: FormData) { 
    return this.http.post(`${ environment.apiUrl }/products/add`, product);
  }

  getAllProducts(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/products/all`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'country': 'ksa',
        'accept-language': 'ar'
      }
    
    });
  }
  
}
