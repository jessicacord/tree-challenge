var dotenv = require('dotenv').config();

module.exports = 
{
  "development": {
    "username": process.env.REACT_APP_DB_USERNAME,
    "password": process.env.REACT_APP_DB_PASSWORD,
    "database": "tree_challenge",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
  }
}

