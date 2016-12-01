'use strict';

/* eslint-disable */

module.exports = function (orgId) {
  // '-- OUTER QUERY DEALS WITH ORGANISATION DETAILS, PRIMARY USER',
  // '-- ORGANISATION TAGS',
  // '-- SUB QUERY GETS ALL ACTIVE CHALLENGES RELATED TO GIVEN ORG',
  return [
    'SELECT',
    'organisations.id as org_id, organisations.name as org_name, organisations.logo_url as org_logo_url, organisations.mission_statement as org_mission_statement,',
    'people.id as primary_id, people.first_name as primary_first_name, people.last_name as primary_last_name, people.email as primary_email, people.phone as primary_phone, people.job_title as primary_job_title,',
    'tags.name as org_tag_name, tags.id as org_tag_id,',
    'chal.chal_title as challenge_title, chal.chal_description as challenge_description, chal.tag_name as challenge_tag_name, chal.tag_id as challenge_tag_id, chal.chal_id as challenge_id',
    'FROM (',
      'SELECT challenges.title as chal_title, challenges.id as chal_id, challenges.description as chal_description, tags.name as tag_name, tags.id as tag_id',
      'FROM challenges',
      'JOIN tags_challenges',
      'ON challenges.id = tags_challenges.challenges_id',
      'JOIN tags ON tags_challenges.tags_id = tags.id',
      'WHERE challenges.org_id = ' + orgId,
      'AND tags.active = true AND challenges.active = true',
    ') as chal',
    'RIGHT OUTER JOIN organisations',
    'ON organisations.active = true',
    'LEFT OUTER JOIN people ON organisations.id = people.org_id AND people.user_type = \'primary\' AND people.active = true AND people.account_activated = true',
    'LEFT OUTER JOIN tags_organisations ON tags_organisations.organisations_id = ' + orgId,
    'LEFT OUTER JOIN tags ON tags_organisations.tags_id = tags.id',
    'WHERE organisations.id = ' + orgId,
    ';'
    // -- WHEN WE JOIN THE INNER AND THE OUTER, WE GET 'REPEATED' RESULTS
    // so some filtering will be necessary
  ].join(' ');
}

/*
SELECT
organisations.id as org_id, organisations.name as org_name, organisations.logo_url as org_logo_url, organisations.mission_statement as org_mission_statement,
people.id as primary_id, people.first_name as primary_first_name, people.last_name as primary_last_name, people.email as primary_email, people.phone as primary_phone, people.job_title as primary_job_title,
tags.name as org_tag_name, tags.id as org_tag_id,
chal.chal_title as challenge_title, chal.chal_description as challenge_description, chal.tag_name as challenge_tag_name, chal.tag_id as challenge_tag_id, chal.chal_id as challenge_id
FROM (
  SELECT challenges.title as chal_title, challenges.id as chal_id, challenges.description as chal_description, tags.name as tag_name, tags.id as tag_id
  FROM challenges
  JOIN tags_challenges
  ON challenges.id = tags_challenges.challenges_id
  JOIN tags ON tags_challenges.tags_id = tags.id
  WHERE challenges.org_id = 2
  AND tags.active = true AND challenges.active = true
) as chal
RIGHT OUTER JOIN organisations
ON organisations.active = true
LEFT OUTER JOIN people ON organisations.id = people.org_id AND people.user_type = 'primary' AND people.active = true AND people.account_activated = true
LEFT OUTER JOIN tags_organisations ON tags_organisations.organisations_id = 2
LEFT OUTER JOIN tags ON tags_organisations.tags_id = tags.id
WHERE organisations.id = 2;


*/
