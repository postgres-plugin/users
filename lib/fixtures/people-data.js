'use strict';

/**
* Convert an array of people object to a sql insert command
*/

var escape = require('pg-escape');

module.exports = function (people) {
  var result = '';
  var values = '';

  if (people.length > 0) {
    values = people.map(function (p) {
      return '('
      + escape.literal(p.first_name) + ', '
      + escape.literal(p.last_name) + ', '
      + escape.literal(p.user_type) + ', '
      + escape.literal(p.email) + ', '
      + escape.literal(p.phone) + ', '
      + escape.literal(p.password) + ', '
      + p.org_id + ', '
      + escape.literal(p.job_title) + ', '
      + p.last_login + ', '
      + p.active + ', '
      + p.account_activated + ')';
    }).join(',');

    result = 'INSERT INTO people ('
      + 'first_name, '
      + 'last_name, '
      + 'user_type, '
      + 'email, '
      + 'phone, '
      + 'password, '
      + 'org_id, '
      + 'job_title, '
      + 'last_login, '
      + 'active, '
      + 'account_activated'
      + ') VALUES ' + values + ';';
  }

  return result;
};
