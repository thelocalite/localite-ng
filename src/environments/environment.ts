// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  authurl: 'http://localhost:9090',
  firebaseConfig: {

  },
  googleMapsKey: "AIzaSyA6T8LxCbD4STsVP36PGDXT8HKR_g1zrq8",
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
