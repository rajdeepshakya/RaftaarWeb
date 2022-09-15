import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';
import { PostPublishComponent } from 'src/app/shared/dialogs/post-publish/post-publish.component';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { LogoutComponent } from 'src/app/shared/dialogs/logout/logout.component';
import { UploadService } from 'src/app/services/upload.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {
  counternumber:any="";
  contentform:any;
  itras:any=['name','surname'];
  submitted: boolean = false;
  profileDetails: any;
  business: any;
  industry: any;
  business_activity :any=[];
  subcategory:any=[]
  docList = [];
  data: any;
  categories: any[];
  subcategories: any[];
  categories_1: any=[];
  categories1: any;
  subCategoryList=[];
  category2: any=[];
  industrieserved: any[];
  subactivity:any;
  subactivityList=[];
  industries_served: any=[];
  sub_activity: any=[];
  category_2=[];
  subactivelist=[];
  loc:any=[];
  loc2:any=[];
  loc4:any=[];
  profileDetails1:any=[];
  businessActivityArray:any=[];
  profileDetails2:any=[]

  CategoryL3: any =[];
  profileDetails4:any=[]
  CategoryL3SetValue:any=[];
  profileDetails3:any=[];
  industrysersetValue:any=[];
  subcategory2:any = [];
  Industyserve:any =[];
  SubActivity:any =[];
  currentUrl: any;
  editProfile: boolean;
  gstVerified:boolean = true;
 

  remove(): void {
    // const index = this.fruits.indexOf();

    // if (index >= 0) {
    //   this.fruits.splice(index, 1);
    // }
  }
  constructor(  private dialog :MatDialog,private toastr:ToastrService,private commonService:CommonService,
    private fb :UntypedFormBuilder, private router:Router, private service:ApiServicesService,private upload:UploadService) { }

  ngOnInit(): void {
    this.getProfile()
    this.contentform = this.fb.group({
      company_name:['',Validators.required],
      description:["",Validators.required],
      gst_no:['',Validators.required],
      company_size: ["",Validators.required],
      address: ['',Validators.required],
      business_activity:['',[Validators.required]],
      industries_served:['',[Validators.required]],
      category2:['',[Validators.required]],
      sub_activity:['',[Validators.required]],
      category1_id:['',[Validators.required]],
      email: [''],
      contact_no: [''],
      // profile_pic: ['']
     });

     this.currentUrl = this.router.url
     if(this.currentUrl  == '/main/more') {
       this.editProfile = false;
     }
     else if(this.currentUrl == '/main/more/edit-profile'){
       this.editProfile = true;
     }
  }


  onSubmit(post:any) {
    post.business_activity=this.business_activity;
    post.category2 = this.subcategory2;
    post.industries_served = this.Industyserve;
    post.sub_activity = this.SubActivity
    console.log(post);
    delete post.email;
    delete post.contact_no;
    
  
    
    post.business_activity=this.business_activity;
    // var dd=JSON.stringify(post);
    this.submitted = true;
    //if (this.contentform.valid) {
    this.service.put(post,{},`${API_ROUTES.More.editProfile}`).pipe().subscribe((res)=>{
      console.log(res)
      if(res.success_code=201){
          const dialogRef = this.dialog.open(EditPopupComponent, {
            maxHeight: '100vh',
            width: '465px',
            panelClass: 'yespost',
            data: {
              img: 'assets/images/addpost.png',
              heading: 'Are you sure you want to save this Profile?',
              report: 'Back',
              cancel: 'Yes, Save'
            }
          });
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
            if (result == true) {
              this.service.put(post,{}, API_ROUTES.More.editProfile).pipe().subscribe((res => {
                console.log(res);
                const dialogRef = this.dialog.open(PostPublishComponent, {
                  maxHeight: '100vh',
                  width: '465px',
                  panelClass: 'products',
                  data: {
                    img: 'assets/images/Success.png',
                    heading: 'Profile Updated Successfully',
                    btn: 'Okay'
                  }
                }
                );
                dialogRef.afterClosed().subscribe(result => {
                  this.router.navigate(['/main/more'])
                });
              }))
            }
          })
        }
       
        
      },
      // (error)=>{
      //   this.toastr.error(error.result.error)
      // }
      )
    //}
    
    
  
}

goBack(){
  this.commonService.goBack();
}

  setData(){
    this.contentform.patchValue({
    company_name: this.profileDetails.company_name,
    description: this.profileDetails.description,
    gst_no: this.profileDetails.gst_no,
    company_size: this.profileDetails.company_size,
    address: this.profileDetails.address,
    category1_id:this.profileDetails.Category1.id,
    email:this.profileDetails.Auth.email,
    contact_no:this.profileDetails.Auth.phone_no
    })
    console.log(this.contentform.value);
    

    let businessActivitySet:any= [];
    let businessActivityArray:any =[];
    this.profileDetails1.businessActivity.forEach((val:any)=>{
      businessActivitySet.push(val.business_activity)
      businessActivityArray.push(val.business_activity);
    } )
    if(businessActivityArray && businessActivityArray.length >0){
      let event = {
        value: businessActivityArray
      }
      this.fix(event)
    }
    this.contentform.patchValue({
      business_activity: businessActivityArray
    })

    let industriesSet:any= [];
    // let subActivityArray:any =[];
    this.profileDetails3.industriesServed.forEach((val:any)=>{
      industriesSet.push(val.industries_served)
      // subActivityArray.push(val.industries_served);
    } )
    this.contentform.patchValue({
      industries_served: industriesSet
    })

    // for Calling Sub Category
    let event = {
      value: this.profileDetails.Category1.id
    }
    this.getSubCatagory(event);

    // // for Calling Sub Category
    // let event = {
    //   value: this.profileDetails.Category1.id
    // }
    // this.getSubCatagory(event);
    
    // for Setting Sub Category
    
    // let SubCategorySet:any= [];
    // this.profileDetails2.CategoryL3.forEach((val:any)=>{
    //   SubCategorySet.push(val.sub_category)
    // } )
    // if(SubCategorySet && SubCategorySet.length >0){
    //   let event = {
    //     value: SubCategorySet
    //   }
    //   this.SubCatagory(event);
    // }
    // this.contentform.patchValue({
    //   category2: SubCategorySet

    // })

    // For Calling Sub Activity
    // let industriesSet:any= [];
    let subActivityArray:any =[];
    this.profileDetails3.industriesServed.forEach((val:any)=>{
      // industriesSet.push(val.industries_served)
      subActivityArray.push(val.industries_served);
    } )
    if(subActivityArray && subActivityArray.length >0){
      let event = {
        value: subActivityArray
      }
      this.getSubActivity1(event)
    }
    console.log(this.contentform.value);
    

    //For Setting Sub Activity
    
  }
 
  getProfile(){
    this.service.get({},`${API_ROUTES.More.moreDetails}`).pipe().subscribe((res)=>{
      this.profileDetails = res.result[0];
      this.profileDetails1 = res.result[1];
      this.profileDetails2 = res.result[2];
      this.profileDetails3 = res.result[3];

      this.profileDetails4 = res.result[4];

      console.log(this.profileDetails)
      
      console.log(this.business_activity);
      console.log(this.CategoryL3)
      this.businessActivity()
    })
  }
 
  businessActivity() {
    this.service.get({}, `${API_ROUTES.Account.getIndustry}`).pipe().subscribe((res) => {
      this.data = res.result;
      this.Industriesserved()
      console.log(this.data)
    })
  }
  getindustry(id:any) {
    this.service.get({industry_id:id}, `${API_ROUTES.Account.getCategory}`).pipe().subscribe((res) => {
      if(res.result.rows.length > 0){
        this.categories = [...res.result.rows];
      }      
      console.log(this.categories)
    })
  }

  getSubCatagory(id:any){
    this.service.get({category1_id:id.value},`${API_ROUTES.Account.getsubCategory}`).pipe().subscribe((res)=>{
        this.subcategories = res.result.rows;
      console.log(this.subcategories)
      let SubCategorySet:any= [];
    this.profileDetails2.CategoryL3.forEach((val:any)=>{
      SubCategorySet.push(val.sub_category)
    } )
    if(SubCategorySet && SubCategorySet.length >0){
      let event = {
        value: SubCategorySet
      }
      this.SubCatagory(event);
    }
    this.contentform.patchValue({
      category2: SubCategorySet

    })
    })
  }
  Industriesserved(){
    this.service.get({},`${API_ROUTES.Account.industriesserve}`).pipe().subscribe((res)=>{
      if(res.result.rows.length > 0){
        this.industrieserved = [...res.result.rows];
      } 
      this.setData();
      
      console.log(this.industrieserved)
      
    })
  }
  getSubActivity(id:any){
    this.service.get({ industry_id:id},`${API_ROUTES.Account.subActivtiyL}`).pipe().subscribe((res)=>{
        if(res.result.rows.length > 0){
          this.subactivity = [...res.result.rows];
        } 
      console.log(this.subactivity)
      let subActivitySet:any= [];
    this.profileDetails4.subActivity.forEach((val:any)=>{
      subActivitySet.push(val.sub_activity)
    } )
    if(subActivitySet && subActivitySet.length >0){
      let event = {
        value: subActivitySet
      }
      this.getSubAct(event)
    }
    this.contentform.patchValue({
      sub_activity:subActivitySet

    })
    })
  }
  getSubActivity1(event:any){
    event.value.forEach((val:any)=>{
      if(val!=null){
        let filterObj = this.industrieserved.find((el:any) => el.id == val);
    console.log(filterObj);
    let pushObj = {
      industries_served: filterObj.id,
    }
        let obj = this.Industyserve.find((item:any) =>
          item.industries_served == val
        );
          if (obj) {
          } else {
            this.Industyserve.push(pushObj)
            this.getSubActivity(val);
          }
      }
    });

    console.log(this.Industyserve);
  }
  SubCatagory(event:any){
    event.value.forEach((val:any)=>{
      if(val!=null){
        let filterObj = this.subcategories.find((el:any)=> el.id == val);
        console.log(filterObj);
        let pushObj = {
          category2: filterObj.id,
            title: filterObj.title
        }
        let obj = this.subcategory2.find((item:any)=> item.category2 == val)
        if(obj){
          }
        else {
          this.subcategory2.push(pushObj);
        }  
      }
    })
  }
  getSubAct(event:any){
    event.value.forEach((val:any)=>{
      if(val!=null){
        let filterObj = this.subactivity?.find((el:any)=> el.id == val);
        console.log(filterObj);
        let pushObj:any
        if(filterObj){
          pushObj = {
            sub_activity: filterObj.id,
              title: filterObj.title
          }
        }
        console.log(this.SubActivity);
        if(this.SubActivity && this.SubActivity.length>0){
          let obj = this.SubActivity?.find((item:any)=> item.sub_activity == val)
        if(obj){
          }
        else {
          this.SubActivity.push(pushObj);
        }
        }
          
      }
    })
  }
  fix(event: any) {
    console.log(event.value);
    event.value.forEach((val:any)=>{
      if(val!=null){
        let filterObj = this.data.find((el:any) => el.id == val);
    console.log(filterObj);
    let pushObj = {
      business_activity: filterObj.id,
      title: filterObj.industry_name
    }
        let obj = this.business_activity.find((item:any) =>
          item.business_activity == val
        );
          if (obj) {
          } else {
            this.business_activity.push(pushObj)
            this.getindustry(val);
          }
      }
    });

    console.log(this.business_activity);
  }

  fixCategory(id: any) {
    console.log(id.target.value);

    this.contentform.value.category1_id = id;

  }

  fileupload(e: any,type:any) {
    const selectedFile = e.target.files[0];
          this.uploadFile(selectedFile,type);

  }

  async uploadFile(selectedFile: any,type:any) {
    let uploadedImage: any = await this.upload.uploadFile(selectedFile);
    if (uploadedImage) {
      console.log(uploadedImage);
      // let file = {
      //   'media_type': uploadedImage.type,
      //   'url': uploadedImage.Location
      // }
      // this.contentform.patchValue({
      //   profile_pic: uploadedImage.Location
      // })
      let post;
      if(type == 1){
        post = {
          profile_pic:uploadedImage.Location
        }
      }
      else {
        post = {
          profile_cover: uploadedImage.Location
        }
      }

      this.service.put(post,{},`${API_ROUTES.More.updatePicture}`).pipe().subscribe((res)=>{
        this.getProfile();
      },
      (error)=>{
        this.toastr.error(error.message);
      })

      

      // this.files.push(uploadedImage);
      // if(uploadedImage.type.toLowerCase().includes('image')){
      //   this.images.push(file)
      // }
      // else if (uploadedImage.type.toLowerCase().includes('video')){
      //   this.videos.push(file)
      // }
      // else {
      //   this.pdf.push(file)
      // }
      // this.files = [...this.images,...this.videos,...this.pdf];
      // this.files.push(uploadedImage);
      return true;
    } else {
      return false;
    }
  }

  gstVerification(){
    
    console.log(this.contentform.value['gst_no']);
    
    if(this.contentform.value['gst_no'].length > 14){
      let params = {
      gst: this.contentform.value['gst_no']
    }
    this.service.get(params,`${API_ROUTES.Account.gstVerification}`).pipe().subscribe((res)=>{
      if(res.success){
        this.gstVerified = true;
      }
      else {
        this.gstVerified = false;
      }
      
    })
    }
    
  }

//   submit(){
//   console.log(this.profileForm.value);
//    this.service.put( this.profileForm.value,{},`${API_ROUTES.More.changepic}`).pipe().subscribe((res)=>{
//     console.log(res)
//   })

// }

routeToEdit() {
  this.editProfile = true;
  this.router.navigate(['main/more/edit-profile']);
}

logout(){
  const dialogRef=this.dialog.open(LogoutComponent,{
    maxHeight: '100vh',
    width:'465px',
    data: {
      img:'../.assets/images/report.svg',
      heading:'Are you sure you want to logout?',
      para:'Lorem Ipsum is simply dummy text of the printing text of the printing. ',
      report:'Yes, Logout',
      cancel:'Cancel'
    }
  })
}

}
