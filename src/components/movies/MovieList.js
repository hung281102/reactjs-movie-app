import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "apiConfig/config";
import MovieCard from "./MovieCard";

//https://api.themoviedb.org/3/movie/now_playing?api_key=<<api_key>>
const MovieList = ({ type = "now_playing" }) => {
    const { data } = useSWR(tmdbAPI.getMovieList(type), fetcher);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        if (data && data.results) {
            setMovies(data.results);
        }
    }, [data]);

    // console.log(movies);
    return (
        <div className="movie-list">
            <Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"}>
                {movies &&
                    movies.length > 0 &&
                    movies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <MovieCard item={movie}></MovieCard>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
};

export default MovieList;
