import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewComponent } from 'src/app/shared/dialogs/add-new/add-new.component';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { AddPostComponent } from 'src/app/shared/dialogs/add-post/add-post.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chat-user-list',
  templateUrl: './chat-user-list.component.html',
  styleUrls: ['./chat-user-list.component.scss']
})
export class ChatUserListComponent implements OnInit {
userList:any;
@Input() img = "";
  @Input() customClass="";
  // @Input() title = "Card Title";
  @Input() student:any;
  @Input() companyName:any;
  @Input() adminName:any;
  @Input() messages = 'messages';
  @Input() unmatched: boolean = false;

  @Input() user_type = "user_type";
  @Output() sendData = new EventEmitter();
  status:any
  chatId: any;
  constructor(private dialog:MatDialog , 
    private service: ApiServicesService,
    private router:Router,
    private toastr:ToastrService,
    private activeRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((params) =>{
      this.chatId = params?.['post_id'];
      // console.log(this.machineId)
     
    })
    this. getIntrestedUserList();
  }
  getIntrestedUserList(){
    var req={
      req_id:'7f07f64c-9490-4a17-8250-e81c87887467'
    }
    this.service.get(req,`${API_ROUTES.chat.intrestedUserList}`).pipe().subscribe((res)=>{
      if(res.success){
        this.userList = res.result;
      }else{

      }
     
      // if(res.result.Post!=null){
      //   this.data = res.result.Post;
      //   console.log(this.data,"dfghjkl");
      // }else if(res.result.Requirement!=null)
      // {
      //   this.data = res.result.Requirement;
      // }
      
    }
    )
  }
  sendId(obj:any,type:any){
    console.log(obj,'......chat person');
    
    this.sendData.emit(obj)
    console.log(obj)
    this.status = type
  }
}
