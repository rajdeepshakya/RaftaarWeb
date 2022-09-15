import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { faLessThanEqual } from '@fortawesome/free-solid-svg-icons';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { AddManufactureProductComponent } from 'src/app/shared/dialogs/add-manufacture-product/add-manufacture-product.component';
import { DelayComponent } from 'src/app/shared/dialogs/delay/delay.component';
import { DeleteComponent } from 'src/app/shared/dialogs/delete/delete.component';
import { ReadyDispatchComponent } from 'src/app/shared/dialogs/ready-dispatch/ready-dispatch.component';
import { RejectComponent } from 'src/app/shared/dialogs/reject/reject.component';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
@Component({
  selector: 'app-purchase-order-accept',
  templateUrl: './purchase-order-accept.component.html',
  styleUrls: ['./purchase-order-accept.component.scss']
})
export class PurchaseOrderAcceptComponent implements OnInit {
  queryType:any;
  editDelete: boolean = false;
  orderId:any;
  readyToDispatch: boolean = false;
  rejectPurchaseOrder: boolean = false;
  viewEditRequest: boolean = false;
  purchaseOrderDetailForEdit:any;
  versions:any=[];
  isVersionDisable=false;
  MediaFiles:any;
  dispatchedCustomerPurchaseOrder: boolean = false;
  completedCustomerPurchaseOrder: boolean = false;
  constructor(private dialog:MatDialog, private activatedRoute: ActivatedRoute,private route: Router,
    private service: ApiServicesService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      debugger
      this.queryType = params.queryType;
      this.orderId=params.id;
      console.log(typeof(this.queryType));
      if(this.queryType == '3') {
        this.rejectPurchaseOrder = true;
        this.getPurchaseOrderDetail(this.orderId);
      }
      else if(this.queryType == '4') {
        this.viewEditRequest = true;
        this.getPurchaseOrderDetail(this.orderId);
      }
      else if(this.queryType == '1') {
        this.editDelete = true;
      }
      else if(this.queryType == '2') {
        this.readyToDispatch = true;
      }
      else if(this.queryType == '5') {
        this.dispatchedCustomerPurchaseOrder = true;
        this.getPurchaseOrderDetail(this.orderId);
      }
      else if(this.queryType == '6') {
        this.completedCustomerPurchaseOrder = true;
      }
      else if(this.queryType == '7') {
        //this.completedCustomerPurchaseOrder = true;
        this.getPurchaseOrderDetail(this.orderId);
      }
      else if(this.queryType == '8') {
        //this.completedCustomerPurchaseOrder = true;
        this.getPurchaseOrderDetail(this.orderId);
      }
     
    });
  }

  addProduct(){
    const dialogRef=this.dialog.open(AddManufactureProductComponent,{
      maxHeight: '100vh',
      width:'575px',
      data: {
        heading:'Add Product Manufacturing Milestones',
        title:'Please check your inbox and click in the recieved link to reset a password',
        cancelBtn: 'Cancel',
        saveBtn:'Okay'
      }
    })
  }

  deleteModal() {
    const dialogRef=this.dialog.open(DeleteComponent,{
      maxHeight: '100vh',
      width:'465px',
      data: {
        img:'assets/images/App__icon.svg',
        heading:'Hey, do you really want to delete this purchase order?',
        para:'Lorem Ipsum is simply dummy text of the printing text of the printing.',
        report:'Yes, delete',
        cancel:'Go back',
      }
    })
  }

  delayModal() {
    const dialogRef=this.dialog.open(DelayComponent, {
      maxHeight: '100vh',
      width:'575px',
    }) 
  }

  readyDispatch(event:any){
    const dialogRef=this.dialog.open(ReadyDispatchComponent,{
      maxHeight: '100vh',
      width:'575px',
      data: {
        data: event
      }
    })
  }

  rejectPopup(event:any) {
    debugger
    const dialogRef=this.dialog.open(RejectComponent,{
      maxHeight: '100vh',
      width:'465px',
      data: {
        data: event
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      debugger
      console.log('The dialog was closed', result);
     //console.log( result.data);
    });
  }
  addDeliveryMilestone() {
    const dialogRef=this.dialog.open(AddManufactureProductComponent,{
      maxHeight: '100vh',
      width:'575px',
      data: {
        heading:'Add Product Delivery Milestones',
        title:'Please check your inbox and click in the recieved link to reset a password',
        cancelBtn: 'Cancel',
        saveBtn:'Save',
        data:this.purchaseOrderDetailForEdit
      }
    })
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

  getPurchaseOrderDetail(d:any) {
    this.service.get({}, `${API_ROUTES.PurchaseOrder.PurchaseOrderDetail+"?purchaseId="+d}`).pipe().subscribe((res) => {
      if (res.success) {
        console.log("getPurchaseOrderDetail===========================================>"+JSON.stringify(res.result));
        this.purchaseOrderDetailForEdit = res.result;
        this.MediaFiles=res.result.Media;
        if (res.result.version >1.1) {
          this.versions.push(1.1);
          for (let i = 1.1; i < res.result.version; i +=.1) {
            debugger
            let data=i + 0.1;
            this.versions.push(data.toFixed(1));
            this.isVersionDisable=true;
          }
          console.log("versions"+this.versions);
         
      }
       
      } else {

      }
    }
    )
  }
  selectVersion(event:any,id:any){
    debugger
    if(parseFloat(event.value)>1.1){
      this.service.get({}, `${API_ROUTES.PurchaseOrder.getVersionList+"?initial_id="+id+"&version="+parseFloat(event.value)}`).pipe().subscribe((res) => {
        if (res.success) {
          this.purchaseOrderDetailForEdit = res.result[0];
          this.MediaFiles=res.result.Media;
         
        } else {
  
        }
      }
      )
    }else{
      this.service.get({}, `${API_ROUTES.PurchaseOrder.getVersion1detail+"?initial_id="+id}`).pipe().subscribe((res) => {
        if (res.success) {
          this.purchaseOrderDetailForEdit = res.result[0];
          this.MediaFiles=res.result.Media;
         
        } else {
  
        }
      }
      )
    }
 
  }
}