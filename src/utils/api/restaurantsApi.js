import axios from 'axios'
import { BASE_API_URL } from '../../constants'

export function getRestaurants(city, name, address){

    let url;

    if (name === '' && address === ''){
        url = BASE_API_URL + 'restaurants?city=' + city
    } else if (name !== '' && address === ''){
        url = BASE_API_URL + `restaurants?city=${city}&name=${name}`
    } else if (name === '' && address !== ''){
        url = BASE_API_URL + `restaurants?city=${city}&address=${address}`
    } else if (name !== '' && address !== ''){
        url = BASE_API_URL + `restaurants?city=${city}&address=${address}&name=${name}`
    }

    return axios.get(url)
 
}