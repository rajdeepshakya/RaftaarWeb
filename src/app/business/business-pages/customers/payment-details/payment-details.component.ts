import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit {
  data: any;
  id: any;

  constructor(private service:ApiServicesService,private activeRoute:ActivatedRoute,private router:Router) { 
    this.activeRoute.queryParams.subscribe((params) =>{
      this.id = params?.['id'];
    })
  }

  ngOnInit(): void {
    this.paymentDetails(this.id);
  }

paymentDetails(id:any){
  let customer = {
    customerId: id
  }
  this.service.get(customer, API_ROUTES.customers.paymentDetails).pipe().subscribe((res) => {
    console.log(res);
    this.data = res.result
  });
}

orderDetail(){
  this.router.navigate(['/business/customers/order-details'],{queryParams: {id: this.id}});
}
}
