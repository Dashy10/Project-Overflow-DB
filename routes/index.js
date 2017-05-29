// require express w/ methods
var express = require('express');
// store express router method in the router variable
var router = express.Router();
// deal with cross-origin-issues
var cors = require('cors');
// require queries for routes
var db = require('../db/queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  // render home page
  res.render('index', { title: 'ProjectOverflow API Documentation' });
});

// DOCUMENTATION
// all the documentation stored on this route
router.get('/documentation', db.getAllDocumentation);
router.get('/documentation/javascript', db.getAllJavaScriptDocumentation);
router.get('/documentation/nodejs', db.getAllNodeDocumentation);
router.get('/documentation/express', db.getAllExpressDocumentation);
router.get('/documentation/react', db.getAllReactDocumentation);

// QUESTIONS
// all the questions are stored on this route
router.get('/questions', db.getAllQuestions);
// get all questions by subject
router.get('/questions/:qtopic_id', db.getAllQuestionsBySubject);
// // update one question based on its id
router.patch('/questions/:qquestion_id', db.updateQuestion);
// delete a question based on its id
router.delete('/questions/:qquestion_id', db.deleteQuestion);
// create a question
router.post('/questions',db.createQuestion);
// get all questions with answers
router.get('/QA',db.getAllQuestionsWithAnswers);
// get all questions with answers by subject
router.get('/QA/:question_sub',db.getAllQuestionsWithAnswersBySubject);
// get one question with answers
router.get('/QAS/:qquestion_id',db.getOneQuestionWithAnswers);


// // ANSWERS
// // all the answers in total are stored in this route
router.get('/answers/', db.getAllAnswers);
// get an answer based on its id
router.get('/answers/:answer_id', db.getOneAnswer);
// // post an answer that will be stored in this route
router.post('/answers', db.createAnswer);
// // delete one answer based on its id
router.delete('/answers/:answer_id', db.deleteAnswer);
// // update one answer based on its id
router.patch('/answers/:answer_id', db.updateAnswer);


// export all methods
module.exports = router;



// NOTES TO MOI

//WHEN YOU POST YOU NEED TO WRITE A NEW QID AND NEW AQ ID THAT MATCH
// YOU ALSO NEED TO WRITE IN A NEW ID THAT IS +1 TO THE OLD ID
//
// // QUESTIONS + ANSWERS ORGANIZED BY SUBJECT
// // get all the questions with all their corresponding answers organized by subject
// // post a question that will be stored in this route
// router.post('/questions',db.createQuestion);
// // get one question based on its id
// router.get('/questions/:qquestion_id', db.findAnswers);
// router.get('/QA',db.getAllQuestionsWithAnswersBySubject);
// router.patch('/QA/:subject_id/', db.createQuestion);
// // get one question with corresponding answers organized by subject
// router.get('/QAS/:question_id', db.getOneQuestionWithAnswersBySubject);
