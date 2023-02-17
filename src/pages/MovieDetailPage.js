import React from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import useSWR from "swr";
import MovieCard from "components/movies/MovieCard";

import { fetcher, tmdbAPI } from "apiConfig/config";

const MovieDetailPage = () => {
    const { movieId } = useParams();
    const { data } = useSWR(tmdbAPI.getMovieDetail(movieId), fetcher);
    if (!data) return null;

    const { backdrop_path, poster_path, title, genres, overview } = data;
    return (
        <div div className="pb-10">
            <div className="w-full h-[600px] relative  ">
                <div className="absolute inset-0 bg-black bg-opacity-70"></div>
                <div
                    className="w-full h-full  bg-cover bg-no-repeat bg-center"
                    style={{
                        backgroundImage: `url(${tmdbAPI.imageOriginal(
                            backdrop_path
                        )})`,
                    }}
                ></div>
            </div>

            <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
                <img
                    className="w-full h-full object-cover  rounded-xl object-top"
                    src={tmdbAPI.imageOriginal(poster_path)}
                    alt=""
                ></img>
            </div>

            <h1 className="text-center text-4xl font-bold  text-white mb-10">
                {title}
            </h1>

            {genres.length > 0 && (
                <div className=" flex items-center gap-x-5 mb-10 justify-center">
                    {genres.map((item) => (
                        <span
                            key={item.id}
                            className="py-2 px-4 border border-primary text-primary rounded-md"
                        >
                            {item.name}
                        </span>
                    ))}
                </div>
            )}
            <p className="text-center text-md leading-relaxed max-w-[600px] mx-auto mb-20">
                {overview}
            </p>
            <MovieCredit></MovieCredit>
            <MovieVideos></MovieVideos>
            <MovieSimilar></MovieSimilar>
        </div>
    );
};

function MovieCredit() {
    const { movieId } = useParams();
    const { data } = useSWR(tmdbAPI.getMovieCredit(movieId), fetcher);

    if (!data) return null;
    const { cast } = data;
    if (!cast || cast.length === 0) return null;

    return (
        <div className="py-10">
            <h2 className="text-center text-3xl mb-10">Cast</h2>
            <div className="grid grid-cols-4 gap-5">
                {cast.slice(0, 4).map((item) => (
                    <div className="cart-item" key={item.id}>
                        <img
                            className="w-full h-[350px] object-cover rounded-md mb-3"
                            src={tmdbAPI.imageOriginal(item.profile_path)}
                            alt=""
                        ></img>
                        <h3 className="text-xl font-medium">{item.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

function MovieVideos() {
    const { movieId } = useParams();
    const { data } = useSWR(tmdbAPI.getMovieVideo(movieId), fetcher);
    if (!data) return null;
    // console.log(data);
    const { results } = data;
    if (!results || results.length === 0) return null;
    return (
        <div className="py-10">
            <div className="flex flex-col gap-10">
                {results.slice(0, 2).map((item) => (
                    <div key={item.id}>
                        <h3 className="mb-5 text-xl font-medium text-white p-3 bg-secondary inline-block ">
                            {item.name}
                        </h3>
                        <div className="w-full aspect-video">
                            <iframe
                                className="w-full h-full object-fill"
                                title="Youtube video player"
                                width="980"
                                height="551"
                                src={`https://www.youtube.com/embed/${item.key}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullscreen
                            ></iframe>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function MovieSimilar() {
    const { movieId } = useParams();
    const { data } = useSWR(tmdbAPI.getMovieSimilar(movieId), fetcher);
    if (!data) return null;
    // console.log(data);
    const { results } = data;
    if (!results || results.length === 0) return null;
    return (
        <div className="py-10">
            <h2 className="text-3xl font-medium mb-10">Similar Movies</h2>
            <div className="movie-list">
                <Swiper
                    grabCursor={true}
                    spaceBetween={40}
                    slidesPerView={"auto"}
                >
                    {results &&
                        results.length > 0 &&
                        results.map((movie) => (
                            <SwiperSlide key={movie.id}>
                                <MovieCard item={movie}></MovieCard>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
        </div>
    );
}
export default MovieDetailPage;
