import React from "react";
import useSWR from "swr";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import { fetcher, tmdbAPI } from "apiConfig/config";
import Button from "components/button/Button";
import { useNavigate } from "react-router-dom";

const Banner = () => {
    const { data } = useSWR(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=dc8cfe9e1883fe3bce6f5b901a0bf213`,
        fetcher
    );
    const movies = data?.results || [];
    console.log(movies);
    return (
        <section className="banner h-[500px]  page-container mb-20  overflow-hidden">
            <Swiper grabCursor={true} slidesPerView={"auto"}>
                {movies.length > 0 &&
                    movies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <BannerItem item={movie}></BannerItem>;
                        </SwiperSlide>
                    ))}
            </Swiper>
        </section>
    );
};
//
//
//https://image.tmdb.org/t/p/original/t72ZvOZwtvcjZivZCFtCtL8QWb0.jpg
function BannerItem({ item }) {
    const { title, backdrop_path, id } = item;
    const navigate = useNavigate();
    return (
        <div className="w-full h-full rounded-lg relative">
            <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] "></div>
            <img
                src={tmdbAPI.imageOriginal(backdrop_path)}
                className="w-full h-full object-cover rounded-lg object-center"
                alt=""
            ></img>
            <div className="absolute left-5 bottom-5 w-full text-white">
                <h2 className="font-bold text-3xl mb-5 ">{title}</h2>

                <div className="mb-8 flex items-center gap-x-3">
                    <span className="py-2 px-4 border border-white rounded-md">
                        Avengers
                    </span>
                    <span className="py-2 px-4 border border-white rounded-md">
                        Avengers
                    </span>
                    <span className="py-2 px-4 border border-white rounded-md">
                        Avengers
                    </span>
                </div>
                <Button onClick={() => navigate(`/movie/${id}`)}>
                    Watch now
                </Button>
            </div>
        </div>
    );
}
export default Banner;
