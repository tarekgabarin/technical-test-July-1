import axios from 'axios'
import { BASE_API_URL } from '../../constants'

export function getRestaurants(city, name, address, page = 1){

    let url;

    if (name === '' && address === ''){
        url = BASE_API_URL + 'restaurants?city=' + city + '&page=' + page
    } else if (name !== '' && address === ''){
        url = BASE_API_URL + `restaurants?city=${city}&name=${name}&page=${page}`
    } else if (name === '' && address !== ''){
        url = BASE_API_URL + `restaurants?city=${city}&address=${address}&page=${page}`
    } else if (name !== '' && address !== ''){
        url = BASE_API_URL + `restaurants?city=${city}&address=${address}&name=${name}&page=${page}`
    }

    return axios.get(url)
 
}