import { environment } from 'src/environments/environemnts';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product-model';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  addProduct(product: FormData) { 
    return this.http.post(`${ environment.apiUrl }/products/add`, product);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/products`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'accept-language': 'ar'
      }
    
    });
  }

  getProductDetails(id: string):Observable<Product> {
    return this.http.get<Product>(`${environment.apiUrl}/products/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'country': 'ksa',
        // 'accept-language': 'en'
      }

    })
  }

  deleteProduct(id: string) {
    return this.http.delete(`${environment.apiUrl}/products/${id}`);
  }
  
}
