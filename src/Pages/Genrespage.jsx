/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import GenresServices from "../Services/GenresServices";
import { useNavigate } from "react-router-dom";

const GenresPage = () => {
  const [genre, setGenre] = useState([]);

  const navigate = useNavigate();

  const navigateTo = (genre) => {
    navigate("/genre/" + genre.id, {state : {"genre" : genre}});
  };

  const FetchGenre = async () => {
    try {
      const response = await GenresServices.getAllGenres();

      setGenre(response.data.genres);
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
  };

  useEffect(() => {
    FetchGenre();
  }, []);

  return (
    <>
      <h1>Genres</h1>
      <div className="d-flex justify-content-center flex-wrap gap-3">
        {genre.map((genre) => {
          return (
            <Button
              key={genre.id}
              onClick={() => {
                navigateTo(genre);
              }}
            >
              {genre.name}
            </Button>
          );
        })}
      </div>
    </>
  );
};
export default GenresPage;
