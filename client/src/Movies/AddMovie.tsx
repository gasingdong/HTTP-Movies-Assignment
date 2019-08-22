import React from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import useMovieForm from '../hooks/useMovieForm';

const AddMovie = ({ history }: RouteComponentProps): React.ReactElement => {
  const [movieForm, , changeHandler] = useMovieForm();

  const submitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/movies`, {
        id: Date.now(),
        title: movieForm.title,
        director: movieForm.director,
        metascore: Number(movieForm.metascore),
        stars: movieForm.stars.split(','),
      });
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
            placeholder="Stars"
            value={movieForm.stars}
            onChange={changeHandler}
          />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default AddMovie;
