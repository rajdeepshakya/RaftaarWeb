import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  constructor(private route: Router) { }

  ngOnInit(): void {
  }
status:number
num:number

  routeToBuyer(): void {
    // this.route.navigate(['/business/customers/buyer']);
  }

  routeToSeller(): void {
    // this.route.navigate(['/business/customers/seller']);
  }

  blockedCustomerList(): void {
    this.route.navigate(['/business/customers/blocked-customers'])
  }

}
