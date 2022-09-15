import { I } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { CommonService } from 'src/app/services/common.service';
import { DeleteComponent } from 'src/app/shared/dialogs/delete/delete.component';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';
import { ReportComponent } from 'src/app/shared/dialogs/report/report.component';
import { ViewImageComponent } from 'src/app/shared/dialogs/view-image/view-image.component';
import { ShareComponent } from '../share/share.component';
import { SharebyComponent } from '../shareby/shareby.component';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  replyComment: any = [];commentId: any;
;
  showReply:any = [];
  isShow=false
  data: any;
  details: any;
  public commentList: any[];
  hiddenItems: any={};
  post_id: any;
  isReply:boolean;
  comment: string = '';
  profileDetails:any;
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
    items: 1,
    nav: true
  }
  commentEdit:boolean = false;
  constructor(private router:Router, private dialog:MatDialog,private commonService:CommonService,
    private toastr:ToastrService, private activeRoute:ActivatedRoute, private service: ApiServicesService) { }
  showdropdown(){
    this.isShow=!this.isShow
  }
  openCollectModal(){
    this.showdropdown();
    const dialogRef = this.dialog.open(EditPopupComponent, {
      maxHeight: '100vh',
      width:'465px',
      data: {
        img:'../.assets/images/report.svg',
        heading:'Are you sure you want to report this comment?',
        para:'Lorem Ipsum is simply dummy text of the printing text of the printing. ',
        report:'Yes, Report',
        cancel:'Cancel'
      }
    });
  }
  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((params) =>{
      this.post_id = params?.['post_id'];
      console.log(this.post_id);
      // this.onUserDetails()
      this.getProfile();

    })
  }
  goBack(){
    this.commonService.goBack();
  }
  onUserDetails(){
    this.service.get({post_id:this.post_id},`${API_ROUTES.Post.postDetail}`).pipe().subscribe((res:any)=>{
      this.details = res.result;
      if(this.details.Auth && this.details.Auth.CompanyInfo && this.details.Auth.CompanyInfo.company_name.toLowerCase() == this.profileDetails.company_name.toLowerCase()){
        this.details['editlist'] = true;
      } 
      else{
        this.details['editlist'] = false;
      }
      if(this.details.Media && this.details.Media.length > 0){
        this.details.slides = [];
      for(let j=0;j<this.details.Media.length;j++){
        let slide = {
          url:this.details.Media[j].url,
          type: '',
          download: ''
        }
        if(this.details.Media[j].media_type.toLowerCase().includes('image')){
          slide.type = 'image';
          this.details.slides.push(slide);
        }
        else if(this.details.Media[j].media_type.toLowerCase().includes('video')){
          slide.type = 'video';
          this.details.slides.push(slide);
        }
        else {
          slide.type = 'pdf';
          slide.url = 'assets/images/homePdf.png';
          slide.download = this.details.Media[j].url
          this.details.slides.push(slide);
        }
      }
      }
      
      
      console.log(this.details)
    })
  }

  
  getAllCommentByPostId(data:any){
    var requestBody={
      post_id:data
    }
    this.service.get(requestBody,`${API_ROUTES.Post.postCommentList}`).pipe().subscribe((res)=>{
      if(res.success){
       this.commentList=res.result;
       this.commentList.forEach((el:any)=>{
        if(el && el.Auth && el.Auth.CompanyInfo && el.Auth.CompanyInfo.company_name &&
           el.Auth.CompanyInfo.company_name.toLowerCase() == this.profileDetails.company_name.toLowerCase()){
            el['edit'] = true;
           }
           else {
            el['edit'] = false;
           }
        if(el && el.commentReply && el.commentReply.length>0){
          el.commentReply.forEach((item:any)=>{
            if(item && item.Auth && item.Auth.CompanyInfo && item.Auth.CompanyInfo.company_name &&
              item.Auth.CompanyInfo.company_name.toLowerCase() == this.profileDetails.company_name.toLowerCase()){
                item['edit'] = true;
              }
              else {
                item['edit'] = false;
              }
          })
        }
       })
       console.log(this.commentList);
       
      }else{

      }
    },
    (error)=>{
      this.toastr.error(error.message);
    })
  }

  getProfile(){
    this.service.get({},`${API_ROUTES.More.moreDetails}`).pipe().subscribe((res)=>{
      this.profileDetails = res.result[0];
      console.log(this.profileDetails)
      this.getAllCommentByPostId(this.post_id);
      this.onUserDetails();
      
    })
  }

  openReply(index:any){
    this.showReply[index] = !this.showReply[index]
  }

  ReplyComment(event:any,data:any,index:any){
    
    this.commentList.forEach(val=>{
      if(val.id==data){
        if( this.isReply==false){
          this.isReply=true;
        }else{
          this.isReply=false;
        }
      }
    });
  }

  report(data:any,type:any){
    // const dialogRef = this.dialog.open(DeleteComponent, {
    //   maxHeight: '100vh',
    //   width:'465px',
    //   // panelClass:'yespost',
    //   data: {
    //     img:'assets/images/reporticon.svg',
    //     heading:'Are you Sure want to Report this Post',
    //     report:'Yes, Report',
    //     cancel:'Go, back'
    //   }
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if(result){
        const dialogRef = this.dialog.open(ReportComponent, {
          maxHeight: '100vh',
          width:'490px',
          // panelClass:'yespost',
        });
        dialogRef.afterClosed().subscribe(reportData => {
          console.log('The dialog was closed', reportData);
          if(reportData.result == true){
            let requestBody;
            if(type == 1){
              requestBody={
                type:'post',
                post_id:this.post_id,
                reported_by:this.profileDetails.Auth.id,
                content_created_by:data.Auth.id,
                reason_for_report: reportData.reportData
    
               }
            }
            else {
              requestBody={
                type:'comment',
                comment_id:data.id,
                reported_by:this.profileDetails.Auth.id,
                content_created_by:data.Auth.id,
                reason_for_report: reportData.reportData
    
               }
            }
            
             this.service.post(requestBody,`${API_ROUTES.MyRequirements.report}`,{}).subscribe((res)=>{
             
               },
               (error)=>{
                this.toastr.error(error.message);
               })
          }
             
              
              
  })
  //     }
  // })
}

  delete(id:any){
    const dialogRef=this.dialog.open(EditPopupComponent,{
      maxHeight: '100vh',
      width:'465px',
      data: {
        img:'assets/images/Delete.png',
        heading:'Hey, do you really want to delete this post?',
        para:'Lorem Ipsum is simply dummy text of the printing text of the printing. ',
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
       this.router.navigate(['/main/home']);
      },(error)=>{
        this.toastr.error(error.message)
      })
    });
  }

  sendReplyComment(PostId:any,commentId:any,index:any){
    
    var requestBody={
    post_id:PostId,
    comment_id:commentId,
    comment_text:this.replyComment[0],
    }
    if(requestBody.comment_text.trim()!=''||requestBody.comment_text.trim()!=""){
    this.service.post(requestBody,`${API_ROUTES.Post.replyComment}`,{}).pipe().subscribe((res)=>{
      if(res.success){
        this.comment = '';
        this.replyComment[index] = '';
        this.showReply[index] = !this.showReply[index]
        //this.toastr.success(res.message);
        // this.onUserDetails();
        this.getAllCommentByPostId(this.post_id);
      }else{
    
      }
    })
    }else{
    alert("Please enter the comment");
    }
      }

      sendComment(){
        console.log(this.comment);
        if(this.commentEdit){
          let requestBody = {
            post_id:this.post_id,
    comment_id:this.commentId,
    comment_text:this.comment
          }
          if(this.comment.trim()!=''||this.comment.trim()!=""){
            this.service.put(requestBody,{},`${API_ROUTES.Post.editComment}`).pipe().subscribe((res)=>{
              if(res.success){
                this.comment = '';
                this.commentEdit = false;
                this.commentId = null
                // this.toastr.success(res.message);
                this.getAllCommentByPostId(this.post_id);
              }else{
        
              }
            },
            (error)=>{
              this.toastr.error(error.message);
            })
          }else{
            console.log("Please enter the comment");
          }
        }
        else {
          let requestBody={
            post_id:this.post_id,
            comment_text:this.comment,
            status:1
          }
          if(this.comment.trim()!=''||this.comment.trim()!=""){
            this.service.post(requestBody,`${API_ROUTES.Post.postComment}`,{}).pipe().subscribe((res)=>{
              if(res.success){
                this.comment = '';
                // this.toastr.success(res.message);
                this.getAllCommentByPostId(this.post_id);
              }else{
        
              }
            },
            (error)=>{
              this.toastr.error(error.message);
            })
          }else{
            console.log("Please enter the comment");
          }
        }
      }

      hitLike(data:any){
      
        var requestBody={
          post_id:data
        }
        this.service.post(requestBody,`${API_ROUTES.Post.likePost}`,{}).pipe().subscribe((res)=>{
          if(res.success){
            this.onUserDetails();
        this.getAllCommentByPostId(this.post_id);
          }
          else{
    
          }
        
        },
        (error)=>{
          this.toastr.error(error.message);
        })
      }
      
      eidtComment(data:any){
        this.commentEdit = true;
        this.commentId = data.id
        this.comment = data.comment_text
        console.log(this.comment);
        
      }

      deleteComment(data:any){
        const dialogRef = this.dialog.open(DeleteComponent, {
          maxHeight: '100vh',
          width:'465px',
          // panelClass:'yespost',
          data: {
            img:'assets/images/Delete.png',
            heading:'Are you Sure want to Delete this Comment?',
            report:'Yes, Delete',
            cancel:'Go, back'
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          if(result){
            let requestBody={
              post_id:this.post_id,
              comment_id:data.id
            }
            this.service.delete(requestBody,`${API_ROUTES.Post.deleteComment}`).pipe().subscribe((res)=>{
              if(res.success){
                // this.comment = '';
                // this.toastr.success(res.message);
                this.getAllCommentByPostId(this.post_id);
              }else{
        
              }
            },
            (error)=>{
              this.toastr.error(error.message);
            })
          }
      })
      }

  hitLikeComment(data:any){
    
    let requestBody={
      post_comment_id:data
    }
    this.service.post({},`${API_ROUTES.Post.likeComment}`,requestBody).pipe().subscribe((res)=>{
      if(res.success){
        this.onUserDetails();
        this.getAllCommentByPostId(this.post_id);
      }else{

      }
    })
  }

  shareHome(id:any){
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
      let requestBody={
        post_id:id
      }
     
    this.service.post(requestBody,`${API_ROUTES.Post.sharepost}`,{}).pipe().subscribe((res)=>{
      if(res.success){
        this.toastr.success(res.message);
        this.onUserDetails();
        this.getAllCommentByPostId(this.post_id);
      }else{
        this.toastr.error(res.message);
      }
    },
    (error)=>{
      this.toastr.error(error.message);
    })
       }
      })
 
  }

  edit(id:any){
    this.router.navigate(['/main/home/create-new-post'],{queryParams: {id:id}});
  }

  viewImage(url:any){
    //if(type){
      const dialogRef=this.dialog.open(ViewImageComponent,{
        width:'100%',
        height:'80vh',
        panelClass:'resetPassword',
        data: {
          img:url
        }
      })
    //}
  }

  
}
