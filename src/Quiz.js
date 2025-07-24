import React, { useState } from 'react';

const quizData = [
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    answer: 'Paris',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
    answer: 'Mars',
  },
  {
    question: 'Who wrote Hamlet?',
    options: ['Charles Dickens', 'William Shakespeare', 'Mark Twain', 'Jane Austen'],
    answer: 'William Shakespeare',
  },
  {
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
    answer: 'Pacific',
  },
  {
    question: 'Which element has the chemical symbol O?',
    options: ['Gold', 'Oxygen', 'Osmium', 'Iron'],
    answer: 'Oxygen',
  },
];

function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showNext, setShowNext] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const QUIZ_LENGTH = 5;

  const handleOptionChange = (e) => {
    setSelected(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selected === quizData[current].answer) {
      setFeedback('Correct!');
      setCorrectCount((prev) => prev + 1);
    } else {
      setFeedback('Incorrect! Correct answer is: ' + quizData[current].answer);
    }
    setShowNext(true);
  };

  const handleNext = () => {
    setCurrent((prev) => prev + 1);
    setSelected('');
    setFeedback('');
    setShowNext(false);
  };

  if (current >= QUIZ_LENGTH) {
    return (
      <div className="quiz-bg">
        <div className="quiz-container quiz-center">
          <h2 className="quiz-title">Quiz Completed!</h2>
          <p className="quiz-result">You answered <span className="quiz-correct">{correctCount}</span> out of <span className="quiz-total">{QUIZ_LENGTH}</span> questions correctly.</p>
          <p className="quiz-thank">Thank you for participating!</p>
          <p className="quiz-greet">Great job! Hope you enjoyed the quiz. Have a wonderful day! 🎉</p>
          <button
            className="quiz-btn quiz-btn-next"
            onClick={() => {
              setCurrent(0);
              setSelected('');
              setFeedback('');
              setShowNext(false);
              setCorrectCount(0);
            }}
          >
            Reset Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-bg">
      <div className="quiz-container quiz-center">
        <h2 className="quiz-title">Question {current + 1} of {QUIZ_LENGTH}</h2>
        <p className="quiz-question">{quizData[current].question}</p>
        <form onSubmit={handleSubmit} className="quiz-form">
          {quizData[current].options.map((option) => (
            <label key={option} className="quiz-option">
              <input
                type="radio"
                name="option"
                value={option}
                checked={selected === option}
                onChange={handleOptionChange}
                required
                disabled={showNext}
              />
              {option}
            </label>
          ))}
          {!showNext && (
            <button
              type="submit"
              className="quiz-btn quiz-btn-submit"
              disabled={!selected}
            >
              Submit
            </button>
          )}
        </form>
        {feedback && (
          <div className={`quiz-feedback ${feedback === 'Correct!' ? 'quiz-feedback-correct' : 'quiz-feedback-wrong'}`}>{feedback}</div>
        )}
        {showNext && (
          <button
            onClick={handleNext}
            className="quiz-btn quiz-btn-next"
          >
            Next Question
          </button>
        )}
      </div>
    </div>
  );
}

export default Quiz;
