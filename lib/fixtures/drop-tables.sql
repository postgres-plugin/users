-- Delete table
DROP TABLE IF EXISTS tags_organisations CASCADE;
DROP TABLE IF EXISTS people CASCADE;
DROP TABLE IF EXISTS organisations CASCADE;

-- Delete trigger
DROP TRIGGER IF EXISTS toggleOrgUsers on organisations;
