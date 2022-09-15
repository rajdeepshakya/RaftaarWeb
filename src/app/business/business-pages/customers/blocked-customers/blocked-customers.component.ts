import { I } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';

@Component({
  selector: 'app-blocked-customers',
  templateUrl: './blocked-customers.component.html',
  styleUrls: ['./blocked-customers.component.scss']
})
export class BlockedCustomersComponent implements OnInit {
  data: any;
  noDataFound: boolean = false;

  constructor(private service:ApiServicesService) { }

  ngOnInit(): void {
    this.blockedCustomersList()
  }

  counter(i: number) {
    return new Array(i);
  }

  blockedCustomersList(){
    this.service.get({}, API_ROUTES.customers.blockedCustomers).pipe().subscribe((res) => {
      console.log(res);
      if(res.success) {
        this.data = res.result;
      }
      
      if(this.data && (this.data.length == 0 || this.data==null)){
        this.noDataFound = true
      }
    },(error)=>{
      this.noDataFound = true
    });
  }

  unblockCustomer(id:any){
    let customer_id ={
      CustomerId:id
    }
    this.service.put(customer_id,{}, API_ROUTES.customers.unblockCustomer).pipe().subscribe((res) => {
      console.log(res);
    });
  }

}
