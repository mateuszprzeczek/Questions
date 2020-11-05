import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://questions-69538.firebaseio.com/'
});

instance.defaults.headers.common['Authorization'] = 'Access-Control-Allow-Origin'; 

export default instance;