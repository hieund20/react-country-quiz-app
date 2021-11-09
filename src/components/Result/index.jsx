import React from 'react';
import './style.scss';

function Result({ score }) {
    return (
        <div className="result">
            <div>
                <span>RESULT</span>
            </div>
            <div>
                <span>
                    {`You got ${score} correct answers`}
                </span>
            </div>
        </div>
    );
}

export default Result;