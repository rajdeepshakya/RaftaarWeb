import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { CommonService } from 'src/app/services/common.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-addnewuser',
  templateUrl: './addnewuser.component.html',
  styleUrls: ['./addnewuser.component.scss']
})
export class AddnewuserComponent implements OnInit {
counternumber:any="";
contentform:any;
submitted: boolean = false;
profilePic:any;
  loginForm: any;
  profileDetails:any;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private fb:UntypedFormBuilder, private service:ApiServicesService,
    private commonService:CommonService,private router :Router,private toastr:ToastrService,
    private upload:UploadService) { }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      username:['',Validators.required],
      email:['',[Validators.required,Validators.pattern(this.emailPattern)]],
      phone_no:['',Validators.required],
      designation:['',Validators.required],
      profile_pic:['']


     
    })
  }

  onSubmit(post:any) {
    console.log(post,"signup")
    this.submitted = true;
    if(this.loginForm.valid){
      if(this.profilePic && this.profilePic != undefined && this.profilePic!=null){
        post['profile_pic'] = this.profilePic;
      }
      this.service.post(post,`${API_ROUTES.More.addUser}`,{}).pipe().subscribe((res)=>{
        //if(res.success_code==201){
          // alert("User Added Successfully")
          this.router.navigate(['/main/more/settings'])
        //}
      },
      (error)=>{
        this.toastr.error(error.message);
      })
    }
    
    
  }
  get f() { return this.loginForm.controls; }

  fileupload(e: any) {
    const selectedFile = e.target.files[0];
          this.uploadFile(selectedFile);

  }

  async uploadFile(selectedFile: any) {
    let uploadedImage: any = await this.upload.uploadFile(selectedFile);
    if (uploadedImage) {
      console.log(uploadedImage);
      this.profilePic = uploadedImage.Location
      // let file = {
      //   'media_type': uploadedImage.type,
      //   'url': uploadedImage.Location
      // }
      // this.contentform.patchValue({
      //   profile_pic: uploadedImage.Location
      // })
      // let post;
      // if(type == 1){
      //   post = {
      //     profile_pic:uploadedImage.Location
      //   }
      // }
      // else {
      //   post = {
      //     profile_cover: uploadedImage.Location
      //   }
      // }

      // this.service.put(post,{},`${API_ROUTES.More.updatePicture}`).pipe().subscribe((res)=>{
      //   this.getProfile();
      // },
      // (error)=>{
      //   this.toastr.error(error.message);
      // })

      

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

  goBack(){
    this.commonService.goBack();
  }

}
