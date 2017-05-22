DROP DATABASE IF EXISTS project_overflow_db;
CREATE DATABASE project_overflow_db;

\c project_overflow_db

DROP TABLE IF EXISTS documentation;

CREATE TABLE documentation
(topic_id SERIAL PRIMARY KEY,
  topic VARCHAR(255),
  url TEXT

);

DROP TABLE IF EXISTS questions;

CREATE TABLE questions
(question_id SERIAL PRIMARY KEY,
date_added timestamp default now(),
question TEXT,
user_id int,
topic_id int
 );

DROP TABLE IF EXISTS answers;

CREATE TABLE answers
(answer_id SERIAL PRIMARY KEY,
  question_id int,
  user_id int,
  answer TEXT,
  date_added timestamp default now()
);

DROP TABLE IF EXISTS users;

CREATE TABLE users
(user_id SERIAL PRIMARY KEY,
  username TEXT,
  date_added timestamp default now(),
  password TEXT,
  email VARCHAR(255)
);
