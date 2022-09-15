import { Component } from '@angular/core';
import { MessagingService } from './services/messaging.service';
import { HttpClient  } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'raftaarr';
  message: any;
  ipAddress: any;
  constructor(private messagingService: MessagingService,
    private http:HttpClient){}

  ngOnInit() {
    this.messagingService.requestPermission()
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage
   }

}
