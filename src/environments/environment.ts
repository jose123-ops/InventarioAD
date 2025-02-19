// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  firebaseConfig: {
    apiKey: "AIzaSyDMoSbPaQqP5xHOwOZ7PAznXovyyHuTJjU",
    authDomain: "bodega-kouture.firebaseapp.com",
    projectId: "bodega-kouture",
    storageBucket: "bodega-kouture.firebasestorage.app",
    messagingSenderId: "675001682277",
    appId: "1:675001682277:web:85c3a37fc80ee7722bf98c",

  },
  apiBaseUrl: 'http://localhost:3000'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
