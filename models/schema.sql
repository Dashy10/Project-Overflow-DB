DROP DATABASE IF EXISTS project_overflow_db;
CREATE DATABASE project_overflow_db;

\c project_overflow_db


DROP TABLE IF EXISTS subjects CASCADE;

CREATE TABLE subjects
(subject_id SERIAL PRIMARY KEY,
  subject TEXT
);

DROP TABLE IF EXISTS documentation CASCADE;

CREATE TABLE documentation
(topic_id SERIAL PRIMARY KEY,
  main_topic TEXT,
  topic VARCHAR(255),
  url TEXT,
  main_tag int REFERENCES subjects(subject_id),
  rel_tag_one int REFERENCES subjects(subject_id),
  rel_tag_two int REFERENCES subjects(subject_id)
);

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users
(user_id SERIAL PRIMARY KEY,
  username TEXT,
  date_added timestamp default now(),
  password TEXT,
  email VARCHAR(255)
);

DROP TABLE IF EXISTS questions CASCADE;

CREATE TABLE questions
(qquestion_id SERIAL PRIMARY KEY,
qdate_added timestamp default now(),
question TEXT,
qtopic_id int REFERENCES subjects(subject_id) ON DELETE CASCADE,
question_sub TEXT,
quser_id int REFERENCES users(user_id)
 );

DROP TABLE IF EXISTS answers CASCADE;

CREATE TABLE answers
(answer_id SERIAL PRIMARY KEY,
  aquestion_id int REFERENCES questions(qquestion_id) ON DELETE CASCADE,
  atopic_id int REFERENCES subjects(subject_id),
  auser_id int REFERENCES users(user_id),
  answer TEXT,
  adate_added timestamp default now()
);
