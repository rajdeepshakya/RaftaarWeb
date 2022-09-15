import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatMsgComponent } from './chat-msg/chat-msg.component';
import { ChatNoMsgComponent } from './chat-no-msg/chat-no-msg.component';
import { ChatSayHelloComponent } from './chat-say-hello/chat-say-hello.component';
import { ChatUserListComponent } from './chat-user-list/chat-user-list.component';

const routes: Routes = [
  {
    path:'',
    component:ChatNoMsgComponent
  },
  {
    path:'chatHello',
    component:ChatSayHelloComponent
  },
  {
    path:'chatmsg',
    component:ChatMsgComponent
  },
  {
    path:'chatList',
    component:ChatUserListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
