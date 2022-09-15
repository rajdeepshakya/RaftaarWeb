import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OrderDetailsComponent } from 'src/app/business/business-pages/customers/order-details/order-details.component';
import { AppConstant } from 'src/app/core/_constants/app.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { DelayComponent } from '../delay/delay.component';
import { OrderDispatchComponent } from '../order-dispatch/order-dispatch.component';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
@Component({
  selector: 'app-ready-dispatch',
  templateUrl: './ready-dispatch.component.html',
  styleUrls: ['./ready-dispatch.component.scss']
})
export class ReadyDispatchComponent implements OnInit {
  open: any;
  orderId: any
  submitted = false;
  constructor(private dialog: MatDialog, public dialogRef: MatDialogRef<ReadyDispatchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private service: ApiServicesService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.orderId = this.data.data;
  }
  delay() {
    const dialogRef = this.dialog.open(DelayComponent, {
      maxHeight: '100vh',
      width: '421px',
      data: {
        heading: 'Ready to dispatch?',
        report: 'Delay',
        cancel: 'Yes'
      }
    })
  }

  orderDispatched() {
    const dialogRef = this.dialog.open(OrderDispatchComponent, {
      maxHeight: '100vh',
      width: '465px',
      panelClass: 'products',
      data: {
        img: 'assets/images/Completed_check.svg',
        heading: 'Your Sales Order has been dispatched',
        title: 'Please check your inbox and click in the recieved link to reset a password',
        btn: 'View delivery challan'
      }
    })
    dialogRef.afterClosed().subscribe(confirm => {
      debugger
      if (confirm !== undefined && confirm !== null && confirm) {
        this.onSubmit();
      }
    });
  }
  onSubmit() {
    debugger
    this.submitted = true;
    this.service.put({}, {}, API_ROUTES.PurchaseOrder.acceptPurchaseOrder+'?id='+this.orderId).pipe().subscribe((res => {
      if (res.success) {
        this.dialogRef.close(true);
        this.toastr.success(res.message, AppConstant.success, { timeOut: 5000 });
      }
      else {
        this.toastr.error(res.message, AppConstant.error, { timeOut: 5000 });
      }
    })
    )
  }
}
