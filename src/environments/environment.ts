// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  
 firebaseConfig : {
    apiKey: "AIzaSyDLDz_qpZvAMCKcsp2CP6lntsGG4bS_N8w",
    authDomain: "inventario-ad-c44fe.firebaseapp.com",
    projectId: "inventario-ad-c44fe",
    storageBucket: "inventario-ad-c44fe.firebasestorage.app",
    messagingSenderId: "865099923153",
    appId: "1:865099923153:web:084884052fb450d8834ff0",
    measurementId: "G-T5B0JH1X2Q"
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
