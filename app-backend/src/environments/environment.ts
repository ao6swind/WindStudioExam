export const environment = {
  production: false,
  useFirebase: false,
  host: 'http://localhost:4200/assets/sample',
  api: {
    exam: {
      list: 'exam/list.json',
      get: 'exam/get.json'
    },
    question: {
      list: 'question/list.json',
      get: 'question/get.json'
    },
    tag: {
      list: 'tag/list.json'
    }
  },
  firebase: {
    apiKey: "SET_YOUR_API_KEY_HERE",
    authDomain: "SET_YOUR_AUTH_DOMAIN_HERE",
    projectId: "SET_YOUR_PROJECT_ID_HERE",
    storageBucket: "SET_YOUR_STOREAGE_BUCKET_HERE",
    messagingSenderId: "SET_YOUR_MESSAGING_SENDER_ID_HERE",
    appId: "SET_YOUR_APP_ID_HERE",
    measurementId: "SET_YOUR_MEASUREMENT_ID_HERE"
  }
};