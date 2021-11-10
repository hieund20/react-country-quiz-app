import { shuffle } from 'lodash';
import React from 'react';
import './style.scss';


function Question({ question, onNextQuestion, onStop, mode, score }) {
    const { questionText, answerOption } = question
    const title = ['A', 'B', 'C', 'D']

    const handleClickChosen = (choice) => {
        console.log(choice)
        if (!onNextQuestion) return

        //TRUE
        if (choice.isCorrect) {
            onNextQuestion()
        }
        else {
            onStop()
        }
    }

    return (
        <div className="question">
            {
                mode === 'flag' &&
                <div>
                    <img src={question.flagImage} alt="flag" />
                </div>
            }
            <div>
                <span>{questionText}</span>
            </div>
            <div>
                {
                    shuffle(answerOption).map((choice, index) => (
                        <div onClick={() => handleClickChosen(choice)}>
                            <div key={index}>
                                <span>{title[index]} </span>
                                <span>{choice.answerText}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div>
                <span>{`Question: ${score + 1}`}</span>
            </div>
        </div>
    );
}

export default Question;