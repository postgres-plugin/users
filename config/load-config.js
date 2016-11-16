'use strict';

/**
* Create default config or use the environment variables if defined
*/
var env = require('env2')('.env'); //eslint-disable-line


// DEFAULTS
var defaults = {
  port: 3000,
  pg: {
    user: process.env.PG_USER || 'postgres',
    database: process.env.PG_DATABASE || 'ce100',
    password: process.env.PG_PASSWORD || '',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
  }
};

// TEST
var test = {
  port: 0,
  pg: {
    user: 'postgres',
    database: 'ce100_test',
    password: '',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
  }
};

function setUpConfig () {
  if (process.env.NODE_ENV === 'test') {
    return test;
  }

  return defaults;
}

module.exports = setUpConfig;
