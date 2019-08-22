import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import { MovieData } from '../types';
import useMovieForm from '../hooks/useMovieForm';

interface RouteProps {
  id: string | undefined;
}

const UpdateMovie = ({
  match,
  history,
}: RouteComponentProps<RouteProps>): React.ReactElement => {
  const [movie, setMovie] = useState<MovieData | null>(null);
  const [movieForm, setMovieForm, changeHandler] = useMovieForm();

  const fetchMovie = (id: string): void => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res): void => {
        setMovie(res.data);
        setMovieForm(res.data);
      })
      .catch((err): void => console.log(err.response));
  };

  const submitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/movies/${match.params.id}`, {
        id: match.params.id,
        title: movieForm.title,
        director: movieForm.director,
        metascore: Number(movieForm.metascore),
        stars: movieForm.stars,
      });
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect((): void => {
    if (match.params.id) {
      fetchMovie(match.params.id);
    }
  }, [match.params.id]);

  return movie && movieForm ? (
    <div className="update-movie">
      <form onSubmit={submitHandler}>
        <label htmlFor="title">
          Title
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={movieForm.title}
            onChange={changeHandler}
          />
        </label>
        <label htmlFor="director">
          Director
          <input
            type="text"
            name="director"
            placeholder="Director"
            value={movieForm.director}
            onChange={changeHandler}
          />
        </label>
        <label htmlFor="metascore">
          Metascore
          <input
            type="text"
            name="metascore"
            placeholder="Metascore"
            value={movieForm.metascore}
            onChange={changeHandler}
          />
        </label>
        <label htmlFor="stars">
          Stars
          <input
            type="text"
            name="stars"
            placeholder="stars"
            value={movieForm.stars}
            onChange={changeHandler}
          />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  ) : (
    <div>Loading movie information...</div>
  );
};

export default UpdateMovie;
