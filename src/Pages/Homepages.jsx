/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */

import { useEffect, useState } from "react";
import MoviesServices from "../Services/MoviesServices";
import MovieCard from "../Components.jsx/Movie.card";
import Pagination from 'react-bootstrap/Pagination';

const HomePage = () => {
    const [movies,setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage,setMaxPage] = useState(500);

    const FetchMovies = async () => {
        try {
           const response = await MoviesServices.getAllMovies(currentPage); 
           setMovies(response.data.results);
           setTimeout(() => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "instant",
              });
        },50)
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        FetchMovies()
    }, [currentPage])
    
    return <>
    <h1 className="d-flex justify-content-center gap-3">Page accueil</h1>
    <div className="d-flex justify-content-center flex-wrap gap-3">
    
    {movies.map((movie) => {
        return <MovieCard movieCard={movie} key={movie.id}></MovieCard>
    })}
    </div>
    <Pagination className="d-flex justify-content-center mt-5 gap-1">
        {currentPage > 1 && <>
      <Pagination.First onClick={() => {setCurrentPage(1)}}/>
      <Pagination.Prev onClick={() => {setCurrentPage(currentPage-1)}}/>
      <Pagination.Item onClick={() => {setCurrentPage(1)}}>{1}</Pagination.Item>
      
    </>}
    {currentPage -5 > 0 && <>
    <Pagination.Ellipsis onClick={() => {setCurrentPage(currentPage-5)}}/></>}
    
    {(currentPage != 2 && currentPage > 1)&& <>
      <Pagination.Item>{currentPage - 1}</Pagination.Item>
      </>}

      <Pagination.Item active>{currentPage}</Pagination.Item>

        {currentPage + 1 < maxPage && <>
        <Pagination.Item onClick={() => {setCurrentPage(currentPage+1)}}>{currentPage + 1}</Pagination.Item>
        </>}
        {currentPage +5 <= maxPage && <>
        <Pagination.Ellipsis onClick={() => {setCurrentPage(currentPage+5)}}/></>}

      {currentPage < maxPage && <>
      <Pagination.Item onClick={() => {setCurrentPage(maxPage)}}>{maxPage}</Pagination.Item>
      <Pagination.Next onClick={() => {setCurrentPage(currentPage+1)}}/>
      <Pagination.Last onClick={() => {setCurrentPage(maxPage)}}/>
      </>}

    </Pagination>
</>;
}
 
export default HomePage;