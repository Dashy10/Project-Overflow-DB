\c project_overflow_db


INSERT INTO subjects(subject)
  VALUES
  ('javascript'),
  ('express'),
  ('react'),
  ('node.js');

INSERT INTO documentation(topic,url,main_tag,rel_tag_one,rel_tag_two)
    VALUES
  ('Javascript closures','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures',1,3,4),
  ('Javascript "this" keyword','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this',1,3,4),
  ('Javascript callback functions','https://developer.mozilla.org/en-US/docs/Mozilla/js-ctypes/Using_js-ctypes/Declaring_and_Using_Callbacks',1,3,4),
  ('Javascript objects','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object',1,3,4),
  ('Javascript prototypes','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype',1,3,4),
  ('node.js official documentation','https://nodejs.org/en/docs/guides/',4,1,2),
  ('Express official documentation','https://expressjs.com/en/guide/routing.html',2,4,1),
  ('Writing Middleware for Express','https://stormpath.com/blog/how-to-write-middleware-for-express-apps',2,4,1);

INSERT INTO documentation(topic,url,main_tag,rel_tag_one)
    VALUES
  ('React tutorial','https://facebook.github.io/react/tutorial/tutorial.html',3,1),
  ('React official documentation','https://facebook.github.io/react/docs/hello-world.html',3,1);


INSERT INTO questions(question,topic_id)
    VALUES
  ('What is JavaScript?',1),
  ('What really is JavaScript?',1),
  ('What is Express?',2);

INSERT INTO answers(qquestion_id,answer,qtopic_id)
    VALUES
  (1, 'JavaScript is a programming language dude',1),
  (1, 'this is another answer for the first javascript question',1),
  (2, 'JavaScript is really a programming language dude',1),
  (3, 'Express is a framework for node.js dude',2);
