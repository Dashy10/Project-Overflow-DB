// require bluebird
var promise = require('bluebird');
var options = {
  promiseLib: promise
};
// require pg-promise
var pgp = require('pg-promise')();
// this the database I'm working with
var connString = process.env.DATABASE_URL;
// store db in variable for methods
var db = pgp(connString);

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//////////// C.R.U.D Functionality////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

//////////////Create/////////////////
////////////////////////////////////
//////////////////////////////////

// create a question by inserting into the questions table the question, further organized
// by the question topic id
createQuestion = (req, res, next) => {
  db.none("INSERT INTO questions(question, qtopic_id, question_sub)" +
    "values(${question}, ${qtopic_id}, ${question_sub})",
  req.body).then(function(data) {
    res.status(200).json({status: 'success', message: 'Inserted one question'});
  }).catch(function(err) {
    return next(err);
  });
};

// create an answer by simply inserting into answers table the answer value
createAnswer = (req, res, next) => {
  db.none('INSERT INTO answers(answer,aquestion_id)' +
    "VALUES(${answer}, ${aquestion_id})",
  req.body).then(function(data) {
    res.status(200).json({status: 'success', data: data, message: 'Answer inserted'});
  }).catch(function(err) {
    return next(err);
  })
}

// //////////Read////////////
/////////////////////////////
////////////////////////////

// acquire all questions further organized by qtopic_id parameter, further organized by the
// the timestamp of the question in descending order
getALlQuestionsBySubject = (req, res, next) => {
  var question_sub = req.params.question_sub
  console.log('Whats this showing', req.params.question_sub);
  db.any('SELECT * FROM questions WHERE question_sub=$1 ORDER BY qdate_added DESC ', [question_sub]).then(data => {
    res.status(200).json({status: 'success', data: data});
  }).catch(function(err) {
    return next(err);
  })
}

// a compiled view table that acquires all questions with their corresponding answers
getAllQuestionsWithAnswers = (req, res, next) => {
  db.any('DROP VIEW IF EXISTS compiled; CREATE VIEW compiled AS SELECT * FROM questions, answers WHERE (questions.qquestion_id = answers.aquestion_id); SELECT * FROM compiled').then(data => {
    console.log('This is data ======>', data);
    res.status(200).json({status: 'success', data: data});
  }).catch(function(err) {
    return next(err);
  })
};

// a joined table that acquires all questions, with their answers, organized further by subject_id
// PLEASE TAKENOTE: Ran into serious issues here, posting to a joined table, and even a view table
// proved to be incredible difficult. I could only post if specifying qquestion_id
// couldn't solve that issue on the front end
getAllQuestionsWithAnswersBySubject = (req, res, next) => {

  var question_sub = req.params.question_sub;
  var subject_id = parseInt(req.params.subject_id)
  db.any('SELECT * FROM questions JOIN answers ON questions.qquestion_id = answers.aquestion_id WHERE question_sub=$1', [question_sub]).then(data => {
    console.log('This is data ======>', data);

    res.status(200).json({data: data});
  }).catch(function(err) {
    return next(err);
  })
};

// testing something out; a join with reverse logic to prior query
const findAnswers = (req, res, next) => {
  return db.any('SELECT * FROM answers JOIN questions ON answers.aquestion_id = questions.qquestion_id WHERE aquestion_id=$1', [req.params.qquestion_id]).then((data) => {
    res.json(data)
  }).catch((error) => {
    console.log('answers error: ', error)
  })
}

// using task + batch method, which allows one to return multiple queries in array format
// attempting to acquire only one question with corresponding answers by subject
// success in acquiring; once again trouble posting to this route
getOneQuestionWithAnswers = (req, res, next) => {
  db.task(t => {
    var qquestion_id = parseInt(req.params.qquestion_id)
    var q2 = t.any('SELECT * FROM questions WHERE qquestion_id=$1', [qquestion_id])
    var q3 = t.any('SELECT * FROM answers WHERE aquestion_id=$1', [qquestion_id])
    return t.batch([q2, q3]);
  }).then(data => {
    res.status(200).json({
      status: 'success',
      question: data[0],
      answer: data[1]
    });
  }).catch(function(err) {
    return next(err);
  })
};

// grabs all documentation in that table
getAllDocumentation = (req, res, next) => {
  db.any('SELECT * FROM documentation').then(function(data) {
    res.status(200).json({status: 'success', data: data, message: 'Success in querying all documentation'});
  }).catch(function(err) {
    return next(err);
  });
};

// organzied by topic javascript
getAllJavaScriptDocumentation = (req, res, next) => {
  db.any('SELECT * FROM documentation WHERE main_tag=1').then(function(data) {
    res.status(200).json({status: 'success', data: data, message: 'Success in querying all javascript documentation'});
  }).catch(function(err) {
    return next(err);
  });
};

// organized by topic node
getAllNodeDocumentation = (req, res, next) => {
  db.any('SELECT * FROM documentation WHERE main_tag=4').then(function(data) {
    res.status(200).json({status: 'success', data: data, message: 'Success in querying all node documentation'});
  }).catch(function(err) {
    return next(err);
  });
};

// organized by topic express
getAllExpressDocumentation = (req, res, next) => {
  db.any('SELECT * FROM documentation WHERE main_tag=2').then(function(data) {
    res.status(200).json({status: 'success', data: data, message: 'Success in querying all express documentation'});
  }).catch(function(err) {
    return next(err);
  });
};

// organized by topic react
getAllReactDocumentation = (req, res, next) => {
  db.any('SELECT * FROM documentation WHERE main_tag=3').then(function(data) {
    res.status(200).json({status: 'success', data: data, message: 'Success in querying all react documentation'});
  }).catch(function(err) {
    return next(err);
  });
};

// acquire all questions using simple SELECT; ordered by timestamp descending
getAllQuestions = (req, res, next) => {
  db.any('SELECT * FROM questions ORDER BY qdate_added DESC').then(function(data) {
    res.status(200).json({status: 'success', data: data, message: 'Success in querying all questions'});
  }).catch(function(err) {
    return next(err);
  });
};

// acquire one question based upon question id parameter
getOneQuestion = (req, res, next) => {
  var qquestion_id = parseInt(req.params.qquestion_id);
  db.one('SELECT * FROM questions WHERE qquestion_id=$1 ', qquestion_id).then(function(data) {
    res.status(200).json({status: 'success', data: data, message: 'success in querying one question'});
  }).catch(function(err) {
    return next(err);
  });
};

// acquire all answers; simple SELECT
getAllAnswers = (req, res, next) => {
  db.any('SELECT * FROM answers').then(function(data) {
    res.status(200).json({status: 'success', data: data, message: 'Success in querying all answers'});
  }).catch(function(err) {
    return next(err);
  });
};

// acquire a single answer predicated upon answer id parameter
getOneAnswer = (req, res, next) => {
  var answer_id = parseInt(req.params.answer_id)
  db.one('SELECT * FROM answers WHERE answer_id=$1', answer_id).then(function(data) {
    res.status(200).json({status: 'Success', data: data, message: 'Success in querying one answer'});
  }).catch(function(err) {
    return next(err);
  });
};

/////////Update////////////
///////////////////////////
//////////////////////////
//////////////////////////

// update a question predicated upon question and question id parameters
updateQuestion = (req, res, next) => {
  db.none('UPDATE questions SET question=$1 WHERE qquestion_id=$2', [req.body.question, req.params.qquestion_id]).then(function() {
    res.status(200).json({status: 'success', message: 'updated question'});
  }).catch(function(err) {
    return next(err);
  });
}

// update an answer predicated upon answer and aquestion_id parameters
updateAnswer = (req, res, next) => {
  db.none('UPDATE answers SET answer=$1, aquestion_id=$2', [req.body.answer, req.body.aquestion_id]).then(function() {
    res.status(200).json({status: 'success', message: 'updated answer'});
  }).catch(function(err) {
    return next(err);
  });
}

/////////Delete////////////
///////////////////////////
//////////////////////////
//////////////////////////

// delete an answer predicated upon answer id parameter
deleteAnswer = (req, res, next) => {
  var answer_id = parseInt(req.params.answer_id);
  db.result('DELETE FROM answers WHERE answer_id=$1', answer_id).then(function() {
    res.status(200).json({status: 'success', message: 'answer deleted'});
  }).catch(function(err) {
    return next(err);
  });
}

// delete a question predicated upon question id parameter
deleteQuestion = (req, res, next) => {
  var qquestion_id = parseInt(req.params.qquestion_id);
  db.result('DELETE FROM questions WHERE qquestion_id=$1', qquestion_id).then(function() {
    res.status(200).json({status: 'success', message: 'question deleted'});
  }).catch(function(err) {
    return next(err);
  });
}

// export all methods
module.exports = {
  createAnswer: createAnswer,
  getAllDocumentation: getAllDocumentation,
  getAllQuestions: getAllQuestions,
  getOneQuestion: getOneQuestion,
  getAllAnswers: getAllAnswers,
  getOneAnswer: getOneAnswer,
  deleteAnswer: deleteAnswer,
  findAnswers: findAnswers,
  createQuestion: createQuestion,
  updateQuestion: updateQuestion,
  updateAnswer: updateAnswer,
  getAllQuestionsWithAnswers: getAllQuestionsWithAnswers,
  getAllQuestionsBySubject: getALlQuestionsBySubject,
  getAllQuestionsWithAnswersBySubject: getAllQuestionsWithAnswersBySubject,
  getOneQuestionWithAnswers: getOneQuestionWithAnswers,
  getAllJavaScriptDocumentation: getAllJavaScriptDocumentation,
  getAllNodeDocumentation: getAllNodeDocumentation,
  getAllExpressDocumentation: getAllExpressDocumentation,
  getAllReactDocumentation: getAllReactDocumentation,
  getALlQuestionsBySubject: getALlQuestionsBySubject,
  deleteQuestion: deleteQuestion
};

// notes to myself (ignore)
// db.task(t => {
//   var subject_id = parseInt(req.params.subject_id)
//   var topic_id = parseInt(req.params.topic_id)
//   var date_added = (req.params.date_added)
//   var q1 = t.one('SELECT * FROM subjects WHERE subject_id=$1',[subject_id])
//   var q2 = t.any('SELECT * FROM questions WHERE topic_id=$1 ORDER BY date_added DESC',[subject_id])
//   var q3 = t.any('SELECT * FROM answers WHERE topic_id=$1 ORDER BY date_added DESC',[subject_id])
//   var dbArray = [q1,q2,q3]
//   return t.batch([...dbArray]);
// })
// db.task(t => {
//   var q1 = t.none('INSERT INTO questions(question, qtopic_id)' + "values(${question}, ${qtopic_id})", req.body)
//   var q2 = t.none('INSERT INTO answers(aquestion_id,atopic_id)' + "values(${aquestion_id}, ${atopic_id})",req.body)
//   t.batch([q1,q2])
// })

// createAnswer = (req,res,next) => {
//   db.none('INSERT INTO answers(answer,aquestion_id)' + "VALUES(${answer}, ${aquestion_id})", req.body)
//   .then(function(data){
//     res.status(200)
//     .json({
//       status: 'success',
//       data: data,
//       message: 'Answer inserted'
//     });
//   })
//   .catch(function (err) {
//     return next(err);
//   })
// }
