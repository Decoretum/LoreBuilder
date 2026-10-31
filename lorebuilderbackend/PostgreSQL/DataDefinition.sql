CREATE TABLE Accessory (
	name VARCHAR(20) NOT NULL,
	description TEXT NOT NULL,
	fileNames VARCHAR[]
);

ALTER TABLE Accessory
	ALTER COLUMN fileNames TYPE VARCHAR(50)[];

DROP  TABLE Accessory;
select * from Accessory;

-- Source - https://stackoverflow.com/a/18389184
-- Posted by Erwin Brandstetter, modified by community. See post 'Timeline' for change history
-- Retrieved 2026-10-31, License - CC BY-SA 4.0

SELECT 'CREATE DATABASE lorebuilder'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'lorebuilder')\gexec;

SELECT * FROM pg_database WHERE datname = 'lorebuilder';

-- Source - https://stackoverflow.com/a/769706
-- Posted by Mihai Limbășan, modified by community. See post 'Timeline' for change history
-- Retrieved 2026-10-31, License - CC BY-SA 4.0

SELECT *
FROM pg_catalog.pg_tables

-- Source - https://stackoverflow.com/a/14730638
-- Posted by vyegorov, modified by community. See post 'Timeline' for change history
-- Retrieved 2026-10-31, License - CC BY-SA 4.0

SELECT table_name
  FROM information_schema.tables
 WHERE table_schema='public'
   AND table_type='BASE TABLE';

Select 
* 
from information_schema.tables
WHERE 
table_schema='public'
AND table_catalog='lorebuilder'
AND table_type='BASE TABLE';

Select * frp
DISCONNECT ALL;
drop database lorebuilder;

show tables lorebuilder;