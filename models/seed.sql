\c project_overflow_db


INSERT INTO subjects(subject)
  VALUES
  ('javascript'),
  ('express'),
  ('react'),
  ('node.js');

INSERT INTO documentation(topic,url,main_tag,rel_tag_one,rel_tag_two)
    VALUES
  ('javascript','https://developer.mozilla.org/en-US/search?q=JAVASCRIPT&topic=apps&topic=html&topic=css&topic=js&topic=api&topic=canvas&topic=svg&topic=webgl&topic=mobile&topic=webdev&topic=http&topic=webext',1,3,4),
  ('node.js','https://developer.mozilla.org/en-US/search?q=Node.js&topic=api&topic=css&topic=canvas&topic=html&topic=http&topic=js&topic=mobile&topic=apps&topic=svg&topic=webdev&topic=webext&topic=webgl',4,1,2),
  ('express','https://developer.mozilla.org/en-US/search?q=Express.js&topic=api&topic=css&topic=canvas&topic=html&topic=http&topic=js&topic=mobile&topic=apps&topic=svg&topic=webdev&topic=webext&topic=webgl',2,4,1);

INSERT INTO documentation(topic,url,main_tag,rel_tag_one)
    VALUES
  ('react','https://facebook.github.io/react/docs/state-and-lifecycle.html',3,1);


INSERT INTO questions(question,topic_id)
    VALUES
  ('What is JavaScript?',1),
  ('What really is JavaScript?',1),
  ('What is Express?',2);

INSERT INTO answers(question_id,answer)
    VALUES
  (1, 'JavaScript is a programming language dude'),
  (1, 'this is another answer for the first javascript question'),
  (2, 'JavaScript is really a programming language dude'),
  (3, 'Express is a framework for node.js dude');
