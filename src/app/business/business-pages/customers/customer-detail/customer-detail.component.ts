import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  data: any;
  id:any;

  constructor(private service:ApiServicesService,private activeRoute:ActivatedRoute,private router:Router) { 
    this.activeRoute.queryParams.subscribe((params) =>{
      this.id = params?.['id'];
    })
  }

  ngOnInit(): void {
    this.customerDetail();
  }

  customerDetail(){
    let customer = {
      customerId: this.id
    }
    this.service.get(customer, API_ROUTES.customers.customerDetail).pipe().subscribe((res) => {
      console.log(res);
      if(res.success) {
        this.data = res.result
      }
      
    });
  }

  blockCustomer(id:any){
    let customer = {
      CustomerId: id
    }
    this.service.put(customer,{}, API_ROUTES.customers.blockCustomer).pipe().subscribe((res) => {
      console.log(res);
      this.router.navigate(['/business/customers/blocked-customers']);
    });
  }

  paymentDetails(){
    this.router.navigate(['/business/customers/payment-details'],{queryParams: {id: this.id}});
  }

  orderDetail(){
    this.router.navigate(['/business/customers/order-details'],{queryParams: {id: this.id}});
  }

  edit(id:any){
    this.router.navigate(['/business/customers/add-client'],{queryParams: {id:id}});

  }
}
