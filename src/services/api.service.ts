import axios from "axios";


const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
});

api.interceptors.request.use(config => {
    config.headers.Authorization = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkM2Y4NjI1ZGFlZWJhODUyNDBhZjEzY2Y1Mjc0ZTEyNSIsInN1YiI6IjY2NzA2YjQ3ZWI3ZjVjM2U2YjU0N2NjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-8G9Voja88BHQbhpEVpKruhohDaCY-24d4XLLgEpI-4';
    return config;
});

export default api;