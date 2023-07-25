CREATE DATABASE IF NOT EXISTS toonsql
DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE toonsql;

CREATE TABLE IF NOT EXISTS user(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL,
name VARCHAR(255) NOT NULL,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS feed(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
image_id INT,
content LONGTEXT,
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS file(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
original_name VARCHAR(255) NOT NULL,
file_path VARCHAR(255) NOT NULL,
file_size INT NOT NULL,
file_title VARCHAR(255) NOT NULL,
file_owner INT NOT NULL,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS toon(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
original_name VARCHAR(255) NOT NULL,
toon_path VARCHAR(255) NOT NULL,
toon_size INT NOT NULL,
toon_title VARCHAR(255) NOT NULL,
toon_owner INT NOT NULL,
toon_view INT DEFAULT 0,
toon_episode INT DEFAULT 0,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS thumbnail(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
original_name VARCHAR(255) NOT NULL,
thumbnail_path VARCHAR(255) NOT NULL,
thumbnail_size INT NOT NULL,
thumbnail_title VARCHAR(255) NOT NULL,
thumbnail_owner INT NOT NULL,
thumbnail_episode INT DEFAULT 0,
thumbnail_toon_title VARCHAR(255) NOT NULL,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

# Debug queries
USE toonsql;

SELECT * FROM user;
SELECT * FROM feed;
SELECT * FROM file;
SELECT * FROM toon;
SELECT * FROM thumbnail;

# DROP table user;
# DROP table feed;
# DROP table file;
# DROP table toon;
# DROP table thumbnail;

## Test queries

# INSERT INTO files (original_name, file_path, file_size) VALUES ('aaa', 'here', 899);
# UPDATE files SET original_name = "qqq", file_size = 12312, file_title = "qqq" WHERE id = 1;
# UPDATE files SET file_view = file_view + 1 WHERE id = 1;
# SELECT LAST_INSERT_ID(); 
# SELECT * FROM thumbnail WHERE thumbnail_toon_title = thumb_1;
UPDATE toon SET toon_episode = 2 WHERE id = 5;