import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MoviesServices from "../Services/MoviesServices";
import { Button, Container } from "react-bootstrap";


const MovieDetailsPage = () => {
    const {id} = useParams();
    const [movie, setMovie] = useState({});
    const navigate = useNavigate();

    const navigateTo = (genre) => {
      navigate("/genre/" + genre.id, {state : {"genre" : genre}});
    };

    const FetchMovieByID = async () => {
        try {
            const response = await  MoviesServices.getMovieByID(id);
            setMovie(response.data); 
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
        FetchMovieByID()
    },[]);

    return <> <Container className="d-flex flex-column align-items-center">
    <h1>{movie.original_title}</h1>
    <img style={{width:"15rem"}} src={"https://image.tmdb.org/t/p/original" +movie.poster_path} alt={"image"+movie.title} ></img>
    <p>Budget : {movie.budget}</p>
    
    {movie.genres && movie.genres.map((genre)=> {
        return <Button variant="primary" onClick={() => {
            navigateTo(genre);
          }} key={genre.id}>{genre.name}</Button>
    })}

    </Container>
    </>;
}
 
export default MovieDetailsPage;