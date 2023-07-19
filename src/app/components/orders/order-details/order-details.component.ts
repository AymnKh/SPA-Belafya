import { OrdersService } from 'src/app/services/orders.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/model/order-model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orderId: string = '';
  order = {} as Order;

  constructor(private route: ActivatedRoute, private ordersService:OrdersService) { } 

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.orderId = params['id'];
    });
    this.ordersService.getOrderDetails(this.orderId).subscribe((res:Order) => { 
      console.log(res);
      this.order = res;
     })
  }
}
