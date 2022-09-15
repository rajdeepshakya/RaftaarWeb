import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';
import { FilterProductComponent } from 'src/app/shared/dialogs/filter-product/filter-product.component';
import { SalesFilterComponent } from 'src/app/shared/dialogs/sales-filter/sales-filter.component';
import { ToastrService } from 'ngx-toastr';
import { AppConstant } from 'src/app/core/_constants/app.constant';
@Component({
  selector: 'app-sales-order',
  templateUrl: './sales-order.component.html',
  styleUrls: ['./sales-order.component.scss']
})
export class SalesOrderComponent implements OnInit {
  otherSalesOrderList: any;
  salesOrderList: any;
  companyId: any;
  companyDetail: any;
  isShow = false;
  selectedInedx = 0;
  IsDataFoundShow = false;
  IsDataFoundShow1 = false;
  currentUrl: any;
  salesOrder: boolean = false;
  purchaseorder: boolean = false;
  addSalesOrder: string;
  editSalesOrder: string;
  noDataFound: boolean = false;
  dataUser: any;
  constructor(
    private dialog: MatDialog,
    private route: Router,
    private service: ApiServicesService,
    private toastr: ToastrService,
  ) { }
  // showdropdown(index:any){
  //   // this.isShow=!this.isShow
  //   for(let i=0;i<this.cards.length;i++){
  //     if(index == i){
  //       this.cards[i].dropdownShow = !this.cards[i].dropdownShow
  //     } else {
  //       this.cards[i].dropdownShow = false
  //     }
  //   }

  //   for(let i=0;i<this.customerPurchaseOrder.length;i++){
  //     if(index == i){
  //       this.customerPurchaseOrder[i].dropdownShow = !this.customerPurchaseOrder[i].dropdownShow
  //     } else {
  //       this.customerPurchaseOrder[i].dropdownShow = false
  //     }
  //   }
  // }
  ngOnInit(): void {
    debugger
    var data = sessionStorage.getItem('currentUser');
    this.companyDetail = data;
    var finalData = JSON.parse(this.companyDetail);
    this.dataUser = finalData.result;
    this.companyId = this.dataUser.CompanyInfo.id;
    this.addSalesOrder = 'add-new-sales-order';
    this.editSalesOrder = "edit-sales-order"
    this.currentUrl = this.route.url;
    console.log(this.currentUrl);

    if (this.currentUrl == '/business/salesorder') {
      this.salesOrder = true;
      this.purchaseorder = false;
    }

    else if (this.currentUrl == '/business/salesorder/purchase-order') {
      this.purchaseorder = true;
      this.salesOrder = false;
    }

    this.getpurchaseOrderList();
    this.getSalesOrderList();
  }
  filterDialog() {
    const dialogRef = this.dialog.open(SalesFilterComponent, {
      maxHeight: '100vh',
      width: '421px',
      panelClass: 'sales-filter'
    })
  }

  openConfirmDialog(id: any) {
    const dialogRef = this.dialog.open(EditPopupComponent, {
      maxHeight: '100vh',
      width: '465px',
      data: {
        img: 'assets/images/App__icon.svg',
        heading: 'Hey, do you really want to delete this sales order?',
        para: 'Lorem Ipsum is simply dummy text of the printing text of the printing. ',
        report: 'Yes, delete',
        cancel: 'Go back'
      }
    });
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm !== undefined && confirm !== null && confirm)
        this.deleteSalesOrder(id);
    });
  }
  showdropdown(index: any) {
    this.isShow = !this.isShow
    this.selectedInedx = index;
  }
  routeCustomerPurchaseOrder() {
    this.route.navigate(['/business/salesorder/purchase-order'])
  }

  rejectCustomerPurchaseOrder(id:any) {
    this.route.navigate(['/business/salesorder/order-detail-accept'], { queryParams: { type: 3,id:id } })
  }

  viewEditRequest(id:any) {
    this.route.navigate(['/business/salesorder/order-detail-accept'], { queryParams: { type: 4,id:id } })
  }

  dispatchedCustomerPurchaseOrder() {
    this.route.navigate(['/business/salesorder/order-detail-accept'], { queryParams: { type: 5 } })
  }

  completedCustomerPurchaseOrder() {
    this.route.navigate(['/business/salesorder/order-detail-accept'], { queryParams: { type: 6 } })
  }

  routeToRequestEdit(id:any) {
    this.route.navigate(['/business/salesorder/order-detail-accept'], { queryParams: { type: 7,id:id } })
  }

  routeToReadyToDispatch(id:any) {
    this.route.navigate(['/business/salesorder/order-detail-accept'], { queryParams: { type: 2 ,id:id} })
  }

  routeToAccept(id:any) {
    this.route.navigate(['/business/salesorder/order-detail-accept'], { queryParams: { type: 8,id:id } })
  }
 
  getpurchaseOrderList() {
    this.service.get({}, `${API_ROUTES.SalesOrder.customerPurchaseList + "?type=purchase&company_id=" + this.companyId}`).pipe().subscribe((res) => {
      if (res.success) {
        debugger
        console.log("getpurchaseOrderList========================>"+JSON.stringify( res.result));
        this.otherSalesOrderList = res.result;
        if (res.result.length == 0) {
          this.IsDataFoundShow = true;
        }
      } else {

      }
    }
    )
  }
  getSalesOrderList() {
    this.service.get({}, `${API_ROUTES.SalesOrder.SalesOrderList + '?type=sales'}`).pipe().subscribe((res) => {
      if (res.success) {
        debugger
       // console.log("getSalesOrderList========================>" + JSON.stringify(res.result));
        this.salesOrderList = res.result;
        if (res.result.length == 0) {
          this.IsDataFoundShow1 = true;
        }
      } else {

      }
    }
    )
  }
  deleteSalesOrder(event: any) {
    this.service.delete({}, `${API_ROUTES.SalesOrder.delete + '?order_id=' + event}`).pipe().subscribe((res) => {
      if (res.success) {
        this.getSalesOrderList();
        this.getpurchaseOrderList();
        this.toastr.success(res.message);
        this.noDataFound = false;
      } else {
        this.toastr.error(res.message);
      }
    }, (err: any) => {
      if (err.error instanceof Error) {
        this.toastr.success(AppConstant.errorOccured);
      } else {

      }
    }
    )
  }
  deletePurchaseOrder(event: any) {
    this.service.delete({}, `${API_ROUTES.SalesOrder.deletePurchaseOrder + '?order_id=' + event}`).pipe().subscribe((res) => {
      if (res.success) {
        this.getSalesOrderList();
        this.getpurchaseOrderList();
        this.toastr.success(res.message);
        this.noDataFound = false;
      } else {
        this.toastr.error(res.message);
      }
    }, (err: any) => {
      if (err.error instanceof Error) {
        this.toastr.success(AppConstant.errorOccured);
      } else {

      }
    }
    )
  }
  openConfirmDialogDeletePurchase(id: any) {
    const dialogRef = this.dialog.open(EditPopupComponent, {
      maxHeight: '100vh',
      width: '465px',
      data: {
        img: 'assets/images/App__icon.svg',
        heading: 'Hey, do you really want to delete this sales order?',
        para: 'Lorem Ipsum is simply dummy text of the printing text of the printing. ',
        report: 'Yes, delete',
        cancel: 'Go back'
      }
    });
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm !== undefined && confirm !== null && confirm)
        this.deletePurchaseOrder(id);
    });
  }
}
