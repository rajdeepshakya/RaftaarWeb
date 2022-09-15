// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseURl:'http://65.1.214.25:5040/api/v1',
  // baseURl:'http://13.233.181.134:5040/api/v1',

  
  firebase: {
    apiKey: "AIzaSyBjt18h_2tJEdEyTKfaHxDjD3Kymc4XtL0",
    authDomain: "raftaarr.firebaseapp.com",
    databaseURL: "https://raftaarr-default-rtdb.firebaseio.com",
    projectId: "raftaarr",
    storageBucket: "raftaarr.appspot.com",
    messagingSenderId: "608999845980",
    appId: "1:608999845980:web:3e434117a01dd7312c7699",
    measurementId: "G-HZ9KDL685B"
  }

  // const messaging = firebase.messaging();
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
