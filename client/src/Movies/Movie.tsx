import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import MovieCard from './MovieCard';
import { MovieData } from '../types';

interface RouteProps {
  id: string | undefined;
}

interface MovieProps {
  addToSavedList: (movie: MovieData) => void;
}

const Movie = ({
  match,
  history,
  addToSavedList,
}: MovieProps & RouteComponentProps<RouteProps>): React.ReactElement => {
  const [movie, setMovie] = useState<MovieData | null>(null);

  const fetchMovie = (id: string): void => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res): void => setMovie(res.data))
      .catch((err): void => console.log(err.response));
  };

  const saveMovie = (): void => {
    if (movie) {
      addToSavedList(movie);
    }
  };

  const editMovie = (): void => {
    if (movie) {
      history.push(`/update-movie/${movie.id}`);
    }
  };

  const deleteMovie = async (): Promise<void> => {
    if (movie) {
      try {
        await axios.delete(
          `http://localhost:5000/api/movies/${match.params.id}`
        );
        history.push('/');
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect((): void => {
    if (match.params.id) {
      fetchMovie(match.params.id);
    }
  }, [match.params.id]);

  return movie ? (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <button type="button" className="save-button" onClick={saveMovie}>
        Save
      </button>
      <button type="button" className="edit-button" onClick={editMovie}>
        Edit
      </button>
      <button type="button" className="delete-button" onClick={deleteMovie}>
        Delete
      </button>
    </div>
  ) : (
    <div>Loading movie information...</div>
  );
};

export default Movie;
