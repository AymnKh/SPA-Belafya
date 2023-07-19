import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environemnts';
import { Observable } from 'rxjs';
import { Order } from '../model/order-model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getOrders():Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.apiUrl}/orders/`);
  }
  getOrderDetails(id:String):Observable<Order> {
    return this.http.get<Order>(`${environment.apiUrl}/orders/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        // 'Accept-Language': 'ar'
      }
    });
  }
}
