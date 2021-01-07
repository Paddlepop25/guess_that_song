-- create database or schema --
CREATE SCHEMA guessThatSong default character set utf8;

-- use the todoapp database --
use guessThatSong;

-- drop tables to restart
drop table songs;

-- create table and insert columns
create table IF NOT EXISTS songs (
		id int not null auto_increment,
        title varchar(50),
        preview_url varchar(255),
		artist varchar(50),
		image varchar(255),
        uri varchar(255),
        track_option1 varchar(50),
        track_option2 varchar(50),
        track_option3 varchar(50),
		primary key (id)
);
-- ('Slow Dancing in a Burning Room', 'Gravity', 'Your body is a wonderland'),

-- test data -- 
INSERT into songs (title, preview_url, artist, image, uri, track_option1, track_option2, track_option3)
values ('abc', 'preview_url@test.com', 'miss abc', 'image@test.com', 'abc:uriInfo123', 'title1', 'title2', 'title3');

-- see all rows from table --
SELECT * FROM songs;




