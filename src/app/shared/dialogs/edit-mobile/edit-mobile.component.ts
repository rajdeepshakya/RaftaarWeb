import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { LocalStorageProvider } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-edit-mobile',
  templateUrl: './edit-mobile.component.html',
  styleUrls: ['./edit-mobile.component.scss']
})
export class EditMobileComponent implements OnInit {
  data1: any;
  data3: any;
  resenddata: boolean = false;
  timerOn :boolean = true;
  otp: any;
  editForm: FormGroup;
  mobPattern = '[0-9]{10}';
  submitted: boolean = false;
  countnumber:any=''
  constructor(private service: ApiServicesService, private storageService: LocalStorageProvider,  public dialogRef: MatDialogRef<EditMobileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private fb:UntypedFormBuilder) {
      this.editForm = this.fb.group({
        phone: ['', Validators.compose([Validators.required, Validators.pattern(this.mobPattern)])]
      })
  }

  get f() {
    return this.editForm.controls;
  }

  ngOnInit(): void {
  }

  isNumberKey(evt: any) {
    console.log(evt)
    //var e = evt || window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }


  onSubmit() {
    this.submitted = true;
    if(this.editForm.valid) {
      this.dialogRef.close( {result:true,data: this.editForm.value['phone'] });
    }
  }

  close(){
    this.dialogRef.close( {result:false,data: this.editForm.value['phone'] });
  }

}
