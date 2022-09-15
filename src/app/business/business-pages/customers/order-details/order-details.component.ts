import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  id: any;
  data: any;

  constructor(private activeRoute:ActivatedRoute,private service:ApiServicesService,
    private router:Router) { 
    this.activeRoute.queryParams.subscribe((params) =>{
      this.id = params?.['id'];
    })
  }

  ngOnInit(): void {
    this.orderDetails();
  }

  orderDetails(){
    let customer = {
      customerId: this.id
    }
    this.service.get(customer, API_ROUTES.customers.orderDetails).pipe().subscribe((res) => {
      console.log(res);
      this.data = res.result
    });
  }

  paymentDetail(){
    this.router.navigate(['/business/customers/payment-details'],{queryParams: {id: this.id}});
  }

}
