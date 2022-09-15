import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PostPublishComponent } from 'src/app/shared/dialogs/post-publish/post-publish.component';
import { UploadService } from 'src/app/services/upload.service';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { parse } from 'path';
import { RouteConstant } from 'src/app/core/_constants/route.constant';
import { ActivatedRoute, Router } from '@angular/router';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-create-new-post',
  templateUrl: './create-new-post.component.html',
  styleUrls: ['./create-new-post.component.scss']
})
export class CreateNewPostComponent implements OnInit {
  countnumber:any="";
  myForm: any;
  submitted = false;
  media:any=[];
  editId: any;
  details: any;
  updateData: any;
  editFlag:boolean=false;
  images: any=[];
  videos: any=[];
  pdf: any=[];
  type: any;
  number:any;
  profileDetails: any;
  showText=false;
  submitted_1:boolean=false;
  emptyFile:boolean= true;


  constructor(private fb:UntypedFormBuilder,
    private dialog :MatDialog,
    public upload: UploadService,
    private toastr:ToastrService,
    private service:ApiServicesService,
    private router: Router,
    private activeRoute:ActivatedRoute,
    private commonService:CommonService
    ) {
      this.activeRoute.queryParams.subscribe((params) =>{
        this.editId = params?.['id'];
        this.type = params?.['type'];
      })

     }

  files:any = [];
  ngOnInit(): void {
    this.getProfile()
     // this.editFlag = this.dataService.getDataByKey('editFlag');
    // let editId = this.dataService.getDataByKey('editId');
    if(this.editId && this.editId!= null && this.editId!=undefined && this.editId!= " "){
      this.editFlag = true;
    }
    if(this.editFlag && this.editId){
      this.createForm();
      this.onUserDetails(this.editId);
    }
    else {
      this.createForm();
    }
    
   
  }

  goBack(){
    this.commonService.goBack();
  }

  get f() { return this.myForm.controls; }
   /**createForm*/
   createForm() {
    this.submitted = false;
    this.myForm = this.fb.group({
      content: [Number(''), [Validators.required]],
      location: [null, [Validators.required]],
    })

  }

  setData() {
    this.showText=true;
    this.emptyFile=false;
    this.submitted_1=false;
    this.myForm.patchValue({
      content:this.updateData.content,
      location:this.updateData.location,
      media:this.updateData.Media,
    })
  }
    postPublish(post:any){
      let requestBody= {
        content:  post.content,
        location: post.location,
        media:this.media,
        post_id:this.editId
    }
 
    if (this.files.length > 0) {
      console.log(this.files);
      requestBody.media = this.files;
    }
    if(this.files.length <=0){
      this.emptyFile = true;
    }
    if(this.myForm.valid && this.files.length <=0){
      this.emptyFile = true;
     }
    this.submitted = true;
    this.submitted_1 = true;
    if (this.myForm.valid ) {
      if (this.editFlag) {
        // const dialogRef = this.dialog.open(EditPopupComponent, {
        //   maxHeight: '100vh',
        //   width: '465px',
        //   panelClass: 'yespost',
        //   data: {
        //     img: 'assets/images/Success.png',
        //     heading: 'Are you sure you want to save this Post?',
        //     report: 'Back',
        //     cancel: 'Yes, Save'
        //   }
        // });
        // dialogRef.afterClosed().subscribe(result => {
        //   console.log('The dialog was closed', result);
        //   if (result == true) {
            this.service.put(requestBody,{}, API_ROUTES.Post.updatePost).pipe().subscribe((res => {
              console.log(res);
              const dialogRef = this.dialog.open(PostPublishComponent, {
                maxHeight: '100vh',
                width: '465px',
                panelClass: 'products',
                data: {
                  img: 'assets/images/Success.png',
                  heading: 'Post updated successfully',
                  // title: 'Please check your inbox and click in the recieved link to reset a password',
                  btn: 'Okay'
                }

              }
              );
              dialogRef.afterClosed().subscribe(result => {
                this.router.navigate(['/main/home']);
              });
            }))
        //   }
        // })
      }
      else {
        // const dialogRef = this.dialog.open(EditPopupComponent, {
        //   maxHeight: '100vh',
        //   width: '465px',
        //   panelClass: 'yespost',
        //   data: {
        //     img: 'assets/images/Success.png',
        //     heading: 'Are you sure you want to post this Post?',
        //     report: 'Back',
        //     cancel: 'Yes, Post'
        //   }
        // });
        // dialogRef.afterClosed().subscribe(result => {
        //   console.log('The dialog was closed', result);
        //   if (result == true) {
            delete requestBody.post_id;
            this.service.post(requestBody, API_ROUTES.Post.createPost, {}).pipe().subscribe((res) => {
              console.log(res);
              const dialogRef = this.dialog.open(PostPublishComponent, {
                maxHeight: '100vh',
                width: '465px',
                panelClass: 'products',
                data: {
                  img: 'assets/images/Success.png',
                  heading: 'Post published successfully',
                  // title: 'Your post has been successfully published',
                  btn: 'Okay'
                }

              }
              );
              dialogRef.afterClosed().subscribe(result => {
                this.router.navigate(['/main/home']);
              });

            });
        //   }

        // })
      }
    
    }
  }
    

    fileupload(e: any) {
      if (this.files.length > 5) {
        this.toastr.error("More than 5 files are not allowed")
      }
      else {
        if (this.files.length > 0 && (this.files.length + parseInt(e.target.files.length) > 5)) {
          this.toastr.error("More than 5 files are not allowed")
        }
        else if (e.target.files.length > 5) {
          this.toastr.error("More than 5 files are not allowed")
        }
        else {
          if (e.target.files.length > 1) {
            for (let i = 0; i < e.target.files.length; i++) {
              this.uploadFile(e.target.files[i])
            }
  
          }
          else {
            const selectedFile = e.target.files[0];
            this.uploadFile(selectedFile);
          }
        }
      }
      return false;
  
    }
  
    async uploadFile(selectedFile: any) {
      let uploadedImage: any = await this.upload.uploadFile(selectedFile);
      if (uploadedImage) {
        this.emptyFile = false;
        console.log(uploadedImage);
        let file = {
          'media_type': uploadedImage.type,
          'url': uploadedImage.Location
        }
        // this.files.push(uploadedImage);
        if(uploadedImage.type.toLowerCase().includes('image')){
          this.images.push(file)
        }
        else if (uploadedImage.type.toLowerCase().includes('video')){
          this.videos.push(file)
        }
        else {
          this.pdf.push(file)
        }
        this.files = [...this.images,...this.videos,...this.pdf];
        // this.files.push(uploadedImage);
        return true;
      } else {
        return false;
      }
    }
  
    onFileDropped(file: any) {
      if (this.files.length > 5) {
        this.toastr.error("More than 5 files are not allowed")
      }
      else {
        if (this.files.length > 0 && (this.files.length + parseInt(file.length) > 5)) {
          this.toastr.error("More than 5 files are not allowed")
        }
        else if (file.length > 5) {
          this.toastr.error("More than 5 files are not allowed")
        }
        else {
          if (file.length > 1) {
            for (let i = 0; i < file.length; i++) {
              this.uploadFile(file[i])
            }
  
          }
          else {
            const selectedFile = file[0];
            this.uploadFile(selectedFile);
          }
        }
      }
      return false;
      // for (let i = 0; i < file.length; i++) {
      //   this.files.push(file[i].name);
      // }
      // console.log(this.files);
  
    }
  
    deleteImg(index:any,type:any){
      // console.log(type);
      
      // let deletedImage: any = await this.upload.deleteFile(file);
      if(type == '1'){
        this.images.splice(index,1);
      }
      else if(type == '2'){
        this.videos.splice(index,1);
      }
      else {
        this.pdf.splice(index,1);
      }
      this.files = [...this.images,...this.videos,...this.pdf];
      console.log(this.files);
      
      
    }
  
  /**resetFrom*/
  resetFrom() {
    
    this.submitted = false;
    this.myForm.reset();
  }


  onUserDetails(id:any){
    let dataToPost = {
      post_id: id
    }
    this.service.get(dataToPost,`${API_ROUTES.Post.postDetail}`).pipe().subscribe((res:any)=>{
      if (res.success) {
        this.updateData = res.result;
        this.setData();
        for(let i=0;i<this.updateData.Media.length;i++){
          let media = {
            'media_type':this.updateData.Media[i].media_type,
            'url': this.updateData.Media[i].url
             }
          if(this.updateData.Media[i].media_type.toLowerCase().includes('image')){
            this.images.push(media)
          }
          else if (this.updateData.Media[i].media_type.toLowerCase().includes('video')){
            this.videos.push(media)
          }
          else {
            this.pdf.push(media)
          }
        } 
        this.files = [...this.images,...this.videos,...this.pdf];
        // this.files.forEach(function(v:any){ delete v.id });
        }
        else {
          // this.toastr.error(res.msg)
        }
      })
  }
  getProfile(){
    this.service.get({},`${API_ROUTES.More.moreDetails}`).pipe().subscribe((res)=>{
      this.profileDetails = res.result[0];
      console.log(this.profileDetails)
    })
  }
}
