/**
 * Global variables injected by WEBPACK's definePlugin
 */
declare var BASENAME: string;
declare var GOOGLE_ANALYTICS: string;
declare var VERSION: string;
declare var BUILD_NUMBER: string;
declare var BUILD_ID: string;

declare interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    storageBucket: string;
    messagingSenderId: string;
}

declare var FIREBASE_CONFIG: FirebaseConfig;