import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-field',
  templateUrl: './add-field.component.html',
  styleUrls: ['./add-field.component.scss']
})
export class AddFieldComponent implements OnInit {
  open: any;
  addCustomField: FormGroup;
  submitted: boolean = false;
  constructor(public dialogRef: MatDialogRef<AddFieldComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private fb:UntypedFormBuilder) {
      this.addCustomField = this.fb.group({
        new_field: ['', Validators.required]
      })
     }

  ngOnInit(): void {
    // this.addCustomField = this.fb.group({
    //   fieldlabel:['',Validators.required]
    // })
  }

  get f() { 
    return this.addCustomField.controls;
  }

  addfield(){
    console.log("check ",this.addCustomField.controls.new_field.value);
    
    if(this.addCustomField.valid) {
      if(this.addCustomField.controls.new_field.value!=""&&this.addCustomField.controls.new_field.value!=''&&this.addCustomField.controls.new_field.value!=null&&this.addCustomField.controls.new_field.value!=undefined){
        this.dialogRef.close({ event: 'close', data: this.addCustomField.controls.new_field.value });
      }else{
        this.dialogRef.close({ event: 'close', data: null });
      }
    }else {
      this.submitted = true;
    }
  }

}
