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

// //////////Read////////////

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

getAllQuestionsWithAnswersBySubject = (req,res,next) => {

  .then(function(data){
    res.status(200)
    .json({
      
    });
  })
  .catch(function(err){
    return next(err);
  });
};

getOneQuestionWithAllAnswers = (req,res,next) => {

};

getAllAnswers = (req,res,next) => {
  db.one('SELECT * FROM subjects WHERE ')
};

getOneAnswer = (req,res,next) => {

};

// //////////Create//////
createQuestion = (req,res,next) => {
  db.none('INSERT INTO questions()')

};

createAnswer = (req,res,next) => {

};

// ////////Update//////
updateQuestion = (req,res,next) => {

};

updateAnswer = (req,res,next) => {

};

////////////Delete///////

deleteAnswer = (req,res,next) => {
  var answer_id = parseInt(req.params.answer_id);
  db.result('DELETE FROM answers where answer =$1',answer_id)

};

module.exports = {
  getAllDocumentation: getAllDocumentation,
  deleteAnswer: deleteAnswer,
};


// db.task (t => {
// t.batch([
// t.one(question)
// t.any(answers)
// ])
// .then(data =>{
//  res.status(200)
//    .json({
//      status: 'success'
//      question: data[0]
//      answers: data[1]
//    })
// })
//
// });
//
// };


// //Select all the question(s) in questions table;
// and corresponding answers in answers table;
//  where question_id of answers table=question_id of questions table;
//   and where topic_id of questions table=topic_id of subjects table;
