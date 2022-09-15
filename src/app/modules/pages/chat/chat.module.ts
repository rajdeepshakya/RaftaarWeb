import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatNoMsgComponent } from './chat-no-msg/chat-no-msg.component';
import { ChatSayHelloComponent } from './chat-say-hello/chat-say-hello.component';
import { ChatMsgComponent } from './chat-msg/chat-msg.component';
import { ChatUserListComponent } from './chat-user-list/chat-user-list.component';
import { InputSearchComponent } from './input-search/input-search.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';


@NgModule({
  declarations: [
    ChatNoMsgComponent,
    ChatSayHelloComponent,
    ChatMsgComponent,
    ChatUserListComponent,
    InputSearchComponent,
  
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,FormsModule,
    PickerModule
  ]
})
export class ChatModule { }
