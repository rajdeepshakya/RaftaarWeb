import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';
import { ToastrService } from 'ngx-toastr';
import { SharebyComponent } from '../shareby/shareby.component';
import { ShareComponent } from '../share/share.component';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DeleteComponent } from 'src/app/shared/dialogs/delete/delete.component';
import { CommonService } from 'src/app/services/common.service';


@Component({
  selector: 'app-mypost-list',
  templateUrl: './mypost-list.component.html',
  styleUrls: ['./mypost-list.component.scss']
})
export class MypostListComponent implements OnInit {
  replyComment: any = [];;
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
  myPostListDetails: any;
  show:boolean=false;
  page:number=1;
  count: number = 0;
  Size: number = 20;
  customOptions: OwlOptions = {
    loop: true,
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
  readMore:any=[];
  constructor(private loader:NgxUiLoaderService,private router:Router, private dialog:MatDialog, private activeRoute:ActivatedRoute, private service: ApiServicesService, private toastr:ToastrService,
    private commonService:CommonService) { }
  showdropdown(){
    this.isShow=!this.isShow
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if (pos == max) {
      this.Size = this.Size + 20;
      this.getMyProfileList();
    }
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
    // this.activeRoute.queryParams.subscribe((params) =>{
    //   this.post_id = params?.['post_id'];
    //   console.log(this.post_id);
    //   this.getMyProfileList();
    //   // this.onUserDetails()
    //   // this.getAllCommentByPostId(this.post_id);
    //   this.getProfile();

    // })
    this.getMyProfileList();
      this.getProfile();
  }

  goBack(){
    this.commonService.goBack();
  }

  getMyProfileList() {
    this.loader.start();
    let page={
      pageNo:this.page,
      size:this.Size
    }
    this.service.get(page,`${API_ROUTES.Post.createPostById}`).pipe().subscribe((res:any)=>{
      this.myPostListDetails = res.result;
      this.loader.stop();
      console.log(this.myPostListDetails);
      if(this.myPostListDetails.length === 0 || this.myPostListDetails==null){
        this.show=true
        }
        else {
          for(let i=0;i<this.myPostListDetails.length;i++){
            this.myPostListDetails[i].slides = [];
            if(this.myPostListDetails[i].content.length > 200){
              this.readMore[i] = false;
            }
            else {
              this.readMore[i] = true;
            }
            if(this.myPostListDetails[i].Media && this.myPostListDetails[i].Media.length >0){
              for(let j=0;j<this.myPostListDetails[i].Media.length;j++){
                let slide = {
                  url:this.myPostListDetails[i].Media[j].url,
                  type: ''
                }
                if(this.myPostListDetails[i].Media[j].media_type.toLowerCase().includes('image')){
                  slide.type = 'image';
                  this.myPostListDetails[i].slides.push(slide);
                }
                else if(this.myPostListDetails[i].Media[j].media_type.toLowerCase().includes('video')){
                  slide.type = 'video';
                  this.myPostListDetails[i].slides.push(slide);
                }
                else {
                  slide.type = 'pdf';
                  slide.url = 'assets/images/homePdf.png';
                  this.myPostListDetails[i].slides.push(slide);
                }
              } 
            }
          }
        }  
        console.log(this.myPostListDetails);
        
    })
  }

  hitLike(data:any){
      
    var requestBody={
      post_id:data
    }
    this.service.post(requestBody,`${API_ROUTES.Post.likePost}`,{}).pipe().subscribe((res)=>{
      if(res.success){
        this.getMyProfileList();
        this.toastr.success(res.message);
      }
      else{
        // this.toastr.error(res.message);
      }
    
    })
  }

  onview(data:any){
    // console.log(data,"daataaa")
    
    this.router.navigate(['/main/home/post-detail'],{queryParams:{post_id:data.id}})
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
        this.toastr.success(res.message);
        // this.getPost();
      }else{
        this.toastr.error(res.message);
      }
    })
       }
      })
  }


  onUserDetails(){
    this.service.get({post_id:this.post_id},`${API_ROUTES.Post.postDetail}`).pipe().subscribe((res:any)=>{
      this.details = res.result;
      
      console.log(this.details)
    })
  }

  getAllCommentByPostId(data:any){
    var requestBody={
      post_id:data
    }
    this.service.get(requestBody,`${API_ROUTES.Post.postCommentList}`).pipe().subscribe((res:any)=>{
      if(res.success){
       this.commentList=res.result;
      }else{

      }
    })
  }

  getProfile(){
    this.service.get({},`${API_ROUTES.More.moreDetails}`).pipe().subscribe((res:any)=>{
      this.profileDetails = res.result[0];
      console.log(this.profileDetails)
      
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

  sendReplyComment(PostId:any,commentId:any){
    
    var requestBody={
    post_id:PostId,
    comment_id:commentId,
    comment_text:this.replyComment[0],
    }
    if(requestBody.comment_text.trim()!=''||requestBody.comment_text.trim()!=""){
    this.service.post(requestBody,`${API_ROUTES.Post.replyComment}`,{}).pipe().subscribe((res:any)=>{
      if(res.success){
        this.comment = '';
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
        let requestBody={
          post_id:this.post_id,
          comment_text:this.comment,
          status:1
        }
        if(this.comment.trim()!=''||this.comment.trim()!=""){
          this.service.post(requestBody,`${API_ROUTES.Post.postComment}`,{}).pipe().subscribe((res:any)=>{
            if(res.success){
              this.comment = '';
              // this.toastr.success(res.message);
              this.getAllCommentByPostId(this.post_id);
            }else{
      
            }
          })
        }else{
          console.log("Please enter the comment");
        }
      }

  edit(id:any){
    this.router.navigate(['/main/home/create-new-post'],{queryParams: {id:id}});
  }

  delete(id:any){
    const dialogRef=this.dialog.open(DeleteComponent,{
      maxHeight: '100vh',
      width:'400px',
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
      this.service.delete(dataToDelete,API_ROUTES.Post.deletePost).pipe().subscribe((res =>{
        console.log(res);
        this.data = [];
       this.getMyProfileList()
      }))
    });
  }
}
