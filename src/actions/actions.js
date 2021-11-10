import {
    SET_CHECK_PASS,
    SET_DATA,
    SET_NEXT_QUESTION,
    SET_CAPITAL_QUESTION,
    SET_SCORE,
    SET_FLAG_QUESTION,
    SET_MODE
} from "./constants"



export const setData = payload => {
    return {
        type: SET_DATA,
        payload
    }
}

export const setCapitalQuestion = payload => {
    return {
        type: SET_CAPITAL_QUESTION,
        payload
    }
}

export const setFlagQuestion = payload => {
    return {
        type: SET_FLAG_QUESTION,
        payload
    }
}

export const setNextQuestion = payload => {
    return {
        type: SET_NEXT_QUESTION,
        payload
    }
}

export const setScore = payload => {
    return {
        type: SET_SCORE,
        payload
    }
}

export const setCheckPass = payload => {
    return {
        type: SET_CHECK_PASS,
        payload
    }
}

export const setMode = payload => {
    return {
        type: SET_MODE,
        payload
    }
}
