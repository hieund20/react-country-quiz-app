import React from 'react';
import { setScore } from '../../App';
// import PropTypes from 'prop-types';
import './style.scss';

// Question.propTypes = {

// };

function Question({ question, onNextQuestion, onStop }) {
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
            <div>
                <span>{questionText}</span>
            </div>
            <div>
                {
                    answerOption.map((choice, index) => (
                        <div onClick={() => handleClickChosen(choice)}>
                            <div key={index}>
                                <span>{title[index]} </span>
                                <span>{choice.answerText}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Question;