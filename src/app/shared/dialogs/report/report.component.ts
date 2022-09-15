import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  Reason=[
    {
      label:'Media would not load',
      value:'media would not load',
      // isSelected:false
    },
    {
      label:'Sexual content',
      value:'sexual content',
      // isSelected:false
    },
    {
      label:'Racy',
      value:'racy',
      // isSelected:false
    },
    {
      label:'Clickbait',
      value:'clickbait',
      // isSelected:false
    },
    {
      label:'Advertisement and Spam',
      value:'advertisement and spam',
      // isSelected:false
    },
    {
      label:'Disgusting and Uncomfortable',
      value:'disgusting and uncomfortable',
      // isSelected:false
    },
    {
      label:'Fake content',
      value:'fake content',
      isSelected:false
    },
    {
      label:'Violation of national laws and platforms specifications',
      value:'violation of national laws and platforms specifications',
      // isSelected:false
    },
    {
      label:'Old content',
      value:'old content',
      // isSelected:false
    },
    {
      label:'Other',
      value:'other',
      // isSelected:false
    },
  ]
  reportForm:any;
  showOther:boolean=false
  submitted: boolean = false;
  emptyReason:boolean = false;

  constructor(private router:Router, private fb:FormBuilder, public dialogRef: MatDialogRef<ReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
   this.reportSortForm()
  }

  reportSortForm(){
    this.reportForm = this.fb.group({
      Label:['',[Validators.required]],
      other:['',[Validators.required]]
    })
  }
  selectReason(event:any){
    if(event.target.value == 'other'){
      this.showOther = true; 
  }
  else{
    this.showOther = false; 

  }
  }
  get f() {
    return this.reportForm.controls;
  }

  Submit(data:any) {
    this.submitted = true;
    if(!this.showOther){
      this.reportForm.removeControl('other');
    }
    if(this.reportForm.valid) {
      if(this.showOther){
        this.dialogRef.close( {result:true,reportData:this.reportForm.value['other'] });
      }
      else {
        this.dialogRef.close( {result:true,reportData:this.reportForm.value['Label'] });
      }
      
    } else {
      this.emptyReason = true;
    }
  }

  Cancel(){
    this.dialogRef.close( {result:false });
    // this.router.navigate(['/main/home'])
  }

}
