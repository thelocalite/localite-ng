import { env } from 'process';

// import { env } from '../../env.js';
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const environment = {
  production: false,
  authurl: 'http://localhost:9090',
  googleMapsKey: env.MAPS_API,
  firebaseConfig: {
    apiKey: "AIzaSyDd1Mnv3_a0qjGF3V0YgFcfglaYenPr8BM",
    authDomain: "the-localite-265418.firebaseapp.com",
    databaseURL: "https://the-localite-265418.firebaseio.com",
    projectId: "the-localite-265418",
    storageBucket: "the-localite-265418.appspot.com",
    messagingSenderId: "922098637906",
    appId: "1:922098637906:web:4266a7cecc7909c6d9538b",
    measurementId: "G-15J3QMD0JW"
  },
  // uploadUrl: 'http://localhost:3000/upload',
  uploadUrl: 'https://j0fw5osim7.execute-api.us-east-1.amazonaws.com/dev/upload',
  restAPIUrl: 'http://localhost:8080'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`,
 * `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a
 * negative impact on performance if an error is thrown.
 */
