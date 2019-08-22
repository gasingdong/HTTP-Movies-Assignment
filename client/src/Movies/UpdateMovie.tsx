import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import { MovieData } from '../types';

interface RouteProps {
  id: string | undefined;
}

interface MovieFormData {
  title: string;
  director: string;
  metascore: string;
  stars: string;
}

const UpdateMovie = ({
  match,
}: RouteComponentProps<RouteProps>): React.ReactElement => {
  const [movie, setMovie] = useState<MovieData | null>(null);
  const [newMovie, setNewMovie] = useState<MovieFormData>({
    title: '',
    director: '',
    metascore: '',
    stars: '',
  });

  const fetchMovie = (id: string): void => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res): void => {
        setMovie(res.data);
        setNewMovie(res.data);
      })
      .catch((err): void => console.log(err.response));
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNewMovie({
      ...newMovie,
      [event.target.name]: event.target.value,
    });
    console.log(newMovie);
  };

  useEffect((): void => {
    if (match.params.id) {
      fetchMovie(match.params.id);
    }
  }, [match.params.id]);

  return movie && newMovie ? (
    <div className="update-movie">
      <form>
        <label htmlFor="title">
          Title
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newMovie.title}
            onChange={changeHandler}
          />
        </label>
        <label htmlFor="director">
          Director
          <input
            type="text"
            name="director"
            placeholder="Director"
            value={newMovie.director}
            onChange={changeHandler}
          />
        </label>
        <label htmlFor="metascore">
          Metascore
          <input
            type="text"
            name="metascore"
            placeholder="Metascore"
            value={newMovie.metascore}
            onChange={changeHandler}
          />
        </label>
        <label htmlFor="stars">
          Stars
          <input
            type="text"
            name="stars"
            placeholder="stars"
            value={newMovie.stars}
            onChange={changeHandler}
          />
        </label>
      </form>
    </div>
  ) : (
    <div>Loading movie information...</div>
  );
};

export default UpdateMovie;
