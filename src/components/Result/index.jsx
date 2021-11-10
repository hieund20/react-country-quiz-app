import React from 'react';
import './style.scss';
import svg_result from '../../assets/images/undraw_winners_ao2o 2.svg';
import { Link } from 'react-router-dom';

function Result({ score, onTryAgain }) {

    const handleOnTryAgain = () => {
        if (!onTryAgain) return

        console.log('stop')
        onTryAgain()
    }

    return (
        <div className="result">
            <div className="result-svg">
                <img src={svg_result} alt="" />
            </div>
            <div className="result-title">
                <span>RESULT</span>
            </div>
            <div className="result-award">
                <span>
                    You got <span className="result-award-highlight">{score}</span> correct answers
                </span>
            </div>
            <div
                className="result-retry"
                onClick={() => handleOnTryAgain()}>
                <Link to="/">
                    <div>
                        <span>Try again</span>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Result;