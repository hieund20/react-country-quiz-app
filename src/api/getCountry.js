import axios from "axios"

export const getAllCountry = () => {
    return axios.get('https://restcountries.com/v3.1/all')
}