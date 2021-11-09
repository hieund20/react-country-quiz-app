import _ from 'lodash';
import { useEffect, useReducer } from 'react';
import {
  BrowserRouter as Router, Routes, Route, Link
} from 'react-router-dom';

import { getAllCountry } from './api/getCountry';
import Question from './components/Questions';
import Result from './components/Result';
import reducer, { initState } from './reducers/reducer';
import {
  setCheckPass,
  setData,
  setNextQuestion,
  setFlagQuestion,
  setCapitalQuestion,
  setScore
} from './actions/actions';
import { getRandomNumber } from './utils/utilGetRandomNumber';

import './App.scss';


function App() {
  const [state, dispatch] = useReducer(reducer, initState)
  const {
    data,
    capitalQuestion,
    flagQuestion,
    nextQuestion,
    score,
    checkPass } = state

  //First render, fill all response to data
  useEffect(() => {
    getAllCountry()
      .then((res) => {
        dispatch(setData(res.data))
      })
      .catch((err) => {
        console.log('Have an error when fetch: ', err)
      })
  }, []);


  useEffect(() => {
    if (!_.isEmpty(data)) {
      const { rndNum_1, rndNum_2, rndNum_3, rndNum_4 } = getRandomNumber();

      dispatch(setCapitalQuestion(
        {
          questionText:
            data[rndNum_1].capital !== undefined ?
              `${data[rndNum_1].capital[0]} is the capital of` :
              'This question is updating...',
          answerOption: [
            {
              answerText: data[rndNum_1].name.official,
              isCorrect: true
            },
            {
              answerText: data[rndNum_2].name.official,
              isCorrect: false
            },
            {
              answerText: data[rndNum_3].name.official,
              isCorrect: false
            },
            {
              answerText: data[rndNum_4].name.official,
              isCorrect: false
            },
          ]
        }
      ))
    }
  }, [nextQuestion, data])


  const handleShowNextQuestion = () => {
    //Pass current question and show next question
    dispatch(setNextQuestion(nextQuestion === true ? false : true))
    //Increase score 
    dispatch(setScore(score + 1))
  }

  const handleStopQuiz = () => {
    dispatch(setCheckPass(false))
  }

  return (
    <Router>

      <div className="main">
        <div className="main-header">
          <Link to="/">
            <span>COUNTRY QUIZ</span>
          </Link>
        </div>
      </div>

      <Routes>

        <Route path="/" element={
          <div className="main-card">
            <div>
              <Link to="/capital">
                <span>CAPITAL</span>
              </Link>
            </div>
            <div>
              <Link to="/flag">
                <span>FLAG</span>
              </Link>
            </div>
          </div>
        } />

        <Route path="/capital" element={
          <>
            <div className="main-card">
              {
                checkPass &&
                <Question
                  question={capitalQuestion}
                  onNextQuestion={handleShowNextQuestion}
                  onStop={handleStopQuiz}
                />
              }
              {
                !checkPass &&
                <Result
                  score={score}
                />
              }
            </div>
            <div>
              <span>{`Score: ${score}`}</span>
            </div>
          </>
        } />

      </Routes>

    </Router >
  );
}

export default App;
