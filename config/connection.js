// connection to the database
const { connect, connection } = require('mongoose');
// connection string for mongodb
const connectionString = 'mongodb://127.0.0.1:27017/socialMediaDB';

connect(connectionString);

module.exports = connection;
