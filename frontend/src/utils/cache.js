import axios from 'axios';

export const cache = (uri) => {
    if (localStorage.getItem(uri)) {
        return(JSON.parse(localStorage.getItem(uri)))
    } else {
        return axios(uri).then((response) => {
            localStorage.setItem(uri, JSON.stringify(response.data))  
            return(response.data)
        })
        .catch((err) => console.log(err.message))
    }
}