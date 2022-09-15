import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AddManufactureProductComponent } from 'src/app/shared/dialogs/add-manufacture-product/add-manufacture-product.component';
import { DelayComponent } from 'src/app/shared/dialogs/delay/delay.component';
import { DeleteComponent } from 'src/app/shared/dialogs/delete/delete.component';
import { ReadyDispatchComponent } from 'src/app/shared/dialogs/ready-dispatch/ready-dispatch.component';
import { RejectComponent } from 'src/app/shared/dialogs/reject/reject.component';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { AddSalesManufactureProductComponent } from 'src/app/shared/dialogs/add-sales-manufacture-product/add-sales-manufacture-product.component';
import { AddSalesDeliveryMilestoneComponent } from 'src/app/shared/dialogs/add-sales-delivery-milestone/add-sales-delivery-milestone.component';
import { ToastrService } from 'ngx-toastr';
import { RejectPurchaseOrderComponent } from 'src/app/shared/dialogs/reject-purchase-order/reject-purchase-order.component';
import { AddPurchaseManufactureMilestoneComponent } from 'src/app/shared/dialogs/add-purchase-manufacture-milestone/add-purchase-manufacture-milestone.component';
@Component({
  selector: 'app-order-detail-accept',
  templateUrl: './order-detail-accept.component.html',
  styleUrls: ['./order-detail-accept.component.scss']
})
export class OrderDetailAcceptComponent implements OnInit {
  type: number;
  IsButtonDisable = false;
  editDelete: boolean = false;
  readyToDispatch: boolean = false;
  rejectPurchaseOrder: boolean = false;
  viewEditRequest: boolean = false;
  dispatchedCustomerPurchaseOrder: boolean = false;
  completedCustomerPurchaseOrder: boolean = false;
  requestEdit: boolean = false;
  viewOrder: boolean = false;
  orderId: any;
  purchaseOrderDetailForEdit: any;
  versions: any = [];
  MediaFiles: any;
  isVersionDisable = false;
  constructor(private dialog: MatDialog, private activatedRoute: ActivatedRoute, private service: ApiServicesService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      debugger
      this.type = params.type;
      this.orderId = params.id;
      console.log(this.type);
      if (this.type == 3) {
        this.rejectPurchaseOrder = true;
        this.getPurchaseOrderDetail(this.orderId)
      }
      else if (this.type == 4) {
        this.viewEditRequest = true;
        this.getSalesOrderDetail(this.orderId)
      }
      else if (this.type == 1) {
        this.editDelete = true;
      }
      else if (this.type == 2) {
        this.readyToDispatch = true;
        this.getPurchaseOrderDetail(this.orderId)
      }
      else if (this.type == 5) {
        this.dispatchedCustomerPurchaseOrder = true;
      }
      else if (this.type == 6) {
        this.completedCustomerPurchaseOrder = true;
      }
      else if (this.type == 7) {
        this.requestEdit = true;
        this.getPurchaseOrderDetail(this.orderId)
      }
      else if (this.type == 8) {
        this.viewOrder = true;
        this.getPurchaseOrderDetail(this.orderId)
      }
    });
  }

  addProduct() {
    const dialogRef = this.dialog.open(AddManufactureProductComponent, {
      maxHeight: '100vh',
      width: '575px',
      data: {
        heading: 'Add Product Manufacturing Milestones',
        title: 'Please check your inbox and click in the recieved link to reset a password',
        cancelBtn: 'Cancel',
        saveBtn: 'Okay'
      }
    })
  }

  deleteModal() {
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
    })
  }

  delayModal() {
    const dialogRef = this.dialog.open(DelayComponent, {
      maxHeight: '100vh',
      width: '575px',
    })
  }

  readyDispatch() {
    const dialogRef = this.dialog.open(ReadyDispatchComponent, {
      maxHeight: '100vh',
      width: '575px',
      data: {
        heading: 'Select milestone',
        submit: 'Submit'
      }
    })
  }

  rejectPopup(id:any) {
    const dialogRef = this.dialog.open(RejectPurchaseOrderComponent, {
      maxHeight: '100vh',
      width: '465px',
      data: {
        heading: 'Select milestone',
        submit: 'Submit',
        OrderId:id
      }
    })
  }
  getSalesOrderDetail(d: any) {
    this.service.get({}, `${API_ROUTES.SalesOrder.SalesOrderDetail + "?salesId=" + d + "&type=sales"}`).pipe().subscribe((res) => {
      if (res.success) {
        debugger
        console.log("getSalesOrderDetail===========================================>" + JSON.stringify(res.result));
        this.purchaseOrderDetailForEdit = res.result;
        this.MediaFiles = res.result.Media;
        if (res.result.version > 1.1) {
          this.versions.push(1.1);
          for (let i = 1.1; i < res.result.version; i += .1) {
            debugger
            let data = i + 0.1;
            this.versions.push(data.toFixed(1));
            this.isVersionDisable = true;
          }
          console.log("versions" + this.versions);

        }

      } else {

      }
    }
    )
  }
  addManufacturingMilestone() {
    const dialogRef = this.dialog.open(AddSalesManufactureProductComponent, {
      maxHeight: '100vh',
      width: '575px',
      data: {
        heading: 'Add Product Manufacturing Milestones',
        title: 'Please check your inbox and click in the recieved link to reset a password',
        cancelBtn: 'Cancel',
        saveBtn: 'Save',
        data: this.purchaseOrderDetailForEdit,
        AddType: 1,
      }
    })
   
  }
  addPurchaseManufacturingMilestone() {
    const dialogRef = this.dialog.open(AddPurchaseManufactureMilestoneComponent, {
      maxHeight: '100vh',
      width: '575px',
      data: {
        heading: 'Add Product Manufacturing Milestones',
        title: 'Please check your inbox and click in the recieved link to reset a password',
        cancelBtn: 'Cancel',
        saveBtn: 'Save',
        data: this.purchaseOrderDetailForEdit,
        AddType: 1,
      }
    })
   
  }
  addDeliveryMilestone() {
    const dialogRef = this.dialog.open(AddSalesDeliveryMilestoneComponent, {
      maxHeight: '100vh',
      width: '575px',
      data: {
        heading: 'Add Product Delivery Milestones',
        title: 'Please check your inbox and click in the recieved link to reset a password',
        cancelBtn: 'Cancel',
        saveBtn: 'Save',
        data: this.purchaseOrderDetailForEdit,
        AddType: 1,
      }
    })
  }
  selectVersion(event: any, id: any) {
    debugger
    if (parseFloat(event.value) > 1.1) {
      this.service.get({}, `${API_ROUTES.PurchaseOrder.getVersionList + "?initial_id=" + id + "&version=" + parseFloat(event.value)}`).pipe().subscribe((res) => {
        if (res.success) {
          this.purchaseOrderDetailForEdit = res.result[0];
          this.MediaFiles = res.result.Media;

        } else {

        }
      }
      )
    } else {
      this.service.get({}, `${API_ROUTES.PurchaseOrder.getVersion1detail + "?initial_id=" + id}`).pipe().subscribe((res) => {
        if (res.success) {
          this.purchaseOrderDetailForEdit = res.result[0];
          this.MediaFiles = res.result.Media;

        } else {

        }
      }
      )
    }

  }
  getPurchaseOrderDetail(d: any) {
    this.service.get({}, `${API_ROUTES.SalesOrder.PurchaseOrderDetail + "?purchaseId=" + this.orderId}`).pipe().subscribe((res) => {
      if (res.success) {
        debugger
        console.log("getPurchaseOrderDetail===========================================>" + JSON.stringify(res.result));
        this.purchaseOrderDetailForEdit = res.result;
        this.MediaFiles = res.result.Media;
        if (this.purchaseOrderDetailForEdit.ProductManufacturingMilestones == null || this.purchaseOrderDetailForEdit.ProductManufacturingMilestones.length == 0) {
          this.IsButtonDisable = true;
        }
        if (res.result.version > 1.1) {
          this.versions.push(1.1);
          for (let i = 1.1; i < res.result.version; i += .1) {
            debugger
            let data = i + 0.1;
            this.versions.push(data.toFixed(1));
            this.isVersionDisable = true;
          }
          console.log("versions" + this.versions);

        }

      } else {

      }
    }
    )
  }
  RequestToedit(id: any) {
    debugger
    alert()
    return false;
    this.service.put({}, "", `${API_ROUTES.SalesOrder.requeustToEdit + "?id=" + id}`).pipe().subscribe((res) => {
      if (res.success) {

        this.toastr.success(res.message);
      } else {

      } this.toastr.error(res.message);
    }
    )
  }
  acceptOrder(id: any) {
    debugger
    this.service.put({}, "", `${API_ROUTES.SalesOrder.acceptOrder + "?id=" + id}`).pipe().subscribe((res) => {
      if (res.success) {
        this.toastr.success(res.message);
      } else {
      } this.toastr.error(res.message);
    }
    )
  }
}
