import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppConstant } from 'src/app/core/_constants/app.constant';
@Component({
  selector: 'app-reject',
  templateUrl: './reject.component.html',
  styleUrls: ['./reject.component.scss']
})
export class RejectComponent implements OnInit {
  open: any;
  comment:any;
  submitted = false;
  orderId:any;
  myForm: FormGroup;
  constructor(private dialog:MatDialog, 
    public dialogRef: MatDialogRef<RejectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ApiServicesService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    ) { }
  ngOnInit(): void {
    console.log("userid==============>"+JSON.stringify(this.data));
    this.orderId=this.data.data
    this.createForm();
  }
  get f() { return this.myForm.controls; }
/**createForm*/
createForm() {
  this.submitted = false;
  this.myForm = this.fb.group({
    id: this.orderId,
    rejected: [null, [Validators.required]],
  })

}
  onSubmit(post:any) {
    debugger
    this.submitted = true;
    
      if (this.myForm.valid) {
        this.service.put(post,{}, API_ROUTES.PurchaseOrder.rejectPurchaseOrder).pipe().subscribe((res => {
          if (res.success) {
            this.dialogRef.close(true);
            this.toastr.success(res.message,AppConstant.success,{ timeOut: 5000});
          }
          else{
            this.toastr.error(res.message,AppConstant.error,{ timeOut: 5000});
          }
        })
        )
      }
  }

}
