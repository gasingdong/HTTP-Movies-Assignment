import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import { MovieData } from './types';
import UpdateMovie from './Movies/UpdateMovie';

const App = (): React.ReactElement => {
  const [savedList, setSavedList] = useState<MovieData[]>([]);

  const addToSavedList = (movie: MovieData): void => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={(props): React.ReactElement => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route
        path="/update-movie/:id"
        render={(props): React.ReactElement => {
          return <UpdateMovie {...props} />;
        }}
      />
    </>
  );
};

export default App;
