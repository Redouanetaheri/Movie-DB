import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import GenresServices from "../Services/GenresServices";
import MovieCard from "../Components.jsx/Movie.card";
import Pagination from 'react-bootstrap/Pagination';


const GenresDetailsPage = () => {
    const {id} = useParams();
    const location = useLocation();
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage,setMaxPage] = useState(500);
   

    const FetchMoviesByGenreID = async () => {
        try {
            const response = await  GenresServices.getMoviesByGenreID(currentPage, id);
            setMovies(response.data.results); 
            // fonction qui permet de scroll automatiquement vers le haut a mettre dans la const pour quelle soit rappeler a chaque fois 
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "instant",
                  });
            },50);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        FetchMoviesByGenreID();
    },[currentPage]);

    console.log(location);
    return <> <Container className="d-flex flex-column align-items-center mb-3">
    <h1>{location.state.genre.name}</h1>
    <div className="d-flex justify-content-center flex-wrap gap-3 ">
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

    </Container>
    </>;
}
 
export default GenresDetailsPage; 