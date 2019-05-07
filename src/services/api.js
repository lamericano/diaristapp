import axios from 'axios';

const api = axios.create({
    baseURL: 'https://app-diarista-api.herokuapp.com/api'
});

export default api;