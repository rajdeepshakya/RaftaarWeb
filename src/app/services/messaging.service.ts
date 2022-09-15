import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject } from 'rxjs'
import { LocalStorageProvider } from 'src/app/services/storage/storage.service';
@Injectable()
export class MessagingService {
currentMessage = new BehaviorSubject(null);
constructor(private angularFireMessaging: AngularFireMessaging,private storageService:LocalStorageProvider) {
// this.angularFireMessaging.messaging.subscribe(
// (_messaging) => {
// _messaging.onMessage = _messaging.onMessage.bind(_messaging);
// _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
// }
// )
}
requestPermission() {
this.angularFireMessaging.requestToken.subscribe(
(token:any) => {
console.log(token);
sessionStorage.setItem('deviceToken',token)
},
(err) => {
console.error('Unable to get permission to notify.', err);
}
);
}
receiveMessage() {
this.angularFireMessaging.messages.subscribe(
(payload:any) => {
console.log("new message received. ", payload);
this.currentMessage.next(payload);
})
}
}