import {
    SET_DATA,
    SET_CAPITAL_QUESTION,
    SET_NEXT_QUESTION,
    SET_SCORE,
    SET_CHECK_PASS,
    SET_FLAG_QUESTION,
    SET_MODE
} from '../actions/constants'



export const initState = {
    data: {},
    capitalQuestion: {
        questionText: '',
        answerOption: [
            {
                answerText: '',
                isCorrect: false
            },
            {
                answerText: '',
                isCorrect: false
            },
            {
                answerText: '',
                isCorrect: false
            },
            {
                answerText: '',
                isCorrect: false
            }
        ]
    },
    flagQuestion: {
        flagImage: null,
        questionText: '',
        answerOption: [
            {
                answerText: '',
                isCorrect: false
            },
            {
                answerText: '',
                isCorrect: false
            },
            {
                answerText: '',
                isCorrect: false
            },
            {
                answerText: '',
                isCorrect: false
            }
        ]
    },
    nextQuestion: true,
    score: 0,
    checkPass: true,
    mode: ''
}


const reducer = (state, action) => {
    switch (action.type) {
        case SET_DATA:
            return {
                ...state,
                data: action.payload
            }
        case SET_CAPITAL_QUESTION:
            return {
                ...state,
                capitalQuestion: action.payload
            }
        case SET_FLAG_QUESTION:
            return {
                ...state,
                flagQuestion: action.payload
            }
        case SET_NEXT_QUESTION:
            return {
                ...state,
                nextQuestion: action.payload
            }
        case SET_SCORE:
            return {
                ...state,
                score: action.payload
            }
        case SET_CHECK_PASS:
            return {
                ...state,
                checkPass: action.payload
            }
        case SET_MODE:
            return {
                ...state,
                mode: action.payload
            }
        default:
            throw new Error('Invalid action')
    }
}


export default reducer