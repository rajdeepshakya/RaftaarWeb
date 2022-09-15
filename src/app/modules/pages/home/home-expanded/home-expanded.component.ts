import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewComponent } from 'src/app/shared/dialogs/add-new/add-new.component';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { AddPostComponent } from 'src/app/shared/dialogs/add-post/add-post.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ExternalShareComponent } from 'src/app/shared/dialogs/external-share/external-share.component';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';
import { ShareComponent } from '../share/share.component';
import { SharebyComponent } from '../shareby/shareby.component';
import { DataService } from 'src/app/services/data.service';
import { ReportComponent } from 'src/app/shared/dialogs/report/report.component';
import { DOCUMENT } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DeleteComponent } from 'src/app/shared/dialogs/delete/delete.component';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';
import { LocalStorageProvider } from 'src/app/services/storage/storage.service';
// import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
// import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF';




@Component({
  selector: 'app-home-expanded',
  templateUrl: './home-expanded.component.html',
  styleUrls: ['./home-expanded.component.scss']
})
export class HomeExpandedComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['<img src="assets/images/home-1.svg">', '<img src="assets/images/home.svg">'],
    autoplay: false,
    autoplayTimeout: 2000,
    nav: true,
    items: 1,
    
  }
  profileDetails:any

profileIndustry:boolean=false
profileCategory:boolean=false
profileCompSize:boolean=false
rating:boolean=false
gstdata:boolean=false
location:boolean=false
  homeData: any;
  format: any;
  url: any;
  comment: string = '';
  replyComment: string = '';
  isReply:boolean;
  // showImage:boolean=true;
  // showVideo:boolean=true
  viewer :any;  
  selectedType = 'docx'; 
  Media: any=[];  
  DemoDoc="http://www.africau.edu/images/default/sample.pdf"  
  card: any;
  comments: any;
  // hidecomment:boolean=false;
  postSlides:any =[];
  postDataArray:any =[];
  post_id: any;
  text: string;
  editlist:boolean=false
  editPost:boolean=false
  type: number;
  reportData: any;
  page: number = 1;
  count: number = 0;
  // Size: number = 20;
  Size: number= 20;
  search:any;
  subscription: Subscription;
  readMore:any=[];



  // isLiked:boolean=false
  
  constructor(private dataService:DataService,private loader:NgxUiLoaderService,
    private searchService:SearchService,private storageService:LocalStorageProvider,
    @Inject(DOCUMENT) private document: Document, private activeRoute:ActivatedRoute,private dialog:MatDialog , private service: ApiServicesService,private router:Router,private toastr:ToastrService) { }
  addPost(){
  const dialogRef = this.dialog.open(AddNewComponent,{
    // maxHeight: '100vh',
      width:'501px',
      // panelClass:'addNew',
      data: {}
  })
  }

  data: any;
  ngOnInit(): void {
    // this.onUserDetails()
    this.storageService.setItem("currentUser","me")
    this.searchService.changeProfile("me");
    this.getProfile()
    this.activeRoute.queryParams.subscribe((params) =>{
      this.post_id = params?.['post_id'];
      console.log(this.post_id);
     
    })
  
    
  }
@HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if (pos == max) {
      this.Size = this.Size + 20;
      this.getPost();
    }
  }

  get(search:any){
    this.loader.start();
    let page;
    if(search != "default message"){
      page={
        pageNo:this.page,
        size:this.Size,
        search: search
      }
    }
    else {
      page={
        pageNo:this.page,
        size:this.Size
      }
    }
    this.service.get(page,`${API_ROUTES.Home.homeListing}`).pipe().subscribe((res)=>{
      this.loader.stop()
        this.data = res.result;
        if(this.data && this.data.length > 0){
        for(let i=0 ; i<this.data.length; i++){
          
          this.data[i].slides = [];
        if(this.data[i].Post && this.data[i].Post != null){
          if(this.data[i].Post.content.length > 200){
            this.readMore[i] = false;
          }
          else {
            this.readMore[i] = true;
          }
          if(this.data[i].Post.Auth.CompanyInfo && this.data[i].Post.Auth.CompanyInfo.company_name.toLowerCase() == this.profileDetails.company_name.toLowerCase()){
            this.data[i]['editlist'] = true;
          } 
          else{
            this.data[i]['editlist'] = false;
          }
          if(this.data[i].Post.Media && this.data[i].Post.Media.length >0){
            for(let j=0;j<this.data[i].Post.Media.length;j++){
              let slide = {
                url:this.data[i].Post.Media[j].url,
                type: ''
              }
              if(this.data[i].Post.Media[j].media_type.toLowerCase().includes('image')){
                slide.type = 'image';
                this.data[i].slides.push(slide);
              }
              else if(this.data[i].Post.Media[j].media_type.toLowerCase().includes('video')){
                slide.type = 'video';
                this.data[i].slides.push(slide);
              }
              else {
                slide.type = 'pdf';
                slide.url = 'assets/images/homePdf.png';
                this.data[i].slides.push(slide);
              }
            } 
          }
            }
            else if(this.data[i].Ad && this.data[i].Ad != null){
              if(this.data[i].Ad.url.includes('http')){
                this.data[i].Ad.url = this.data[i].Ad.url;
              }
              else {
                this.data[i].Ad.url = 'https://' + this.data[i].Ad.url;
              }
            }
            else {
              if(this.data[i].Requirement!= false && this.data[i].Requirement != null){
                if(this.data[i].Requirement.description.length > 200){
                  this.readMore[i] = false;
                }
                else {
                  this.readMore[i] = true;
                }
                if(this.data[i].Requirement.Auth.CompanyInfo && this.data[i].Requirement.Auth.CompanyInfo.company_name.toLowerCase() == this.profileDetails.company_name.toLowerCase()){
                  this.data[i]['editlist'] = true;
                } 
                else{
                  this.data[i]['editlist'] = false;
                }
                if(this.data[i].Requirement.req_type.toLowerCase() == 'hr'){
                  let slide = {
                    url:'assets/images/homePdf.png',
                    type: 'pdf'
                  }
                  this.data[i].slides.push(slide);
                }
                else {
                  if(this.data[i].Requirement.Media.length > 0){
                    for(let j=0;j<this.data[i].Requirement.Media.length;j++){
                      let slide = {
                        url:this.data[i].Requirement.Media[j].url,
                        type: ''
                      }
                      if(this.data[i].Requirement.Media[j].media_type.toLowerCase().includes('image')){
                        slide.type = 'image';
                        this.data[i].slides.push(slide);
                      }
                      else if(this.data[i].Requirement.Media[j].media_type.toLowerCase().includes('video')){
                        slide.type = 'video';
                        this.data[i].slides.push(slide);
                      }
                      else {
                        slide.type = 'pdf';
                        slide.url = 'assets/images/homePdf.png';
                        this.data[i].slides.push(slide);
                      }
                    }
                  }
                }
          }
            }
          }  
          console.log(this.data);
          
        }  
     
      // if(res.result.Post!=null){
      //   this.data = res.result.Post;
      //   console.log(this.data,"dfghjkl");
      // }else if(res.result.Requirement!=null)
      // {
      //   this.data = res.result.Requirement;
      // }
      console.log(this.readMore);
      
      
    },(error)=>{
      console.log(error);
      this.loader.stop();
      this.toastr.error(error.message)
     
    }
    )
    console.log(this.data);
  }

  getPost(){
    this.subscription = this.searchService.currentMessage.subscribe(text => this.get(text));
    console.log(this.search);
    
    
  }

  unSaveRequirement(id:any){
    let params = {
      requirement_id: id
    }
    this.service.delete(params,`${API_ROUTES.MyRequirements.unSave}`).pipe().subscribe((res)=>{
      if(res.success){
        this.getPost();
        // this.toastr.success(res.message);
        // this.router.navigate(['/main/chat/chatHello'],{queryParams:{post_id:id}})
      }else{
        this.toastr.error(res.message);
      }
    },
    (error)=>{
      this.toastr.error(error.message)
    })

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  // postData(){
  //   if(this.postDataArray && this.postDataArray.Media && this.postDataArray.Media.length > 0){
  //   let list = this.postDataArray.Media;
  //             for(let j = 0;j<list.length;j++){
  //               let slide = {
  //                 url: list[j].url,
  //                 type: ''
  //               }
  //               if(list[j] && list[j] && list[j].media_type.toLowerCase().includes('image') ){
  //                 list[j].type = "image";
  //                 slide.type = 'image'
  //                 list[j].slides.push(slide);
  //               }
  //               else if(list[j] && list[j] && list[j].media_type.toLowerCase().includes('video')) {
  //                 list[j].type = "video";
  //                 slide.type = 'video'
  //                 list[j].slides.push(slide);
  //               }
  //               else {
  //                 list[j].type = "pdf";
  //                 slide.url = 'assets/images/docu.svg'
  //                 slide.type = 'pdf'
  //                 list[j].slides.push(slide);
  //               }
  //             }
  //           }
  // }
  
  likePost(post:any) {
    this.service.post(post,`${API_ROUTES.Post.likePost}`,{}).pipe().subscribe((res)=>{
      if(res.success_code==201){
        alert('password reset successful')
      }
    })
    
  }

  webview(url:any){
    if(url.includes('http')){
      window.location.href = url;
    }
    else {
      window.location.href = 'https://' + url;
    }
    
  }
  onview(data:any,type:any){
    // console.log(data,"daataaa")
    
    if(type == 1){
      this.router.navigate(['/main/home/post-detail'],{queryParams:{post_id:data.id}})
    }
    else if (type == 2){
    if(data.req_type.toLowerCase()=="manufacturing order requirement"){
      this.router.navigate(['/main/home/manufacturing-o-r_home'],{queryParams: {id: data.id}});
    }
    else if(data.req_type.toLowerCase()=="other"){
      this.router.navigate(['/main/home/other_home'],{queryParams: {id: data.id}});
    }
    else if(data.req_type.toLowerCase()=="hr"){
      this.router.navigate(['/main/home/hr-requirement_home'],{queryParams: {id: data.id}});
    }
    else if(data.req_type.toLowerCase()=="machine"){
      this.router.navigate(['/main/home/machine_home'],{queryParams: {id: data.id}});
    }
    else if(data.req_type.toLowerCase()=="raw material"){
      this.router.navigate(['/main/home/raw-mat_home'],{queryParams: {id: data.id}});
    }
    else if(data.req_type.toLowerCase()=="finance"){
      this.router.navigate(['/main/home/finance_home'],{queryParams: {id: data.id}});
    }
    }

  }
  navigateOnPost(){
    this.router.navigate(['/main/home/create-new-post']);
  }
    onSelectFile(event:any) {
      const file = event.target.files && event.target.files[0];
      if (file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        if(file.type.indexOf('image')> -1){
          this.format = 'image';
          // this.showImage = this.showImage ? false : true;
        } else if(file.type.indexOf('video')> -1){
          this.format = 'video';
          // this.showVideo = this.showVideo ? false : true;
        }
        reader.onload = (event) => {
          this.url = (<FileReader>event.target).result;
        }
      }
    }
    hitLike(data:any){
      
      var requestBody={
        post_id:data
      }
      this.service.post(requestBody,`${API_ROUTES.Post.likePost}`,{}).pipe().subscribe((res)=>{
        if(res.success){
          this.toastr.success(res.message);
          this.getPost();
        }
        else{
  
        }
      
      },
      (error)=>{
        this.toastr.error(error.message);
      })
    }
    sendComment(data:any){
      var requestBody={
        post_id:data,
        comment_text:this.comment,
        status:1
      }
      if(this.comment.trim()!=''||this.comment.trim()!=""){
        this.service.post(requestBody,`${API_ROUTES.Post.postComment}`,{}).pipe().subscribe((res)=>{
          if(res.success){
            this.comment = '';
            this.toastr.success(res.message);
            this.getPost();
          }else{
    
          }
        })
      }else{
        alert("Please enter the comment");
      }
      
    }
    ReplyComment(){
      this.isReply=true;
    }
    sendReplyComment(PostId:any,commentId:any){
      
var requestBody={
  post_id:PostId,
  comment_id:commentId,
  comment_text:this.replyComment,
}
if(this.replyComment.trim()!=''||this.replyComment.trim()!=""){
  this.service.post(requestBody,`${API_ROUTES.Post.replyComment}`,{}).pipe().subscribe((res)=>{
    if(res.success){
      this.comment = '';
      this.toastr.success(res.message);
      this.getPost();
    }else{

    }
  })
}
else{
  alert("Please enter the comment");
}
    }
   

    saveRequirement(id:any){
      let params = {
        requirement_id: id
      }
      this.service.post({},`${API_ROUTES.MyRequirements.saveRequirement}`,params).pipe().subscribe((res)=>{
        if(res.success){
          this.getPost();
          // this.toastr.success(res.message);

        }else{
          this.toastr.error(res.message);
        }
      })
    }

    showinterest(id:any){
      let params = {
        req_id: id
      }
      this.service.post({},`${API_ROUTES.MyRequirements.showinterest}`,params).pipe().subscribe((res)=>{
        if(res.success){
          this.getPost();
          // this.toastr.success(res.message);
          // this.router.navigate(['/main/chat/chatHello'],{queryParams:{post_id:id}})
        }else{
          this.toastr.error(res.message);
        }
      })
    }

    // toggleContent(index:any){
    //   this.isContentToggled[i] = !this.isContentToggled[i];
    // this.content = this.isContentToggled ? this.nonEditedContent : this.formatContent(this.content);
    // }

    getProfile(){
      this.service.get({},`${API_ROUTES.More.moreDetails}`).pipe().subscribe((res)=>{
        this.profileDetails = res.result[0];
        this.storageService.setItem("currentUserId",this.profileDetails.auth_id)
        console.log(this.profileDetails)
        if(this.profileDetails.profile_pic!==null){
          this.profileDetails.profileurl = this.profileDetails.profile_pic
        }
        else {
          this.profileDetails.profileurl='assets/images/Profile_1.svg'
        }
        if(this.profileDetails.Industry && this.profileDetails.Industry.industry_name!=null){
        this.profileIndustry=true
        }
        if(this.profileDetails.Category1.title!=null){
          this.profileCategory=true
        }
        if(this.profileDetails.company_size!=null){
          this.profileCompSize=true
        }
        if(this.profileDetails.gst_no!=null && this.profileDetails.gst_no != ""){
          this.gstdata=true
        }
        if(this.profileDetails.address!=null){
          this.location=true
        }

        this.getPost();
        
      },
      (error)=>{
        this.toastr.error(error.message);
      })
    }

    edit(data:any,type:any){
      if(type == 1){
        this.router.navigate(['/main/home/create-new-post'],{queryParams: {id:data.id}});
      }
      else if (type == 2){
        this.dataService.setData('editFlag',true);
      this.dataService.setData('editId',data.id);
      if(data.req_type.toLowerCase()=="manufacturing order requirement"){
        this.router.navigate(['/main/home/manufacturing-o-r'],{queryParams: {id: data.id}});
      }
      else if(data.req_type.toLowerCase()=="other"){
        this.router.navigate(['/main/home/other'],{queryParams: {id: data.id}});
      }
      else if(data.req_type.toLowerCase()=="hr"){
        this.router.navigate(['/main/home/hr-requirement'],{queryParams: {id: data.id}});
      }
      else if(data.req_type.toLowerCase()=="machine"){
        this.router.navigate(['/main/home/machine-requirement'],{queryParams: {id: data.id}});
      }
      else if(data.req_type.toLowerCase()=="raw material"){
        this.router.navigate(['/main/home/raw-material'],{queryParams: {id: data.id}});
      }
      else if(data.req_type.toLowerCase()=="finance"){
        this.router.navigate(['/main/home/finance'],{queryParams: {id: data.id}});
      }
      }
      
    }

    onUserDetails(){
      this.service.get({post_id:this.post_id},`${API_ROUTES.Post.postDetail}`).pipe().subscribe((res:any)=>{
        this.data = res.result;
        
      },
      (error)=>{
        this.toastr.error(error.message);
      })
    }
    delete(id:any){
      const dialogRef=this.dialog.open(DeleteComponent,{
        maxHeight: '100vh',
        width:'465px',
        data: {
          img:'assets/images/Delete.png',
          heading:'Hey, do you really want to delete this post?',
          // para:'Lorem Ipsum is simply dummy text of the printing text of the printing. ',
          report:'Yes, delete',
          cancel:'Go back'
        }
      })
      dialogRef.afterClosed().subscribe(result => {
        let dataToDelete = {
          'postId':id
        }
        this.service.delete(dataToDelete,API_ROUTES.Post.deletePost).pipe().subscribe((res:any) =>{
          console.log(res);
          this.data = [];
         this.getPost()
        },(error)=>{
          this.toastr.error(error.message)
        })
      });
    }


    shareHome(id:any,type:any){
      const dialogRef = this.dialog.open(SharebyComponent, {
        maxHeight: '100vh',
        width: '300px',
        panelClass: 'yespost',
      });
      dialogRef.afterClosed().subscribe(data => {
       console.log(data)
       if(data.result==true && data.data==2){
        const dialogRef = this.dialog.open(ShareComponent, {
          maxHeight: '100vh',
          width: '465px',
          panelClass: 'yespost',
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
        })
       }
       else if(data.result==true && data.data==1){
        let requestBody;
        if(type == 1){
          requestBody={
            post_id:id
          }
        }
        else if(type == 2){
          requestBody={
            requirement_id:id
          }
        }
       
      this.service.post(requestBody,`${API_ROUTES.Post.sharepost}`,{}).pipe().subscribe((res)=>{
        if(res.success){
          // this.toastr.success(res.message);
          this.toastr.success(res.message, undefined, {
            positionClass: 'toast-bottom-right'
       });
          this.getPost();
        }else{
          this.toastr.error(res.message);
        }
      })
         }
        })
   
    }

    postDetails(){
      
    }

    interestedUsers(id:any){
      this.router.navigate(['/main/chat/chatHello'],{queryParams: {post_id:id}});
    }

    openDetails(data:any){
      if(data.req_type.toLowerCase()=="manufacturing order requirement"){
        this.router.navigate(['/main/home/manufacturing-o-r_home'],{queryParams: {id: data.id}});
      }
      else if(data.req_type.toLowerCase()=="other"){
        this.router.navigate(['/main/home/other_home'],{queryParams: {id: data.id}});
      }
      else if(data.req_type.toLowerCase()=="hr"){
        this.router.navigate(['/main/home/hr-requirement_home'],{queryParams: {id: data.id}});
      }
      else if(data.req_type.toLowerCase()=="machine"){
        this.router.navigate(['/main/home/machine_home'],{queryParams: {id: data.id}});
      }
      else if(data.req_type.toLowerCase()=="raw material"){
        this.router.navigate(['/main/home/raw-mat_home'],{queryParams: {id: data.id}});
      }
      else if(data.req_type.toLowerCase()=="finance"){
        this.router.navigate(['/main/home/finance_home'],{queryParams: {id: data.id}});
      }
    }

    deleteRequirement(data:any,type:any){
      if(data.req_type.toLowerCase()=="manufacturing order requirement"){
        this.text='Hey, do you really want to delete this manufacturing order requirement?';
      }
      else if(data.req_type.toLowerCase()=="hr"){
    this.text='Hey, do you really want to delete this HR Requirement?'
    }
    else if(data.req_type.toLowerCase()=="machine"){
      this.text='Hey, do you really want to delete this machine?'
        }
        else if(data.req_type.toLowerCase()=="raw material"){
          this.text='Hey, do you really want to delete this raw material?'
            }
            else if(data.req_type.toLowerCase()=="finance"){
              this.text='Hey, do you really want to delete this finance?'
                }
                else if(data.req_type.toLowerCase()=="other"){
                  this.text='Hey, do you really want to delete this other?'
                    }
      const dialogRef = this.dialog.open(DeleteComponent, {
        maxHeight: '100vh',
        width:'465px',
        // panelClass:'yespost',
        data: {
          img:'assets/images/Delete.png',
          heading:this.text,
          report:'Yes, delete',
          cancel:'Go, back'
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        
        let dataToDelete = {
          'requirement_id':data.id
        }
        this.service.delete(dataToDelete,API_ROUTES.MyRequirements.deleteRequirement).pipe().subscribe((res =>{
          console.log(res);
          if (res.success) {
            this.data = [];
            this.getPost();
          }
           else {
          }
        }))
      });
    
    }
    report(detailsData:any){
      // const dialogRef = this.dialog.open(DeleteComponent, {
      //   maxHeight: '100vh',
      //   width:'465px',
      //   // panelClass:'yespost',
      //   data: {
      //     img:'assets/images/reporticon.svg',
      //     heading:'Are you Sure want to Report this Requirement/Post',
      //     report:'Yes, Report',
      //     cancel:'Go, back'
      //   }
      // });
      //dialogRef.afterClosed().subscribe(result => {
        // if(result){
          const dialogRef = this.dialog.open(ReportComponent, {
            maxHeight: '100vh',
            width:'490px',
            // panelClass:'yespost',
          });
          dialogRef.afterClosed().subscribe(data => {
            console.log('The dialog was closed', data);
            if(data.result == true){
              let requestBody
              if(detailsData.type.toLowerCase() == 'post'){
                requestBody={
                  type:'post',
                  post_id:detailsData.Post.id,
                  reported_by:this.profileDetails.Auth.id,
                  content_created_by:detailsData.Post.Auth.id,
                  reason_for_report: data.reportData
    
                 }
              }
              else if (detailsData.type.toLowerCase() == 'requirement'){
                requestBody={
                  type:'requirement',
                  requirement_id:detailsData.Requirement.id,
                  reported_by:this.profileDetails.Auth.id,
                  content_created_by:detailsData.Requirement.Auth.id,
                  reason_for_report: data.reportData
    
                 }            }
              
               this.service.post(requestBody,`${API_ROUTES.MyRequirements.report}`,{}).subscribe((res)=>{
               
                 })
            }
               
                
                
  })
        //}
  //   })
  }

  onDataChange(event: any) {
    this.page = event;
    this.getPost();
  }

  profileView(data:any){
    if(data.auth_id == this.profileDetails.auth_id){
      this.storageService.setItem("currentUser","me");
      this.storageService.setItem("currentUserId",data.auth_id);
      this.router.navigate(['main/profile/about'])
    }
    else {
      this.storageService.setItem("currentUser","other");
      this.storageService.setItem("currentUserId",data.auth_id);
      this.router.navigate(['main/profile/about'])
      this.searchService.changeProfile("other");
    }
  }
  // onDataSizeChange(event: any): void {
  //   this.Size = event.target.value;
  //   this.page = 1;
  //   this.getPost();
  // }

 

  }

  