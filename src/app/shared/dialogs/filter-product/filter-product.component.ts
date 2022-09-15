import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';

@Component({
  selector: 'app-filter-product',
  templateUrl: './filter-product.component.html',
  styleUrls: ['./filter-product.component.scss']
})
export class FilterProductComponent implements OnInit {
  open: any;
  business: any;
  industry: any;
  subCatagory: any;
  producttype: any;
  substype: any;
  productBrand: any;
  filterForm:FormGroup;
  sort=[
    {
      label:'Price: Low to High',
      value:'price-l2h',
      isSelected:false
    },
    {
      label:'Price: High to Low',
      value:'price-h2l',
      isSelected:false
    },
    {
      label:'Date Posted: Most recent on top',
      value:'default',
      isSelected:false
    },
    {
      label:' Date Posted: Most recent on last',
      value:'',
      isSelected:false
    },
  ]

  constructor( public dialogRef: MatDialogRef<FilterProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private service:ApiServicesService,private fb:FormBuilder) { }
  ngOnInit(): void {
    this.createFilterForm();
    this.businessActivity();
    this.patchData();
  }

  createFilterForm(){
    this.filterForm = this.fb.group({
      industry_id: [this.data?.filterBy?.industry_id? this.data.filterBy.industry_id: '0'],
      category1_id: [this.data?.filterBy?.category1_id? this.data.filterBy.category1_id:'0'],
      category2_id: [this.data?.filterBy?.category2_id? this.data.filterBy.category2_id:'0'],
      category3_id: [this.data?.filterBy?.category3_id? this.data.filterBy.category3_id:'0'],
      category4_id: [this.data?.filterBy?.category4_id? this.data.filterBy.category4_id:'0'],
      brand_id: [this.data?.filterBy?.brand_id? this.data.filterBy.brand_id:'0']
    })
  }

  patchData(){
    if(this.data.sortBy){
      for(let i=0;i<this.sort.length;i++){
        if(this.sort[i].value == this.data.sortBy){
          this.sort[i].isSelected = true;
        }
      }
    }
    if(this.data.filterBy){
      if(this.data.filterBy.industry_id && this.data.filterBy.industry_id!= "0"){
        // this.filterForm.value['industry_id'] = this.data.filterBy.industry_id
        let ev = {
          target : {
            value : this.data.filterBy.industry_id
          }
        }
        this.getIndustry(ev);
        this.brand(ev);
      }
      if(this.data.filterBy.category1_id && this.data.filterBy.category1_id!= "0"){
        // this.filterForm.value['category1_id'] = this.data.filterBy.category1_id
        let ev = {
          target : {
            value : this.data.filterBy.category1_id
          }
        }
        this.getSubCatagory(ev);
      }
      if(this.data.filterBy.category2_id && this.data.filterBy.category2_id!= "0"){
        // this.filterForm.value['category2_id'] = this.data.filterBy.category2_id
        let ev = {
          target : {
            value : this.data.filterBy.category2_id
          }
        }
        this.productTypes(ev);
      }
      if(this.data.filterBy.category3_id && this.data.filterBy.category3_id!= "0"){
        // this.filterForm.value['category3_id'] = this.data.filterBy.category3_id
        let ev = {
          target : {
            value : this.data.filterBy.category2_id
          }
        }
        this.productsubType(ev)
      }
      if(this.data.filterBy.category4_id && this.data.filterBy.category4_id!= "0"){
        // this.filterForm.value['category4_id'] = this.data.filterBy.category4_id
      }
      if(this.data.filterBy.brand_id && this.data.filterBy.brand_id!= "0"){
        // this.filterForm.value['brand_id'] = this.data.filterBy.brand_id
      }
    }
  }

  onCheckboxChange(item:any) {
    this.sort.forEach(val => {
      if (val.label == item.target.value){ 
        val.isSelected = !val.isSelected;
       
      }
      else {
        val.isSelected = false;
      }
    });
  }

  businessActivity(){
    this.service.get({},`${API_ROUTES.Marketplace.businessActivity}`).pipe().subscribe((res)=>{
      this.business = res.result;
      console.log(this.business)
    })
  }
  getIndustry(event:any){
    if(event.target.value != "0"){
      this.service.get({industry_id:event.target.value},`${API_ROUTES.Marketplace.catagory_1}`).pipe().subscribe((res)=>{
        this.industry = res.result.rows;
        console.log(this.industry)
      })
    }
    
  }
  getSubCatagory(event:any){
    if(event.target.value != "0"){
      this.service.get({category1_id:event.target.value},`${API_ROUTES.Marketplace.catagory_2}`).pipe().subscribe((res)=>{
        this.subCatagory = res.result.rows;
        console.log(this.subCatagory)
      })
    }
    
  }
  productTypes(event:any){
    if(event.target.value != "0"){
      this.service.get({category2_id:event.target.value},`${API_ROUTES.Marketplace.catagory_3}`).pipe().subscribe((res)=>{
        this.producttype = res.result.rows;
        console.log(this.producttype)
      })
    }
    
  }
  productsubType(event:any){
    if(event.target.value!= "0"){
      this.service.get({category3_id:event.target.value},`${API_ROUTES.Marketplace.catagory_4}`).pipe().subscribe((res)=>{
        this.substype = res.result.rows;
        console.log(this.substype)
      })
    }
    
  }
  brand(event:any){
    if(event.target.value != "0"){
      this.service.get({category1_id:event.target.value},`${API_ROUTES.Marketplace.brand}`).pipe().subscribe((res)=>{
        this.productBrand = res.result.rows;
        console.log(this.productBrand)
      })
    }
    
  }

  filter(){
    this.dialogRef.close( {result:true,filterdata: this.filterForm.value });
  }

  sortBy(){
    this.dialogRef.close( {result:true,sortdata: this.sort });
  }
  
}
