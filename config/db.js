const mongoose = require('mongoose');

function connectToDB() {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('connected to DB');
  })
  // value is recieved from the .env file from here mongo_uri
}
module.exports = connectToDB;
// exporting the above function connectToDB
