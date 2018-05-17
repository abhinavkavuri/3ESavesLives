var _this2 = this;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var answerObj = [{
  question: 'The closest star to Earth is how far away:',
  answers: ['1 light year', '1 AU', 'About 4 light years', 'About 4 AU'],
  correct: [1],
  messages: {
    pass: 'Correct. The closest star is the Sun!',
    fail: 'Sorry, but that is not correct. Don\'t forget about our Sun'
  }
}, {
  question: 'How many official moons does the Earth have:',
  answers: ['1', '2', '3', '4'],
  correct: [0],
  messages: {
    pass: 'Correct. While Earth has other "quasi-satellites" we officially only have the one moon.',
    fail: 'Sorry. While Earth does have other "quasi-satellites" we officially only have one moon.'
  }
}, {
  question: 'Which rocky planet in our solar system is hottest:',
  answers: ['Mercury', 'Venus', 'Earth', 'Mars'],
  correct: [1],
  messages: {
    pass: 'Correct. Venus is the hottest rocky planet due to it\'s thick atmosphere.',
    fail: 'Sorry. The correct answer is Venus.'
  }
}, {
  question: 'How many man-made objects have been sent to the surface Mars (successfully and unsuccessfully):',
  answers: ['2-5', '6-8', '9-13', '14+'],
  correct: [3],
  messages: {
    pass: 'Correct. 14 missions have tried to place objects on the surface of Mars, some of these missions contained multiple objects',
    fail: 'Sorry, the correct answer is 14+. 14 missions have tried to place objects on the surface of Mars, some of these missions contained multiple objects'
  }
}];

var ReactCSS = React.addons.CSSTransitionGroup;

var Controls = function Controls(_ref) {
  var currentQuestion = _ref.currentQuestion,
      userAnswers = _ref.userAnswers,
      parentMoveBack = _ref.parentMoveBack,
      numQuestions = _ref.numQuestions,
      parentMoveForward = _ref.parentMoveForward,
      parentFinishTest = _ref.parentFinishTest,
      finishedAnswering = _ref.finishedAnswering;


  return React.createElement(
    'div',
    null,
    currentQuestion > 0 ? React.createElement(
      'button',
      { className: 'btn', onClick: parentMoveBack, id: 'prev' },
      'Prev'
    ) : '',
    currentQuestion < numQuestions - 1 ? React.createElement(
      'button',
      { className: 'btn', onClick: parentMoveForward, id: 'next' },
      'Next'
    ) : '',
    !finishedAnswering && currentQuestion == numQuestions - 1 ? React.createElement(
      'p',
      null,
      'Please answer all question to continue'
    ) : ''
  );
};
Controls.propTypes = {
  currentQuestion: React.PropTypes.number.isRequired,
  numQuestions: React.PropTypes.number.isRequired,
  userAnswers: React.PropTypes.array.isRequired,
  parentMoveBack: React.PropTypes.func.isRequired,
  parentMoveForward: React.PropTypes.func.isRequired,
  parentFinishTest: React.PropTypes.func.isRequired,
  testForUndefined: React.PropTypes.func.isRequired
};

var ScoreArea = function (_React$Component) {
  _inherits(ScoreArea, _React$Component);

  function ScoreArea(props) {
    _classCallCheck(this, ScoreArea);

    var _this = _possibleConstructorReturn(this, (ScoreArea.__proto__ || Object.getPrototypeOf(ScoreArea)).call(this, props));

    _this.componentWillMount = function () {
      var userAnswers = _this.props.userAnswers;
      var userAnswerLen = userAnswers.length;
      var theQuestions = _this.props.allQuestions;
      var score = _this.state.score;
      var passFail = [];
      for (var i = 0; i < userAnswerLen; i++) {
        var correctAnswers = theQuestions[i].correct;
        var corrAnsLen = correctAnswers.length;
        passFail[i] = 'fail';
        for (var x = 0; x < corrAnsLen; x++) {

          if (theQuestions[i].correct[x] == userAnswers[i]) {
            score++;
            passFail[i] = 'pass';
          }
        }
      }

      _this.setState({
        score: score,
        passFail: passFail
      });
    };

    _this.render = function () {
      var theUserAnswers = _this.props.userAnswers;
      return React.createElement(
        'div',
        null,
        React.createElement(
          'p',
          { id: 'your-score-lab', className: 'score-p' },
          'Your Score Is: ',
          _this.state.score,
          ' / ',
          _this.props.allQuestions.length
        ),
        React.createElement(
          'table',
          null,
          React.createElement(
            'tbody',
            null,
            _this.props.allQuestions.map(function (question, i) {
              return React.createElement(
                'tr',
                null,
                React.createElement(
                  'td',
                  { className: 'result-question-num' },
                  React.createElement(
                    'p',
                    null,
                    i + 1
                  )
                ),
                React.createElement(
                  'td',
                  null,
                  React.createElement(
                    'div',
                    { className: 'feedback', key: question.answers[this.props.userAnswers[i]] + 'top-div' },
                    React.createElement(
                      'h4',
                      { key: question.answers[theUserAnswers[i]] + 'first-p' },
                      question.question
                    ),
                    React.createElement(
                      'p',
                      { key: question.answers[theUserAnswers[i]] + 'last-p', className: this.state.passFail[i] },
                      question.answers[theUserAnswers[i]]
                    ),
                    React.createElement(
                      'p',
                      { key: 'error-' + i },
                      question.messages[this.state.passFail[i]]
                    )
                  )
                )
              );
            }, _this)
          )
        )
      );
    };

    _this.state = {
      score: 0,
      passFail: []
    };
    return _this;
  }

  return ScoreArea;
}(React.Component);

ScoreArea.propTypes = {

  userAnswers: React.PropTypes.array.isRequired,
  allQuestion: React.PropTypes.object.isRequired

};

var Question = function Question(_ref2) {
  var parentAnswerClick = _ref2.parentAnswerClick,
      questionNum = _ref2.questionNum,
      questionBlockNumber = _ref2.questionBlockNumber,
      userAnswers = _ref2.userAnswers,
      option = _ref2.option;


  return React.createElement(
    'div',
    { className: userAnswers[questionBlockNumber] == questionNum ? "user-choice selectedans" : "user-choice",
      onClick: parentAnswerClick,
      'data-question-num': questionNum,
      'data-block-num': questionBlockNumber },
    React.createElement('div', { className: userAnswers[questionBlockNumber] == questionNum ? "checkbox selected" : "checkbox" }),
    React.createElement(
      'p',
      { className: userAnswers[questionBlockNumber] == questionNum ? "quiz-answer selected" : "quiz-answer" },
      option
    )
  );
};
Question.propTypes = {
  parentAnswerClick: React.PropTypes.func.isRequired,
  questionNum: React.PropTypes.number.isRequired,
  questionBlockNumber: React.PropTypes.number.isRequired,
  option: React.PropTypes.number.isRequired,
  userAnswers: React.PropTypes.array.isRequired
};

var QuestionBlock = function QuestionBlock(_ref3) {
  var setUserAnswers = _ref3.setUserAnswers,
      question = _ref3.question,
      questionBlockNumber = _ref3.questionBlockNumber,
      userAnswers = _ref3.userAnswers,
      testForUndefined = _ref3.testForUndefined;


  var onAnswerClick = function onAnswerClick(e) {
    var blockNum = e.currentTarget.dataset.blockNum;
    var selection = e.currentTarget.dataset.questionNum;
    setUserAnswers(blockNum, selection);
    testForUndefined();
  };

  var thePotentialAnswers = question.answers.map(function (answer, i) {
    return React.createElement(Question, { questionNum: i,
      questionBlockNumber: questionBlockNumber,
      parentAnswerClick: onAnswerClick,
      userAnswers: userAnswers,
      key: answer,
      option: answer });
  }, _this2);

  var transitionOptions = {
    transitionName: "fade",
    transitionEnterTimeout: 300,
    transitionLeaveTimeout: 100
  };

  return React.createElement(
    'div',
    { className: 'assessment-question' },
    React.createElement(
      'h4',
      null,
      question.question
    ),
    React.createElement(
      'div',
      { className: 'answer-holder' },
      React.createElement(
        ReactCSS,
        transitionOptions,
        thePotentialAnswers
      )
    )
  );
};

QuestionBlock.propTypes = {
  setUserAnswers: React.PropTypes.func.isRequired,
  question: React.PropTypes.object.isRequired,
  questionBlockNumber: React.PropTypes.number.isRequired,
  userAnswers: React.PropTypes.array.isRequired,
  testForUndefind: React.PropTypes.func.isRequired
};

var QuestionArea = function QuestionArea(_ref4) {
  var userAnswers = _ref4.userAnswers,
      parentSetUserAnswers = _ref4.parentSetUserAnswers,
      currentQuestion = _ref4.currentQuestion,
      allQuestions = _ref4.allQuestions,
      testForUndefined = _ref4.testForUndefined;

  return React.createElement(
    'div',
    { id: 'question-holder' },
    React.createElement(QuestionBlock, { userAnswers: userAnswers,
      setUserAnswers: parentSetUserAnswers,
      testForUndefined: testForUndefined,
      questionBlockNumber: currentQuestion,
      question: allQuestions[currentQuestion]
    })
  );
};
QuestionArea.propTypes = {
  userAnswers: React.PropTypes.array.isRequired,
  currentQuestion: React.PropTypes.number.isRequired,
  allQuestions: React.PropTypes.object.isRequired,
  parentSetUserAnswers: React.PropTypes.func.isRequired,
  testForUndefined: React.PropTypes.func.isRequired
};

var Test = function (_React$Component2) {
  _inherits(Test, _React$Component2);

  function Test(props) {
    _classCallCheck(this, Test);

    var _this3 = _possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).call(this, props));

    _this3.moveForward = function () {
      var curQuest = _this3.state.currentQuestion;
      if (curQuest <= _this3.state.numQuestions - 1) {
        _this3.setState({
          currentQuestion: _this3.state.currentQuestion + 1
        });
      }
    };

    _this3.moveBack = function () {
      var curQuest = _this3.state.currentQuestion;
      if (curQuest > 0) {
        _this3.setState({
          currentQuestion: _this3.state.currentQuestion - 1
        });
      }
    };

    _this3.finishTest = function () {
      _this3.setState({
        quizComplete: 1
      });
    };

    _this3.setUserAnswers = function (a, b) {
      var currArray = _this3.state.userAnswers;
      currArray[a] = b;

      _this3.setState({
        userAnswers: currArray
      });
    };

    _this3.testForUndefined = function () {

      var filled = true;
      for (var x = 0; x < answerObj.length; x++) {
        if (typeof _this3.state.userAnswers[x] == 'undefined') {
          filled = false;
        }
      }

      _this3.setState({
        finishedAnswering: filled
      });

      return filled;
    };

    _this3.render = function () {
      return React.createElement(
        'div',
        { id: 'quizHolder' },
        !_this3.state.quizComplete ? React.createElement(
          'div',
          null,
          React.createElement(QuestionArea, { parentSetUserAnswers: _this3.setUserAnswers,
            userAnswers: _this3.state.userAnswers,
            currentQuestion: _this3.state.currentQuestion,
            allQuestions: answerObj,
            testForUndefined: _this3.testForUndefined
          }),
          React.createElement(Controls, { parentMoveForward: _this3.moveForward,
            userAnswers: _this3.state.userAnswers,
            parentMoveBack: _this3.moveBack,
            parentFinishTest: _this3.finishTest,
            finishedAnswering: _this3.state.finishedAnswering,
            currentQuestion: _this3.state.currentQuestion,
            numQuestions: _this3.state.numQuestions
          }),
          _this3.state.finishedAnswering && React.createElement(
            'button',
            { className: 'btn', id: 'finish', onClick: _this3.finishTest },
            'Finish'
          )
        ) : React.createElement(ScoreArea, { userAnswers: _this3.state.userAnswers,
          allQuestions: answerObj
        })
      );
    };

    _this3.state = {
      currentQuestion: 0,
      userAnswers: [],
      finishedAnswering: false,
      quizComplete: 0,
      numQuestions: answerObj.length
    };
    return _this3;
  }

  return Test;
}(React.Component);

ReactDOM.render(React.createElement(Test, null), document.getElementById('test-div'));