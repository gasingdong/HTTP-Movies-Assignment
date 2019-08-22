import { useState, SetStateAction, Dispatch } from 'react';

interface MovieFormData {
  title: string;
  director: string;
  metascore: string;
  stars: string;
}

const useMovieForm = (): [
  MovieFormData,
  Dispatch<SetStateAction<MovieFormData>>,
  (event: React.ChangeEvent<HTMLInputElement>) => void
] => {
  const [movie, setMovie] = useState<MovieFormData>({
    title: '',
    director: '',
    metascore: '',
    stars: '',
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setMovie({
      ...movie,
      [event.target.name]: event.target.value,
    });
  };

  return [movie, setMovie, changeHandler];
};

export default useMovieForm;
