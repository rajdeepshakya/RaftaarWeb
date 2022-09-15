importScripts('https://www.gstatic.com/firebasejs/7.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.2.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyB-PX0tXX7JIfdADnobz5z9k9sF4v9z4ws",
    authDomain: "testapp-b16e4.firebaseapp.com",
    databaseURL: "https://testapp-b16e4-default-rtdb.firebaseio.com",
    projectId: "testapp-b16e4",
    storageBucket: "testapp-b16e4.appspot.com",
    messagingSenderId: "448481283827",
    appId: "1:448481283827:web:06efad4a3f4def224b3186",
    measurementId: "G-R1JX8LM809"
});
if (!firebase.apps.length) {
  firebase.initializeApp({
    'messagingSenderId': '448481283827'
  });
}else {
  firebase.app(); // if already initialized, use that one
}


// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.

self.addEventListener('notificationclick', function(event) {
    let url;
    let orderId;
    // console.log("clicked", event)
    if(event.notification.body==''){
      if('FCM_MSG' in event.notification.data)
      orderId = event.notification.data.FCM_MSG.data.order_id;
      else if(event.notification.data.id == 'orders')
      orderId = event.notification.data.order_id;
      url = 'https://splint.pomoandco.com/orders/';
    }
    else{
      url = 'https://splint.pomoandco.com/settings/';
    }
    event.notification.close(); // Android needs explicit close.
    event.waitUntil(
        clients.matchAll({type: 'window'}).then( windowClients => {
            // If not, then open the target URL in a new window/tab.
            if (clients.openWindow) {
              if(event.notification.body==''){
                  return clients.openWindow('devicetoken?deviceid='+devicetoken,deviceid);
              }
              else if('FCM_MSG' in event.notification.data){
                if(event.notification.data.FCM_MSG.data.notification_type == "coupon"){
                  return clients.openWindow('discounts');
                }
              }
              else if('notification_type' in event.notification.data){
                if(event.notification.data.notification_type == "coupon"){
                  return clients.openWindow('discounts');
                }
              }
              else{
                  return clients.openWindow('notification');
              }
            }
        })
    );
  });
const messaging = firebase.messaging();