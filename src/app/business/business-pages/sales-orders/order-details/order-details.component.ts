import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AddManufactureProductComponent } from 'src/app/shared/dialogs/add-manufacture-product/add-manufacture-product.component';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {  
  type: any;
  rejectPurchaseOrder: boolean = false;
  viewEditRequest: boolean = false;
  editDelete: boolean = false;
  readyToDispatch: boolean = false;
  dispatchedCustomerPurchaseOrder: boolean = false;
  completedCustomerPurchaseOrder: boolean = false;
  // clientDetails: [
  //   {
  //     client_name: 'American Bank',
  //     email: 'dummy@gmail.com',
  //     address: 'Lorem ipsum dolor sit amet, Alwarpet, Chennai',
  //     contact:  '+91-87453863647'
  //   }
  // ]
  // productDeliveryList = [
  //   {
  //     sr: '1',
  //     milestone: 'Bobba Puppet lamp',
  //     startDate: '12/06/2022',
  //     endDate: '24/06/2022',
  //     units: '5',
  //     unit_type: 'Items',
  //     payment_received_date: '24/06/2022',
  //     status: 'Delivered'
  //   },
  //   {
  //     sr: '2',
  //     milestone: 'Bobba Puppet lamp',
  //     startDate: '12/06/2022',
  //     endDate: '24/06/2022',
  //     units: '5',
  //     unit_type: 'Items',
  //     payment_received_date: '24/06/2022',
  //     status: 'In process'
  //   },
  // ]

  constructor(private dialog:MatDialog, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.type = params.type;
      if(this.type == 3) {
        this.rejectPurchaseOrder = true;
      }
      else if(this.type == 4) {
        this.viewEditRequest = true;

      }
      else if(this.type == 1) {
        this.editDelete = true;
      }
      else if(this.type == 2) {
        this.readyToDispatch = true;
      }
      else if(this.type == 5) {
        this.dispatchedCustomerPurchaseOrder = true;
      }
      else if(this.type == 6) {
        this.completedCustomerPurchaseOrder = true;
      }
    });
  }

  addManufacturingMilestone(){
    const dialogRef=this.dialog.open(AddManufactureProductComponent,{
      maxHeight: '100vh',
      width:'575px',
      data: {
        heading:'Add Product Manufacturing Milestones',
        title:'Please check your inbox and click in the recieved link to reset a password',
        cancelBtn: 'Cancel',
        saveBtn:'Save'
      }
    })
  }

  addDeliveryMilestone() {
    const dialogRef=this.dialog.open(AddManufactureProductComponent,{
      maxHeight: '100vh',
      width:'575px',
      data: {
        heading:'Add Product Delivery Milestones',
        title:'Please check your inbox and click in the recieved link to reset a password',
        cancelBtn: 'Cancel',
        saveBtn:'Save'
      }
    })
  }

  productDelivery() {

  }

}
