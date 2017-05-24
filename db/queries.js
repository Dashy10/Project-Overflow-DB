var promise = require('bluebird');
var options = {
  promiseLib: promise
};
var pgp = require('pg-promise')();
var connString = process.env.DATABASE_URL;
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
createQuestion = (req,res,next) => {
  db.none('INSERT INTO questions(question, topic_id)' +
"values(${question}, ${topic_id})", req.body)
.then(function (data) {
    res.status(200)
      .json({
        status: 'success',
        data: data,
        message: 'Inserted one question'
      });
  })
  .catch(function (err) {
    return next(err);
  });
}

createAnswer = (req,res,next) => {
  db.none('INSERT INTO answers(answer, question_id)' +
  "values(${answer}, ${question_id})", req.body)
  .then(function (data){
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Inserted one answer'
    });
  })
  .catch(function(err){
    return next(err);
  });
}



// //////////Read////////////
/////////////////////////////
////////////////////////////

getAllQuestionsWithAnswersBySubject = (req,res,next) => {
  db.task(t => {
    var subject_id = parseInt(req.params.subject_id)
    console.log(subject_id);
    var topic_id = parseInt(req.params.topic_id)
    var q1 = t.one('SELECT * FROM subjects WHERE subject_id=$1',[subject_id])
    var q2 = t.any('SELECT * FROM questions WHERE topic_id=$1',[subject_id])
    var q3 = t.any('SELECT * FROM answers WHERE topic_id=$1',[subject_id])
    return t.batch([q1,q2,q3]);
  })
  .then(data => {
    console.log(data);
    res.status(200)
    .json({
      status: 'success',
      subject: data[0],
      question: data[1],
      answer: data[2],
    });
  })
  .catch(function(err){
    console.log(err);
    return next(err);
  })
}

getAllDocumentation = (req,res,next) => {
  db.any('SELECT * FROM documentation')
  .then(function(data){
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Success in querying all documentation'
    });
  })
  .catch(function(err){
    return next(err);
  });
};

getAllQuestions = (req,res,next) => {
  db.any('SELECT * FROM questions')
  .then(function(data){
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Success in querying all questions'
    });
  })
  .catch(function(err){
    return next(err);
  });
};

getOneQuestion = (req,res,next) => {
  var question_id = parseInt(req.params.question_id);
  db.one('SELECT * FROM questions WHERE question_id=$1', question_id)
  .then(function(data){
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'success in querying one question'
    });
  })
  .catch(function(err){
    return next(err);
  });
};

getAllAnswers = (req,res,next) => {
  db.any('SELECT * FROM answers')
  .then(function(data){
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Success in querying all answers'
    });
  })
  .catch(function(err){
    return next(err);
  });
};

getOneAnswer = (req,res,next) => {
  var answer_id = parseInt(req.params.answer_id)
  db.one('SELECT * FROM answers WHERE answer_id=$1', answer_id)
  .then(function(data){
    res.status(200)
    .json({
      status: 'Success',
      data: data,
      message: 'Success in querying one answer'
    });
  })
  .catch(function(err){
    return next(err);
  });
};

/////////Update////////////
///////////////////////////
//////////////////////////
//////////////////////////
updateQuestion = (req,res,next) => {
  db.none('UPDATE questions SET question=$1, topic_id=$2',
  [req.body.question, req.body.topic_id])
  .then(function(){
    res.status(200)
    .json({
      status: 'success',
      message: 'updated question'
    });
  })
  .catch(function(err){
    return next(err);
  });
}

updateAnswer = (req,res,next) => {
  db.none('UPDATE answers SET answer=$1, question_id=$2',
  [req.body.answer, req.body.question_id])
  .then(function(){
    res.status(200)
    .json({
      status: 'success',
      message: 'updated answer'
    });
  })
  .catch(function(err){
    return next(err);
  });
}


/////////Delete////////////
///////////////////////////
//////////////////////////
//////////////////////////

deleteAnswer = (req,res,next) => {
  var answer_id = parseInt(req.params.answer_id);
  db.result('DELETE FROM answers WHERE answer_id=$1', answer_id)
}




module.exports = {
  getAllDocumentation: getAllDocumentation,
  getAllQuestions: getAllQuestions,
  getOneQuestion: getOneQuestion,
  getAllAnswers: getAllAnswers,
  getOneAnswer: getOneAnswer,
  deleteAnswer: deleteAnswer,
  createQuestion: createQuestion,
  createAnswer: createAnswer,
  updateQuestion: updateQuestion,
  updateAnswer: updateAnswer,
  getAllQuestionsWithAnswersBySubject: getAllQuestionsWithAnswersBySubject,

};




// //Select the question(s) in questions table;
// and corresponding answers in answers table;
//  where question_id of answers table=question_id of questions table;
//   and where topic_id of questions table=topic_id of subjects table;
