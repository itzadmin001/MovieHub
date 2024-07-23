import { configureStore } from '@reduxjs/toolkit'
import MovieReducer from '../Store/Reducers/MovieSlice'
import TvShowReducer from '../Store/Reducers/TvShowSlice'

export default configureStore({
  reducer: {
    movie: MovieReducer,
    TvShow: TvShowReducer,


  },
})