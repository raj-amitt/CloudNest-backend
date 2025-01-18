//firebase admin basically connects the express server with firebase
const Firebase= require('firebase-admin');
const serviceAccount = require('../drive-618ab-firebase-adminsdk-cqla5-b0b9ac9122')//name of the key that we downloaded and placed in gitignore, the json file we stored in the root folder of the drive app

const firebase = Firebase.initializeApp({
  credential: Firebase.credential.cert(serviceAccount),//requiring the credentials present in the json file for connecting the right file with the server
  storageBucket: 'drive-618ab.firebasestorage.app'//this is the bucket name that we get when we create the bucket on firebase
})
module.exports = Firebase;