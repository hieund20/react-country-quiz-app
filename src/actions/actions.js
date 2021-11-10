import {
    SET_IS_PASS,
    SET_DATA,
    SET_IS_SHOW_NEXT_QUESTION,
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

export const setIsShowNextQuestion = payload => {
    return {
        type: SET_IS_SHOW_NEXT_QUESTION,
        payload
    }
}

export const setScore = payload => {
    return {
        type: SET_SCORE,
        payload
    }
}

export const setIsPass = payload => {
    return {
        type: SET_IS_PASS,
        payload
    }
}

export const setMode = payload => {
    return {
        type: SET_MODE,
        payload
    }
}
