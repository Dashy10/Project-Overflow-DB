DROP DATABASE IF EXISTS project_overflow_db;
CREATE DATABASE project_overflow_db;

\c project_overflow_db


DROP TABLE IF EXISTS subjects;

CREATE TABLE subjects
(subject_id SERIAL PRIMARY KEY,
  subject TEXT
);

DROP TABLE IF EXISTS documentation;

CREATE TABLE documentation
(topic_id SERIAL PRIMARY KEY,
  topic VARCHAR(255),
  url TEXT,
  main_tag int REFERENCES subjects(subject_id),
  rel_tag_one int REFERENCES subjects(subject_id),
  rel_tag_two int REFERENCES subjects(subject_id)
);

DROP TABLE IF EXISTS users;

CREATE TABLE users
(user_id SERIAL PRIMARY KEY,
  username TEXT,
  date_added timestamp default now(),
  password TEXT,
  email VARCHAR(255)
);

DROP TABLE IF EXISTS questions;

CREATE TABLE questions
(question_id SERIAL PRIMARY KEY,
date_added timestamp default now(),
question TEXT,
user_id int REFERENCES users(user_id),
topic_id int REFERENCES subjects(subject_id)
 );

DROP TABLE IF EXISTS answers;

CREATE TABLE answers
(answer_id SERIAL PRIMARY KEY,
  question_id int REFERENCES questions(question_id),
  user_id int REFERENCES users(user_id),
  answer TEXT,
  date_added timestamp default now()
);
