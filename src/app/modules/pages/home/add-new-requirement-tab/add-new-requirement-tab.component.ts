import { Component, OnInit } from '@angular/core';
import { FormArray, UntypedFormBuilder, FormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Location} from '@angular/common';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-add-new-requirement-tab',
  templateUrl: './add-new-requirement-tab.component.html',
  styleUrls: ['./add-new-requirement-tab.component.scss']
})
export class AddNewRequirementTabComponent implements OnInit {
  //items:any = ["Manufacturing Order Requirement","HR Requirement","Machine","Raw Material","Finance","Other"]
  isChecked=false;
  public items: any[];
  selectedName="";
  form: UntypedFormGroup;

  constructor(private toastr: ToastrService,private fb: UntypedFormBuilder,private router:Router,private location:Location,
    private commonService:CommonService) {
    this.items= [
      { Id:1, value: 'Manufacturing Order Requirement' , isSelected: false},
      { Id: 2, value: 'HR Requirement' , isSelected: false},
      { Id: 3, value: 'Machine' , isSelected: false},
      { Id: 4, value: 'Raw Material', isSelected: false },
      { Id: 5, value: 'Finance' , isSelected: false},
      { Id:6, value: 'Other' , isSelected: false}
    ];
   }


  ngOnInit(): void {
  }

  goBack(){
    this.commonService.goBack();
  }


  onCheckboxChange(item:any) {
    this.items.forEach(val => {
      if (val.value == item.target.value){ 
        val.isSelected = !val.isSelected;
         this.selectedName=val.value;
       
      }
      else {
        val.isSelected = false;
      }
    });
  }
  confirmSelected(){
    if(this.selectedName=="" ){
      this.toastr.error("Please select any one requirement to proceed with the create requirement")
    }  
    else  if(this.selectedName==="Manufacturing Order Requirement"){
      this.router.navigate(['/main/home/manufacturing-o-r']);
    }
    else if(this.selectedName==="Other"){
      this.router.navigate(['/main/home/other']);
    }
    else if(this.selectedName==="HR Requirement"){
      this.router.navigate(['/main/home/hr-requirement']);
    }
    else if(this.selectedName==="Machine"){
      this.router.navigate(['/main/home/machine-requirement']);
    }
    else if(this.selectedName==="Raw Material"){
      this.router.navigate(['/main/home/raw-material']);
    }
    else if(this.selectedName==="Finance"){
      this.router.navigate(['/main/home/finance']);
    }
    
  }
}
