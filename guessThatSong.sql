-- create database or schema --
CREATE SCHEMA guessThatSong default character set utf8;

-- use the todoapp database --
use guessThatSong;

-- drop tables to restart
drop table guitar_heroes;
drop table pop;
drop table users;
drop table scores;

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

-- create users table and insert columns
create table IF NOT EXISTS users (
		user_id int not null auto_increment,
        username varchar(50),
        password varchar(50),
        email varchar(50),	
        image_key varchar(128),
        score int default 0,
        timestamp datetime,
		primary key (user_id)
);

create table IF NOT EXISTS scores (
		score_id int not null auto_increment,
        genre varchar(50),
        score int default 0,
        timestamp datetime,
        user_id int not null, -- the foreign key, reference to user's user_id
		primary key (score_id),
			constraint fk_userId -- can give any name you want, must be unique
            foreign key(user_id)
            references users(user_id)
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

-- users data -- 
INSERT into users (username, password, email, image_key, score, timestamp)
values ('misskay', sha1('misskay'), 'misskay@gmail.com', '1609739308046_cat.jpeg', 0, CURDATE());
INSERT into users (username, password, email, image_key, timestamp)
values ('wilma', sha1('wilma'), 'wilma@gmail.com', '0804616097393_pup.jpeg', CURDATE());

-- users data -- 
INSERT into scores (genre, score, timestamp, user_id)
values ('guitar_heroes', 3, CURDATE(), 1);

-- values ('', '', '', '', '', '')

-- see all rows from tables --
SELECT * FROM guitar_heroes;
SELECT * FROM guitar_heroes where artist='Jimi Hendrix';
SELECT * FROM pop;
SELECT * FROM users;	
SELECT * FROM scores;
SELECT * FROM users where user_id=2;

-- update user --
-- UPDATE users SET score=4 where username='misskay';
UPDATE users SET score=4 where username='mimi123';
UPDATE users SET score=4 where user_id=1;

-- UPDATE users SET score=4 where username='misskay' Error Code: 1175. You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column.  To disable safe mode, toggle the option in Preferences -> SQL Editor and reconnect.	0.00025 sec
-- UPDATE users SET score=4 where username='mimi123' Error Code: 1175. You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column.  To disable safe mode, toggle the option in Preferences -> SQL Editor and reconnect.	0.00026 sec

SELECT * FROM users where username = 'wilma';
