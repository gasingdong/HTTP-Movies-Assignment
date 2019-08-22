import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import { MovieData } from '../types';

interface RouteProps {
  id: string | undefined;
}

const UpdateMovie = ({
  match,
}: RouteComponentProps<RouteProps>): React.ReactElement => {
  const [movie, setMovie] = useState<MovieData | null>(null);

  const fetchMovie = (id: string): void => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res): void => setMovie(res.data))
      .catch((err): void => console.log(err.response));
  };

  useEffect((): void => {
    if (match.params.id) {
      fetchMovie(match.params.id);
    }
  }, [match.params.id]);

  return movie ? (
    <div className="update-movie">
      <form>
        <label htmlFor="title">
          Title
          <input
            type="text"
            name="title"
            placeholder="Title"
            defaultValue={movie.title}
          />
        </label>
      </form>
    </div>
  ) : (
    <div>Loading movie information...</div>
  );
};

export default UpdateMovie;
