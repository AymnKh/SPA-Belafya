import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/model/order-model';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders:Order[] = [];
  constructor(private oerdersService: OrdersService , private router:Router) {
  }

  ngOnInit(): void { 
    this.oerdersService.getOrders().subscribe((res: Order[]) => {
      this.orders = res;
    });
  }
  
  getOrderDetails(id: string) {
    this.router.navigate(['/orders', id]);
  }

}
