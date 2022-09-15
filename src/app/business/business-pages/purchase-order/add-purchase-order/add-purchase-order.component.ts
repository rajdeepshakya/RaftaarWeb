import { Component, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { DeleteComponent } from 'src/app/shared/dialogs/delete/delete.component';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';
import { SalesFilterComponent } from 'src/app/shared/dialogs/sales-filter/sales-filter.component';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ToastrService } from 'ngx-toastr';
import { AppConstant } from 'src/app/core/_constants/app.constant';
import { RejectionReasionComponent } from 'src/app/shared/dialogs/rejection-reasion/rejection-reasion.component';
@Component({
  selector: 'app-add-purchase-order',
  templateUrl: './add-purchase-order.component.html',
  styleUrls: ['./add-purchase-order.component.scss']
})
export class AddPurchaseOrderComponent implements OnInit {
  otherPurchaseOrderList: any;
  PurchaseOrderList: any;
  dropdownShow: false;
  inputVar: any;
  selectedInedx = 0;
  rejectOrder: any = false;
  isShow = false
  currentUrl: any;
  orderRequestHeading: boolean = false;
  purchaseOrderHeading: boolean = false;
  addPurchaseOrder: any;
  editPurchaseOrder: any;
  pending: boolean = false;
  noDataFound: boolean = false;
  constructor(private dialog: MatDialog,
    private route: Router,
    private service: ApiServicesService,
    private toastr: ToastrService,
  ) { }
  showdropdown(index: any) {
    this.isShow = !this.isShow
    this.selectedInedx = index;
  }
  ngOnInit(): void {
    this.currentUrl = this.route.url;
    console.log(this.currentUrl);
    this.addPurchaseOrder = 'add-purchase-order';
    this.editPurchaseOrder = "edit-purchase-order"

    if (this.currentUrl == '/business/purchase-order-request') {
      this.orderRequestHeading = true;
      this.purchaseOrderHeading = false;
      this.getOtherPurchaseOrderList();
    }

    else if (this.currentUrl == '/business/purchase-order-request/purchaseOrder') {
      this.purchaseOrderHeading = true;
      this.orderRequestHeading = false;
      this.getPurchaseOrderList();
    }    
  }

  routeToPurchaseorder() {
    this.orderRequestHeading = false;
    this.purchaseOrderHeading = true;
    this.route.navigate(['/business/purchase-order-request/purchaseOrder']);
    console.log("hhh");

  }

  filterDialog() {
    const dialogRef = this.dialog.open(SalesFilterComponent, {
      maxHeight: '100vh',
      width: '421px',
      panelClass: 'sales-filter'
    })
  }

  // delete() {
  //   const dialogRef = this.dialog.open(DeleteComponent, {
  //     maxHeight: '100vh',
  //     width: '465px',
  //     data: {
  //       img: 'assets/images/App__icon.svg',
  //       heading: 'Hey, do you really want to delete this purchase order?',
  //       report: 'Yes, delete',
  //       cancel: 'Go back',
  //     }
  //   })
  // }

  openConfirmDialog(id: any) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      maxHeight: '100vh',
      width: '465px',
      data: {
        img: 'assets/images/App__icon.svg',
        heading: 'Hey, do you really want to delete this purchase order?',
        para: 'Lorem Ipsum is simply dummy text of the printing text of the printing.',
        report: 'Yes, delete',
        cancel: 'Go back',
      }
    });
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm !== undefined && confirm !== null && confirm)
        this.deletePurchaseOrder(id);
    });
  }
  deletePurchaseOrder(event: any) {
    this.service.delete({}, `${API_ROUTES.PurchaseOrder.deletePurchaseOrder + '?order_id=' + event}`).pipe().subscribe((res) => {
      if (res.success) {
        this.getOtherPurchaseOrderList();
        this.getPurchaseOrderList();
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

  // editDelete() {
  //   this.route.navigate(['/business/purchase-order-request/purchase-order-accept'],{queryParams: {type: 1}})
  // }

  // readyToDispatch() {
  //   this.route.navigate(['/business/purchase-order-request/purchase-order-accept'],{queryParams: {type: 2}})
  // }

  rejectCustomerPurchaseOrder(id:any) {
    this.route.navigate(['/business/purchase-order-request/purchase-order-accept'], { queryParams: { queryType: 3 , id:id} })
  }

  viewEditRequest(id:any) {
    this.route.navigate(['/business/purchase-order-request/purchase-order-accept'], { queryParams: { queryType: 4 , id:id} })
  }

  dispatchedCustomerPurchaseOrder(id:any) {
    this.route.navigate(['/business/purchase-order-request/purchase-order-accept'], { queryParams: { queryType: 5 , id:id } })
  }

  completedCustomerPurchaseOrder() {
    this.route.navigate(['/business/purchase-order-request/purchase-order-accept'], { queryParams: { queryType: 6 } })
  }
  viewOrderDetail(id:any){
    this.route.navigate(['/business/purchase-order-request/purchase-order-accept'], { queryParams: { queryType: 7,id:id } })
  }
  viewPurchaseOrderDetail(id:any){
    this.route.navigate(['/business/purchase-order-request/purchase-order-accept'], { queryParams: { queryType: 8,id:id } })
  }

  getOtherPurchaseOrderList() {
    this.service.get({}, `${API_ROUTES.PurchaseOrder.OtherOrderList + '?type=other'}`).pipe().subscribe((res) => {
      if (res.success) {
        debugger
        console.log("getOtherPurchaseOrderList========================>" + JSON.stringify(res.result));
        this.otherPurchaseOrderList = res.result;
        console.log();
        for(let i = 0;i<this.otherPurchaseOrderList.length;i++){
          let image = this.otherPurchaseOrderList[i].Media.find((element:any)=>element.media_type.toLowerCase().includes('image'))
          if(image){
            this.otherPurchaseOrderList[i].shapeImageUrl = image.url
          }
          else {
            this.otherPurchaseOrderList[i].shapeImageUrl='assets/images/placeholder-img.svg'
          }
        }
      }
      
      if(this.otherPurchaseOrderList && (this.otherPurchaseOrderList.length == 0 || this.otherPurchaseOrderList==null)){
        this.noDataFound=true
      }
    },(error)=>{
      this.noDataFound=true
    }
    )
  }

  getPurchaseOrderList() {
    this.service.get({}, `${API_ROUTES.PurchaseOrder.PurchaseOrderList + '?type=purchase'}`).pipe().subscribe((res) => {
      if (res.success) {
        debugger
        // console.log("getPurchaseOrderList========================>"+JSON.stringify(res.result));
        this.PurchaseOrderList = res.result;
        this.noDataFound = false;
        for(let i = 0;i<this.PurchaseOrderList.length;i++){
          let image = this.PurchaseOrderList[i].Media.find((element:any)=>element.media_type.toLowerCase().includes('image'))
          if(image){
            this.PurchaseOrderList[i].shapeImageUrl = image.url
          }
          else {
            this.PurchaseOrderList[i].shapeImageUrl='assets/images/placeholder-img.svg'
          }
        }
      }  
      
      if(this.PurchaseOrderList && (this.PurchaseOrderList.length == 0 || this.PurchaseOrderList==null)){
        this.noDataFound=true
      }
    },(error)=>{
      this.noDataFound=true
    }
    )
  }
  SetEditData(event: any) {
    // this.Orderdetail.emit(event);//routerLink="edit-purchase-order"
    // this.route.navigate(['/business/purchase-order-request/edit-purchase-order']);
   // console.log("SetEditData=================================>" + JSON.stringify(event));
  }

  openRejectionReasionDialog(data: any) {
   
    const dialogRef = this.dialog.open(RejectionReasionComponent, {
      maxHeight: '100vh',
      width: '465px',
      data: {
        Reasion:data!=null?data:"Data not found"
      }
    });
    // dialogRef.afterClosed().subscribe(confirm => {
    //   debugger
    //   if (confirm !== undefined && confirm !== null && confirm)
    //     this.deletePurchaseOrder(id);
    // });
  }
}
