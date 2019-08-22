import React from 'react';
import { MovieData } from '../types';

interface MovieCardProps {
  movie: MovieData;
}

const MovieCard = ({ movie }: MovieCardProps): React.ReactElement => {
  const { title, director, metascore, stars } = movie;
  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(
        (star): React.ReactElement => (
          <div key={star} className="movie-star">
            {star}
          </div>
        )
      )}
    </div>
  );
};

export default MovieCard;
