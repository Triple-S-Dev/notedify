const mongoose = require('mongoose');

module.exports = {
  connect: DB_HOST => {
    // Use the mongo driver's updated URL string parser
    mongoose.set('useNewUrlParser', true);
    // use findOneAndUpdate() in place of findAndModify()
    mongoose.set('useFindAndModify', false);
    // Use createIndex() in place of ensureIndex()
    mongoose.set('useCreateIndex', true);
    // Use the new server discovery and monitoring engine
    mongoose.set('useUnifiedTopology', true);
    // Connect to the DB
    mongoose.connect(DB_HOST);
    // Log on error if we fail to connect
    mongoose.connection.on('error', err => {
      console.log(err);
      console.log(
        'MongoDB connection error, Please make sure MongoDB is running'
      );
      process.exit();
    });
  },
  close: () => {
    mongoose.connection.close();
  }
};
