import axios from 'axios';

export const get = (uri) => {
    return axios(uri).then((response) => response.data)
    .catch((err) => console.log(err.message))
}