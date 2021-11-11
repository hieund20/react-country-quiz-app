import _, { shuffle } from 'lodash';
import { useEffect, useReducer } from 'react';
import {
  BrowserRouter as Router, Routes, Route, Link
} from 'react-router-dom';

import { getAllCountry } from './api/getCountry';
import Question from './components/Questions';
import Result from './components/Result';
import reducer, { initState } from './reducers/reducer';
import {
  setIsPass,
  setData,
  setIsShowNextQuestion,
  setFlagQuestion,
  setCapitalQuestion,
  setScore,
  setMode
} from './actions/actions';
import { getRandomNumber } from './utils/utilGetRandomNumber';

import svg_adventure from './assets/images/undraw_adventure_4hum.svg'
import './App.scss';


function App() {
  const [state, dispatch] = useReducer(reducer, initState)
  const {
    data,
    capitalQuestion,
    flagQuestion,
    isShowNextQuestion,
    score,
    isPass,
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
  }, [data, isShowNextQuestion, mode])


  const handleShowNextQuestion = () => {
    dispatch(setIsShowNextQuestion(isShowNextQuestion === true ? false : true))
    //Increase score 
    dispatch(setScore(score + 1))
  }

  const handleStopQuiz = () => {
    dispatch(setIsPass(false))
  }

  const handleChangeMode = (mode) => {
    dispatch(setMode(mode))
  }

  const handleHomeReset = () => {
    //Hide result screen
    dispatch(setIsPass(true))
    //Reset score
    dispatch(setScore(0))
  }


  //Shuffle answer option before pass to child component

  return (
    <div className="app">

      <div className="app-container --flag">

        <Router>

          <div className="app-container-header">
            <Link to="/">
              <div onClick={() => handleHomeReset()}>
                <span>COUNTRY QUIZ</span>
              </div>
            </Link>
            <div>
              <img
                src={svg_adventure}
                alt="adventure" />
            </div>
          </div>

          <Routes>

            <Route path="/" element={
              <div className="app-container-menu">
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
                <div className="app-container-card">
                  {
                    isPass &&
                    <Question
                      questionText={capitalQuestion.questionText}
                      answerOption={shuffle(capitalQuestion.answerOption)}
                      onNextQuestion={handleShowNextQuestion}
                      onStop={handleStopQuiz}
                      mode={mode}
                      score={score}
                    />
                  }
                  {
                    !isPass &&
                    <Result
                      score={score}
                      onTryAgain={handleHomeReset}
                    />
                  }
                </div>
              </>
            } />

            <Route path="/flag" element={
              <>
                <div className="app-container-card --flag">
                  {
                    isPass &&
                    <Question
                      flagImage={flagQuestion.flagImage}
                      questionText={flagQuestion.questionText}
                      answerOption={shuffle(flagQuestion.answerOption)}
                      onNextQuestion={handleShowNextQuestion}
                      onStop={handleStopQuiz}
                      mode={mode}
                      score={score}
                    />
                  }
                  {
                    !isPass &&
                    <Result
                      score={score}
                      onTryAgain={handleHomeReset}
                    />
                  }
                </div>
              </>
            } />

          </Routes>

        </Router >
      </div>

      <div>
        <span>created by username - devChallenges.io</span>
      </div>
    </div>
  );
}

export default App;
