/* eslint-disable react/jsx-key */

import { useEffect, useState } from "react";
import MoviesServices from "../Services/MoviesServices";
import MovieCard from "../Components.jsx/Movie.card";

const HomePage = () => {
    const [movies,setMovies] = useState([]);

    const FetchMovies = async () => {
        try {
           const response = await MoviesServices.getAllMovies(); 
           setMovies(response.data.results);
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        FetchMovies()
    }, [])
    
    return <>
    <h1>Page accueil</h1>
    <div className="d-flex justify-content-center flex-wrap gap-3">
    {movies.map((movie) => {
        return <MovieCard movieCard={movie} key={movie.id}></MovieCard>
    })}
    </div>
</>;
}
 
export default HomePage;