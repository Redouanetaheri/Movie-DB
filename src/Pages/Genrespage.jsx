/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import GenresServices from "../Services/GenresServices";

const GenresPage = () => {
  const [genre, setGenre] = useState([]);

  const FetchGenre = async () => {
    try {
      const response = await GenresServices.getAllGenres();
      
      setGenre(response.data.genres);
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
          return <Button key={genre.id}>{genre.name}</Button>;
        })}
      </div>
    </>
  );
};

export default GenresPage;
