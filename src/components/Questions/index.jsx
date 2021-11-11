import React, { useState } from 'react';
import './style.scss';


function Question(props) {
    const {
        flagImage,
        questionText,
        answerOption,
        onNextQuestion,
        onStop,
        mode,
        score } = props
    const title = ['A', 'B', 'C', 'D']
    const [checked, setChecked] = useState(-1)
    const [verification, setVerification] = useState('')


    const handleClickNext = () => {
        if (!onNextQuestion) return

        //TRUE
        if (verification === 'true') {
            onNextQuestion()
            setVerification('')
        }
        //FALSE
        else {
            onStop()
        }
    }

    const handleCheckAnswer = (choice, index) => {
        setChecked(index)
        // TRUE
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
                    <img src={flagImage} alt="flag" />
                </div>
            }
            <div className="question-text">
                <span>{questionText}</span>
            </div>
            <div className="question-options">
                {
                    answerOption.map((choice, index) => (
                        <div
                            className={`question-options-choice ${index === checked ? verification : ''}`}
                            onClick={() => handleCheckAnswer(choice, index)}
                            style={{
                                backgroundColor: (verification === 'false' && choice.isCorrect === true) ? '#60bf88' : '',
                                border: (verification === 'false' && choice.isCorrect === true) ? 'none' : '',
                                pointerEvents: verification !== '' ? 'none' : ''
                            }}>
                            <div key={index}>
                                <span
                                    style={{
                                        color: (verification === 'false' && choice.isCorrect === true) ? '#ffffff' : '',
                                    }}>
                                    {title[index]}
                                </span>
                                <span
                                    style={{
                                        color: (verification === 'false' && choice.isCorrect === true) ? '#ffffff' : '',
                                    }}>
                                    {choice.answerText}
                                </span>
                                <span
                                    className="material-icons"
                                    id={`false-checked-${index === checked && verification === 'false' ? 'active' : 'none'}`}
                                    style={{
                                        color: (verification === 'false' && choice.isCorrect === true) ? '#ffffff' : '',
                                    }}
                                >
                                    highlight_off
                                </span>
                                <span
                                    className="material-icons"
                                    id={`true-checked-${index === checked && verification === 'true' ? 'active' : 'none'}`}
                                    style={
                                        {
                                            display: (verification === 'false' && choice.isCorrect === true) ? 'inline-block' : '',
                                            color: (verification === 'false' && choice.isCorrect === true) ? 'white' : ''
                                        }
                                    }>
                                    check_circle_outline
                                </span>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="question-number">
                <span>{`Question: ${score + 1}`}</span>
            </div>
            <div
                className={`question-next ${verification === '' ? '--hidden' : ''}`}
                onClick={() => handleClickNext()}>
                <div>
                    <span>Next</span>
                </div>
            </div>
        </div>
    );
}

export default Question;

