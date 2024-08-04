
require('dotenv').config();

const { Pool } = require("pg");

// Again, this should be read from an environment variable
module.exports = new Pool({
  connectionString: process.env.CONNECTION_STRING
});
