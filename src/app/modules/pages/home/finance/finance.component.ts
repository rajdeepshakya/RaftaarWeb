import { Component, OnInit } from '@angular/core';
import { PostPublishComponent } from 'src/app/shared/dialogs/post-publish/post-publish.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { UntypedFormArray, UntypedFormBuilder, Validators } from '@angular/forms';
import { AddFieldComponent } from 'src/app/shared/dialogs/add-field/add-field.component';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss']
})
export class FinanceComponent implements OnInit {
  finaceForm: any;
  customfields: any = [];
  updateData: any;
  editFlag: boolean=false;
  submitted: boolean=false;
  editId: any;
  isdisable:boolean=true;
  term_condition: any = [{'id':true,'value':'Yes'},{'id':false,'value':'No'}];
  titlePattern = "[a-zA-Z ]+";
  gstPattern = "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$";
  panPattern = "[A-Z]{5}[0-9]{4}[A-Z]{1}";

  constructor(public dialog: MatDialog, private service: ApiServicesService, private fb: UntypedFormBuilder,
    private toastr: ToastrService,private dataService:DataService,private activeRoute:ActivatedRoute,private router:Router,
    private commonService:CommonService) { 
      this.activeRoute.queryParams.subscribe((params) =>{
        this.editId = params?.['id'];
      })
    }

  ngOnInit(): void {
    // this.editFlag = this.dataService.getDataByKey('editFlag');
    // let editId = this.dataService.getDataByKey('editId');
    if(this.editId && this.editId!= null && this.editId!=undefined && this.editId!= " "){
      this.editFlag = true;
    }
    if(this.editFlag && this.editId){
      this.createForm();
      this.requirementDetail(this.editId);
    }
    else {
      this.createForm();
    }
  }

  goBack(){
    this.commonService.goBack();
  }

  createForm() {
    this.finaceForm = this.fb.group({
      title: ['',[Validators.required, Validators.pattern(this.titlePattern)]],
      description: ['',[Validators.required]],
      // industry_id: [''],
      // category1_id: [''],
      // category2_id: [''],
      contact: ['',[Validators.required,Validators.minLength(10)]],
      gst: ['',[Validators.required, Validators.pattern(this.gstPattern)]],
      pan: ['',[Validators.required, Validators.pattern(this.panPattern)]],
      term_condition: ['',[Validators.required]],
      req_type: ['finance',[Validators.required]],
      custom_fields: new UntypedFormArray([])
    })

  }

  setCustomfields() {
    if (this.updateData.CustomFields.length > 0) {
      for (let i = 0; i < this.updateData.CustomFields.length; i++) {
        this.t.push(
          this.fb.group({
            lable: this.updateData.CustomFields[i].lable,
            content: this.updateData.CustomFields[i].content
          })
        )
      }
    }
  }

  requirementDetail(id:any) {
    let dataToPost = {
      requirement_id: id
    }
    this.service.get(dataToPost, API_ROUTES.MyRequirements.getRequirementDetail).pipe().subscribe((res => {
      console.log(res);
      if (res.success) {
        this.updateData = res.result;
        this.setData();
        this.setCustomfields();
      } else {
        // this.toastr.error(res.msg)
      }
    }))
  }

  setData() {
    this.finaceForm.patchValue({
      title: this.updateData.title,
      description: this.updateData.description,
      contact: this.updateData.contact,
      gst: this.updateData.gst,
      pan: this.updateData.pan,
      term_condition: this.updateData.term_condition,
    })
  }

  get f() { return this.finaceForm.controls; }
  get t() { return this.f.custom_fields as UntypedFormArray; }

  postPublish(form: any) {
    this.submitted=true;
    console.log(this.finaceForm.value)
    if (this.finaceForm.valid) {
      if (this.editFlag) {
        const dialogRef = this.dialog.open(EditPopupComponent, {
          maxHeight: '100vh',
          width: '465px',
          panelClass: 'yespost',
          data: {
            img: 'assets/images/Success.png',
            heading: 'Are you sure you want to save this finance?',
            report: 'Back',
            cancel: 'Yes, Save'
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
          if (result == true) {
            this.finaceForm.value.requirement_id = this.editId
            delete this.finaceForm.value['term_condition']
            this.service.put(this.finaceForm.value, {}, API_ROUTES.MyRequirements.updateRequirement).pipe().subscribe((res => {
              console.log(res);
              const dialogRef = this.dialog.open(PostPublishComponent, {
                maxHeight: '100vh',
                width: '465px',
                panelClass: 'products',
                data: {
                  img: 'assets/images/Success.png',
                  heading: 'finance Updated Successfully',
                  title: 'Please check your inbox and click in the recieved link to reset a password',
                  btn: 'Okay'
                }

              }
              );
              dialogRef.afterClosed().subscribe(result => {
                this.router.navigate(['/main/home']);
              });


            }))
          }

        })




      }
      else {
        const dialogRef = this.dialog.open(EditPopupComponent, {
          maxHeight: '100vh',
          width: '465px',
          panelClass: 'yespost',
          data: {
            img: 'assets/images/Success.png',
            heading: 'Are you sure you want to post this finance?',
            report: 'Back',
            cancel: 'Yes, Post'
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
          if (result == true) {
            this.service.post(this.finaceForm.value, API_ROUTES.MyRequirements.createRequirement, {}).pipe().subscribe((res) => {
              console.log(res);
              const dialogRef = this.dialog.open(PostPublishComponent, {
                maxHeight: '100vh',
                width: '465px',
                panelClass: 'products',
                data: {
                  img: 'assets/images/Success.png',
                  heading: 'finance Added Successfully',
                  title: 'Please check your inbox and click in the recieved link to reset a password',
                  btn: 'Okay'
                }

              }
              );
              dialogRef.afterClosed().subscribe(result => {
                this.router.navigate(['/main/home']);
              });

            });
          }

        })
      }
    }
  }
  updateForm(form: any) {
    this.service.put(form, {}, API_ROUTES.MyRequirements.updateRequirement).pipe().subscribe((res) => {
      console.log(res);
    })
  }



  addfield() {
    const dialogRef = this.dialog.open(AddFieldComponent, {
      maxHeight: '100vh',
      width: '550px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if(result.data != null) {
        this.customfields.push(result.data);
        console.log(this.customfields);
        this.t.push(
          this.fb.group({
            lable: result.data,
            content: ''
          })
        )
      }
   
    });
  }
  getCustomFieldControls() {
    return this.finaceForm.controls.custom_fields.controls;
  }
}
