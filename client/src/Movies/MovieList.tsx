import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MovieData } from '../types';
import MovieCard from './MovieCard';

interface MovieDetailsProps {
  movie: MovieData;
}

function MovieDetails({ movie }: MovieDetailsProps): React.ReactElement {
  return (
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} />
    </Link>
  );
}

const MovieList = (): React.ReactElement => {
  const [movies, setMovies] = useState<MovieData[]>([]);

  useEffect((): void => {
    axios
      .get('http://localhost:5000/api/movies')
      .then((res): void => setMovies(res.data))
      .catch((err): void => console.log(err.response));
  }, []);

  return (
    <div className="movie-list">
      {movies.map(
        (movie): React.ReactElement => (
          <MovieDetails key={movie.id} movie={movie} />
        )
      )}
    </div>
  );
};

export default MovieList;
