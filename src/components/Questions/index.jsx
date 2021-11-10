import { shuffle } from 'lodash';
import React, { useState } from 'react';
import './style.scss';


function Question({ question, onNextQuestion, onStop, mode, score }) {
    const { questionText, answerOption } = question
    const title = ['A', 'B', 'C', 'D']
    const [verification, setVerification] = useState('')


    const handleClickChosen = (choice) => {
        if (!onNextQuestion) return

        //TRUE
        if (choice.isCorrect) {
            onNextQuestion()
        }
        //FALSE
        else {
            onStop()
        }
    }

    const handleCheckAnswer = (choice) => {
        console.log(choice)
        //TRUE
        if (choice.isCorrect) {
            setVerification('true')
        }
        //FALSE
        else {
            setVerification('false')
        }
    }

    return (
        <div className={`question --${mode}`}>
            {
                mode === 'flag' &&
                <div className="question-flag">
                    <img src={question.flagImage} alt="flag" />
                </div>
            }
            <div className="question-text">
                <span>{questionText}</span>
            </div>
            <div className="question-options">
                {
                    shuffle(answerOption).map((choice, index) => (
                        <div
                            className={`question-options-choice --${verification}`}
                            onClick={() => handleCheckAnswer(choice)}>
                            <div key={index}>
                                <span>{title[index]} </span>
                                <span>{choice.answerText}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="question-number">
                <span>{`Question: ${score + 1}`}</span>
            </div>
            <div className="question-next">
                <div>
                    <span>Next</span>
                </div>
            </div>
        </div>
    );
}

export default Question;