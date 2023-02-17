export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const apiKey = "dc8cfe9e1883fe3bce6f5b901a0bf213";
const tmdbEndpoint = "https://api.themoviedb.org/3/movie";
const tmdbEndpointSearch = "https://api.themoviedb.org/3/search/movie";

export const tmdbAPI = {
    getMovieList: (type, page = 1) =>
        `${tmdbEndpoint}/${type}?api_key=${apiKey}&page=${page}`,
    getMovieDetail: (movieId) => `${tmdbEndpoint}/${movieId}?api_key=${apiKey}`,
    getMovieCredit: (movieId) =>
        `${tmdbEndpoint}/${movieId}/credits?api_key=${apiKey}`,

    getMovieSimilar: (movieId) =>
        `${tmdbEndpoint}/${movieId}/similar?api_key=${apiKey}`,
    getMovieVideo: (movieId) =>
        `${tmdbEndpoint}/${movieId}/videos?api_key=${apiKey}`,
    getMovieSearch: (query, page) =>
        `${tmdbEndpointSearch}?api_key=${apiKey}&query=${query}&page=${page}`,
    imageOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
    image500: (url) => `https://image.tmdb.org/t/p/w500/${url}`,
};
