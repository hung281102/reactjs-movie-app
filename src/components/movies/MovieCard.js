import React from "react";
import { useNavigate } from "react-router-dom";
import { tmdbAPI } from "apiConfig/config";
import Button from "components/button/Button";

const MovieCard = ({ item }) => {
    // console.log(item);
    const { title, vote_average, release_date, poster_path, id } = item;
    const navigate = useNavigate();
    return (
        <div className="movie-card rounded-lg bg-slate-800 p-3 text-white h-full flex flex-col select-none">
            <img
                src={tmdbAPI.image500(poster_path)}
                className="w-full h-[250px] object-cover rounded-lg mb-5"
                alt=""
            ></img>

            <div className="flex flex-col flex-1">
                <h3 className="text-xl font-bold mb-3">{title}</h3>
                <div className="flex items-center justify-between text-sm opacity-50 mb-10">
                    <span>{new Date(release_date).getFullYear()}</span>
                    <span>{vote_average}</span>
                </div>

                <Button onClick={() => navigate(`/movie/${id}`)}>
                    Watch now
                </Button>
            </div>
        </div>
    );
};

export default MovieCard;
