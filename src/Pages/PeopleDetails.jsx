import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import {  Container } from "react-bootstrap";
import PeopleService from "../Services/PeopleService";
import MovieCard from "../Components.jsx/Movie.card";
import Pagination from 'react-bootstrap/Pagination';



const PeopleDetails = () => {
    const {id} = useParams();
    const [details, setDetails] = useState({});
    const [movie,setMovie] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage,setMaxPage] = useState(500);



    const FetchPeopleByID = async () => {
        try {
            const response = await  PeopleService.getPeopleByID(id);
            console.log(response.data)
            setDetails(response.data); 
        } catch (error) {
            console.log(error);
        }
    }

    const FetchMovieByPeopleID = async () => {
        try {
            const response = await PeopleService.getMoviesByPeopleID(currentPage,id);
            console.log(response.data);
            setMovie(response.data.results)
            
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        FetchPeopleByID();
        
    },[]);

    useEffect(() => {
        FetchMovieByPeopleID()
    }, [currentPage]);

    return <> <Container className="d-flex flex-column align-items-center">
    <h1>{details.name}</h1>
    <img style={{width:"15rem"}} src= {"https://image.tmdb.org/t/p/original"+details.profile_path} alt={"image"+details.name} ></img>

    <p>Biographie : {details.biography}</p>
    <div className="d-flex justify-content-center flex-wrap gap-3">
    {movie.map((movie)=> {
        return < MovieCard movieCard={movie} key={movie.id}></MovieCard>
    })}</div>
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
 
export default PeopleDetails;