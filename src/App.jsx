import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import Trending from './component/Trending';
import Series from './component/Series';
import Movie from './component/Movie';
import MoviesDetails from './component/MoviesDetails';
import MovieTrailer from './component/MovieTrailer';
import Tvshow from './component/Tvshow';
import TvDetails from './component/TvDetails';
import TvTrailer from './component/TvTrailer';
import Error from './component/Error';

function App() {
  return (
    <Router>
      <div className="flex">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/series" element={<Series />} />
          <Route path="/tv_shows" element={<Tvshow />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/tv/details/:id" element={<TvDetails />} >
            <Route path="/tv/details/:id/trailer" element={<TvTrailer />} />
          </Route>
          <Route path="/movie/details/:id" element={<MoviesDetails />} >
            <Route path="/movie/details/:id/trailer" element={<MovieTrailer />} />
          </Route>
          <Route  path='*' element={<Error/>}/>
        </Routes>

      
      </div>
    </Router>
  );
}

export default App;
