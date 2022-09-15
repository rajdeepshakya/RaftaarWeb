
import { Component, ElementRef, Input,Output, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database'
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Messagex } from 'src/app/message.templates';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { Roomx } from "src/app/room.templates";
import { EventEmitter } from 'stream';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { LocalStorageProvider } from 'src/app/services/storage/storage.service';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { UploadService } from 'src/app/services/upload.service';
@Component({
  selector: 'app-chat-say-hello',
  templateUrl: './chat-say-hello.component.html',
  styleUrls: ['./chat-say-hello.component.scss']
})
export class ChatSayHelloComponent implements OnInit {

  @ViewChild("messagesDiv") messagesDiv: ElementRef;
  constructor(
    public db: AngularFireDatabase,
    public api: ApiServicesService,
    private storageService:LocalStorageProvider, public upload: UploadService,
    private toastr:ToastrService,
  ) { }

  @Input() img = "";
  @Input() status = "";
  @Input() customClass = "";
  // @Input() title = "Card Title";
  @Input() name = "name";
  @Input() unmatched: boolean = false;
  @Input() selectedObj = {};
  // receivedData: any = {};
  @Input() user_type = "user_type";
  dataUser: any
  user_role: string = "";
  //@Output() public userEmitData = new EventEmitter();
  room: Roomx;
  roomId: any;
  test: any;
  authUserId: any;
  text: any;
  roomRef: any;
  subscription: Subscription;
  disableInputs = false;
  selectData: any
  createData: any;
  message = '';
  files:any = [];
  images: any=[];
  videos: any=[];
  pdf: any=[];
  showEmojiPicker = false;
  sets = [
    'native',
    'google',
    'twitter',
    'facebook',
    'emojione',
    'apple',
    'messenger'
  ]
  set = 'twitter';
  ngOnInit(): void {
    
    var data = sessionStorage.getItem('currentUser');
    this.test = data;
    var finalData= JSON.parse(this.test);
    this.dataUser=finalData.result;
    this.authUserId = this.dataUser?.CompanyInfo?.auth_id ? this.dataUser?.CompanyInfo?.auth_id : this.dataUser.id;
    this.user_role = this.dataUser.user_type;
    console.log("this.authUserId==========>", this.authUserId);
    // this.createRooms(this.authUserId);
    // this.createData = this.selectData?.room_id || this.selectData.id;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.createData = changes.selectedObj?.currentValue;
    this.selectData = this.createData?.auth_id || this.createData?.id
    if (changes.selectedObj != undefined && changes.selectedObj.currentValue != undefined) {
      let receivedData = changes.selectedObj.currentValue;
      let roomId = receivedData?.room_id || receivedData.auth_id;
      // let roomId= receivedData?.room_id ;
      console.log("receivedData==========>", receivedData);
      this.onConnectToRoomClick(roomId, receivedData.auth_id);
      console.log("receivedData==========>", receivedData.auth_id);
    }
  }

  onConnectToRoomClick(roomId: any, auth_id: any) {
    if (roomId || auth_id) {
      this.roomRef = this.db.object<Roomx>(roomId);
      this.subscription = this.roomRef.valueChanges().subscribe((f: any) => {
        console.log("Connection===>", f);
        if (!f) {
          this.room = new Roomx(roomId);
          this.roomRef.set(this.room);
        }
        else {
          this.room = f;
        }
        console.log("Connection MSG===>", this.room);
        this.disableInputs = true;
        setTimeout(() => this.scrollToBottom(), 1);
      });
    }
    else {
      console.log("error")
    }
  }

  scrollToBottom() {
    const div = this.messagesDiv.nativeElement;
    div.scrollTop = div.scrollHeight - div.clientHeight;
  }

  onSendClick() {
    
   // this.room = new Roomx("12345");
    if (this.room == undefined) {
      alert('Please select user');
      this.createRooms(this.selectData);
      console.log(this.selectData);
    }
    else {
      if (!this.room.messages) {
        this.room.messages = [];
      }
      console.log("this.room.messages===========>", this.room.messages);
      console.log("this.text=========>", this.message);
      this.room.messages.push(new Messagex(this.authUserId, this.message));
      console.log("this.room.messages=========>", this.room.messages);
      this.roomRef.update(this.room);
      this.message = '';
      console.log("this.roomRef=========>", this.roomRef);
    }
  }
  createRooms(selectData: any) {
    console.log(selectData);
    
    let senderId = this.storageService.getItem('UserId')
    console.log(senderId);
    
    let paramData = {
      sender_id:senderId,
      reciever_id:selectData.id
    };
   // this.onConnectToRoomClick("123", selectData);
    console.log("ffddddddffdfdf", paramData);
    this.api.post(paramData,`${API_ROUTES.chat.getRoomId}`,{}).pipe().subscribe((res)=>{
   // this.api.get(`public/room-id?id=${paramData.id}`, {}).pipe().subscribe((res) => {
        console.log("New room", res);
        console.log("New room to start chat", res.result.id);

        if (res.success) {
          this.onConnectToRoomClick(res.result.id, senderId);
        }
      });
  }
  toggled: boolean = false;
  handleSelection(event: any) {
    console.log(event.char);
    // let data = this.emojiForm.get('inputField');
    // data.patchValue(data.value + event.emoji.native)
  }
  toggleEmojiPicker() {
    console.log(this.showEmojiPicker);
        this.showEmojiPicker = !this.showEmojiPicker;
  }
  addEmoji(event:any) {
    console.log(this.message)
    const { message } = this;
    console.log(message);
    console.log(`${event.emoji.native}`)
    const text = `${message}${event.emoji.native}`;

    this.message = text;
    // this.showEmojiPicker = false;
  }

  onFocus() {
    console.log('focus');
    this.showEmojiPicker = false;
  }
  onBlur() {
    console.log('onblur')
  }



  SendFile(e: any) {
    debugger
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
      this.message=uploadedImage.Location;
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
}
