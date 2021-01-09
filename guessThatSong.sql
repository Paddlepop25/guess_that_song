-- create database or schema --
CREATE SCHEMA guessThatSong default character set utf8;

-- use the todoapp database --
use guessThatSong;

-- drop tables to restart
drop table guitar_heroes;

-- create songs table and insert columns
create table IF NOT EXISTS guitar_heroes (
		id int not null auto_increment,
        title varchar(50),
        preview_url varchar(255),
		artist varchar(50),
		image varchar(255),
        uri varchar(255),
        track_option1 varchar(128),
        track_option2 varchar(128),
        track_option3 varchar(128),
		primary key (id)
);

-- test data -- 
INSERT into guitar_heroes (title, preview_url, artist, image, uri, track_option1, track_option2, track_option3)
values ('abc', 'preview_url@test.com', 'miss abc', 'image@test.com', 'abc:uriInfo123', 'Slow Dancing in a Burning Room', 'Gravity', 'Your body is a wonderland');

-- create users table and insert columns
create table IF NOT EXISTS users (
		user_id int not null auto_increment,
        username varchar(50),
        password varchar(50),
        email varchar(50),
        image_key varchar(128),
        score tinyint(1) default '0',
        timestamp datetime,
		primary key (user_id)
);

-- test data -- 
INSERT into users (username, password, email, image_key, score, timestamp)
values ('misskay', sha1('misskay'), 'misskay@gmail.com', '1609739308046_cat.jpeg', 0, CURDATE());
INSERT into users (username, password, email, image_key, score, timestamp)
values ('wilma', sha1('wilma'), 'wilma@gmail.com', '0804616097393_pup.jpeg', 3, CURDATE());

-- see all rows from tables --
SELECT * FROM guitar_heroes;
SELECT * FROM users;


