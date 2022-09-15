import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-email',
  templateUrl: './edit-email.component.html',
  styleUrls: ['./edit-email.component.scss']
})
export class EditEmailComponent implements OnInit {

  editForm: FormGroup;
  emailPattern = '[0-9]{10}';
  submitted: boolean = false;
  constructor(public dialogRef: MatDialogRef<EditEmailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private fb:FormBuilder) {
      this.editForm = this.fb.group({
        email: ['', Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z0-9]{2,}))$/)])]
      })
  }

  get f() {
    return this.editForm.controls;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    if(this.editForm.valid) {
      this.dialogRef.close( {result:true,data: this.editForm.value['email'] });
    }
  }

  close(){
    this.dialogRef.close( {result:false,data: this.editForm.value['email'] });
  }
}
