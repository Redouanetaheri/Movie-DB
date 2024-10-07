/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */

import { useEffect, useState } from "react";
import MoviesServices from "../Services/MoviesServices";
import MovieCard from "../Components.jsx/Movie.card";
import Pagination from 'react-bootstrap/Pagination';
import { Button, Form } from "react-bootstrap";


const HomePage = () => {
    const [movies,setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage,setMaxPage] = useState(500);
    const [searchValue,setSearchValue] = useState('');
    const [searching,setSearching] = useState(false);

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

    const searchFilm= async () => { 
      if (searchValue == "") {
        FetchMovies();
        setSearching(false);
      }else{
      try {
        const response = await MoviesServices.getMovieByTitle(searchValue, currentPage);
        setMaxPage(response.data.total_pages);
        setMovies(response.data.results);
        
        ;
      } catch (error) {
        console.log(error);
        
      }
      
    }
  }

    useEffect(() => {
      if (searching == false) {
        FetchMovies()
      }else{
        searchFilm();
      }
        
    }, [currentPage])
    
    return <>
    <h1 className="d-flex justify-content-center gap-3">Page accueil</h1>
    <Form.Label htmlFor="inputPassword5">Recherche</Form.Label>
      <Form.Control
        type="text"
        id="search"
        aria-describedby="Search"
        placeholder="ex : Deadpool"
        className="mb-3"
        value={searchValue}
        onChange={(e)=> {
          setSearchValue(e.currentTarget.value);
          
        }}
      />
      <Button variant="primary" className="col-12 mb-3" onClick={() => {setCurrentPage(1); setSearching(true); searchFilm();}}>Recherche</Button>
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