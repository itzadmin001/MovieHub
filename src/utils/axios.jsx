import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZWYwYzc3YTE0NTQxMWQ4MjAyYWJjNDU5MDhkMTYxOSIsIm5iZiI6MTcyMDQyNjM3Ny4xNTM2NTEsInN1YiI6IjY2OGI2YTU4M2RkZWVhYTIyODIzYzU4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.22QKTkstMV9yHMFKEYqAp7jIEK0FVutjnzmTQoVMO1w'
      }
})


export default instance;