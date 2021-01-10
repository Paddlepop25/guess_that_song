-- create database or schema --
CREATE SCHEMA guessThatSong default character set utf8;

-- use the todoapp database --
use guessThatSong;

-- drop tables to restart
drop table guitar_heroes;
drop table pop;

-- create guitar_heroes table and insert columns
create table IF NOT EXISTS guitar_heroes (
		id int not null auto_increment,
        artist varchar(50),
        title varchar(50),
        uri varchar(128),
        track_option1 varchar(50),
        track_option2 varchar(50),
        track_option3 varchar(50),
		primary key (id)
);

-- create pop table and insert columns
create table IF NOT EXISTS pop (
		id int not null auto_increment,
        artist varchar(50),
        title varchar(50),
        uri varchar(128),
        track_option1 varchar(50),
        track_option2 varchar(50),
        track_option3 varchar(50),
		primary key (id)
);

-- guitar_heroes data -- 
INSERT into guitar_heroes (artist, title, uri, track_option1, track_option2, track_option3)
values ('John Mayer', 'Slow Dancing in a Burning Room', 'spotify:track:2jdAk8ATWIL3dwT47XpRfu', 'Gravity', 'Daughters', 'Slow Dancing in a Burning Room' );

INSERT into guitar_heroes (artist, title, uri, track_option1, track_option2, track_option3)
values ('Eric Clapton', 'Tears in Heaven', 'spotify:track:612VcBshQcy4mpB2utGc3H', 'Change the World', 'Cocaine', 'Tears in Heaven');

INSERT into guitar_heroes (artist, title, uri, track_option1, track_option2, track_option3)
values ('Coldplay', 'Viva La Vida', 'spotify:track:1mea3bSkSGXuIRvnydlB5b', 'Viva La Vida', 'Clocks', 'Yellow');

INSERT into guitar_heroes (artist, title, uri, track_option1, track_option2, track_option3)
values ('Eagles', 'Hotel California - 2013 Remaster', 'spotify:track:40riOy7x9W7GXjyGp4pjAv', 'Desperado', 'Hotel California - 2013 Remaster', 'Witchy Woman');

INSERT into guitar_heroes (artist, title, uri, track_option1, track_option2, track_option3)
values ('Jimi Hendrix', 'Little Wing', 'spotify:track:40riOy7x9W7GXjyGp4pjAv', 'Purple Haze', 'Little Wing', 'Hey Joe');

INSERT into guitar_heroes (artist, title, uri, track_option1, track_option2, track_option3)
values ('Tommy Emmanuel', 'Angelina', 'spotify:track:0vaLIgHcJM3Fs3jxN9MxPm', 'Angelina', 'Monica', 'Julia');

SELECT * FROM guitar_heroes;

-- pop data -- 
INSERT into pop (artist, title, uri, track_option1, track_option2, track_option3)
values ('Michael Jackson', 'Billie Jean', 'spotify:track:5ChkMS8OtdzJeqyybCc9R5', 'Thriller', 'Billie Jean', 'Rock With You');

INSERT into pop (artist, title, uri, track_option1, track_option2, track_option3)
values ('James Blunt', "You're beautiful", 'spotify:track:0vg4WnUWvze6pBOJDTq99k', "You're Wonderful", "You're Awesome", "You're beautiful");

INSERT into pop (artist, title, uri, track_option1, track_option2, track_option3)
values ('Avril Lavigne', 'Complicated', 'spotify:track:5xEM5hIgJ1jjgcEBfpkt2F', 'Skater Boy', 'Suicide', 'Complicated');

INSERT into pop (artist, title, uri, track_option1, track_option2, track_option3)
values ('Adele', 'Rolling in the Deep', 'spotify:track:4OSBTYWVwsQhGLF9NHvIbR', 'Rolling in the Deep', 'Skyfall', 'Hello');

INSERT into pop (artist, title, uri, track_option1, track_option2, track_option3)
values ('Billy Joel', 'Uptown Girl', 'spotify:track:5zA8vzDGqPl2AzZkEYQGKh', 'Piano Man', 'Uptown Girl', 'Vienna');

INSERT into pop (artist, title, uri, track_option1, track_option2, track_option3)
values ('Bruno Mars', 'Marry You', 'spotify:track:6SKwQghsR8AISlxhcwyA9R', 'Grenade', 'Marry You', '24k Magic');

SELECT * FROM pop;

-- values ('', '', '', '', '', '')

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
SELECT * FROM guitar_heroes where artist='Jimi Hendrix';
SELECT * FROM pop;
SELECT * FROM users;
SELECT * FROM users where user_id=4;


