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
  setScore,
  setMode
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
    checkPass,
    mode } = state

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

      if (mode === 'capital') {
        console.log('capital is running...')
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

      if (mode === 'flag') {
        console.log('flag is running...')
        const { rndNum_1, rndNum_2, rndNum_3, rndNum_4 } = getRandomNumber();

        dispatch(setFlagQuestion(
          {
            flagImage: data[rndNum_1].flags.svg,
            questionText: 'Which country does this flag belong to?',
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

    }
    console.log('useEffect other run')
  }, [data, nextQuestion, mode])


  const handleShowNextQuestion = () => {
    //Pass current question and show next question
    dispatch(setNextQuestion(nextQuestion === true ? false : true))
    //Increase score 
    dispatch(setScore(score + 1))
  }

  const handleStopQuiz = () => {
    dispatch(setCheckPass(false))
  }

  const handleChangeMode = (mode) => {
    console.log(mode)
    dispatch(setMode(mode))
  }

  const handleHomeReset = () => {
    //Hide result screen
    dispatch(setCheckPass(true))
    //Reset score
    dispatch(setScore(0))
  }

  return (
    <div className="app">

      <div className="app-container">

        <Router>

          <div className="app-container-header">
            <Link to="/">
              <div onClick={() => handleHomeReset()}>
                <span>COUNTRY QUIZ</span>
              </div>
            </Link>
            <div>
              <img
                src="./assets/images/undraw_adventure_4hum 1.svg"
                alt="adventure" />
            </div>
          </div>

          <Routes>

            <Route path="/" element={
              <div className="main-card">
                <div>
                  <Link to="/capital">
                    <div onClick={() => handleChangeMode('capital')}>
                      <span>CAPITAL</span>
                    </div>
                  </Link>
                </div>
                <div>
                  <Link to="/flag">
                    <div onClick={() => handleChangeMode('flag')}>
                      <span>FLAG</span>
                    </div>
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
                      mode={mode}
                      score={score}
                    />
                  }
                  {
                    !checkPass &&
                    <Result
                      score={score}
                    />
                  }
                </div>
              </>
            } />

            <Route path="/flag" element={
              <>
                <div className="main-card">
                  {
                    checkPass &&
                    <Question
                      question={flagQuestion}
                      onNextQuestion={handleShowNextQuestion}
                      onStop={handleStopQuiz}
                      mode={mode}
                      score={score}
                    />
                  }
                  {
                    !checkPass &&
                    <Result
                      score={score}
                    />
                  }
                </div>
              </>
            } />

          </Routes>

        </Router >

      </div>

    </div>
  );
}

export default App;
