var express = require('express');
var router = express.Router();
var cors = require('cors');

var db = require('../db/queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
// // post a question that will be stored in this route
router.post('/questions',db.createQuestion);
// // get one question based on its id
router.get('/questions/:question_id', db.getOneQuestion);
// // update one question based on its id
router.patch('/questions/:question_id', db.updateQuestion);
//
//
// // QUESTIONS + ANSWERS ORGANIZED BY SUBJECT
// // get all the questions with all their corresponding answers organized by subject
router.get('/QA/:subject_id/', db.getAllQuestionsWithAnswersBySubject);
// // get one question with corresponding answers organized by subject
router.get('/QAS/:question_id', db.getOneQuestionWithAnswersBySubject);
//
//
// // ANSWERS
// // all the answers in total are stored in this route
router.get('/answers/', db.getAllAnswers);
router.get('/answers/:answer_id', db.getOneAnswer);
// // post an answer that will be stored in this route
router.post('/answers/', db.createAnswer);
// // delete one answer based on its id
router.delete('/answers/:answer_id', db.deleteAnswer);
// // update one answer based on its id
router.patch('/answers/:answer_id', db.updateAnswer);



module.exports = router;
