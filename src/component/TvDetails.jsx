import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchTv } from '../Store/actions/TvActions'
import { useDispatch, useSelector } from 'react-redux';
import { removeTv } from '../Store/Reducers/TvShowSlice';
import Loading from '../utils/Loading';
import MovieCard from './MovieCard';

function TvDetails() {
  const { pathname } = useLocation();
  const Navigate = useNavigate()
  const { info } = useSelector(state => state.TvShow)
  const [loading, Setloading] = useState(true);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchTv(id))
    return () => {
      dispatch(removeTv())
    };
  }, []);
  if (!info) return <Loading />
  return (
    <div className=' max-w-full h-screen '  style={{
      backgroundImage: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.7),rgba(0,0,0,0.9)) , url(https://image.tmdb.org/t/p/w500/${info?.detail.backdrop_path || info?.detail.poster_path})`,
      backgroundSize: `cover`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',

    }} >

<div className='max-w-[80%] mx-auto pt-2 px-2 md:px-4'>
  <div>
    <nav className='flex gap-5 text-xl py-3 text-zinc-400 md:h-[10vh]'>
      <Link onClick={() => Navigate(-1)} className="cursor-pointer pr-2 text-2xl ri-arrow-left-line hover:text-[#1D6D8B] duration-300"></Link>
      <a href={info?.detail.homepage}>
        <i className="ri-external-link-fill"></i>
      </a>
      <a href={`https://www.wikidata.org/wiki/${info?.external.wikidata_id}`}>
        <i className="ri-earth-fill"></i>
      </a>
      <Link to={`https://www.imdb.com/title/${info.external.imdb_id}`} className='font-semibold'>IMDB</Link>
    </nav>

    <div className='flex flex-wrap justify-around sm:justify-evenly w-full'>
      <img src={`https://image.tmdb.org/t/p/w500/${info?.detail.poster_path}`} alt="Movie Poster" className='rounded-lg shadow-lg h-[30vh] md:h-[30vh] lg:h-[32vw] object-fill' />
      
      <div className='w-full sm:w-[70%]'>
        <div className='ml-[5%] max-w-full text-zinc-200'>
          <h1 className='text-xl font-black text-white md:text-5xl'>
            {info.detail.name || info.detail.title || info.detail.original_title || info.detail.original_name}
            <small className='font-bold text-xl text-zinc-400'>{info.detail.release_date ? info.detail.release_date.split("-")[0] : ''}</small>
          </h1>
          <div className='flex items-center gap-x-3 mt-3 mb-4 text-zinc-100'>
            <span className='flex items-center justify-center w-[5vw] h-[5vh] text-white bg-yellow-600 rounded-full font-semibold md:text-xl text-sm'>
              {(info.detail.vote_average * 10).toFixed()}%
            </span>
            <h1 className='font-semibold leading-6 md:text-xl md:w-[60px] w-[12vw] text-sm'>User Score</h1>
            <h1>{info.detail.release_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name)}</h1>
            <h1>{info.detail.runtime} min</h1>
          </div>
          <h1 className='italic font-semibold text-sm text-zinc-200 md:text-xl'>{info.detail.tagline}</h1>
          <h1 className='mt-2 text-xl md:text-2xl md:mt-5'>Overview</h1>
          <p className='text-[1vw] md:text-xl'>{info.detail.overview}</p>
          <h1 className='mt-2 text-xl md:text-2xl md:mt-5 mb-2'>Movie Translate</h1>
          <p className='text-[1vw] md:text-sm'>{info.translations.join(" , ")}</p>
          <Link className='relative md:top-5 top-[6vh]  md:py-3 left-[50vw] py-3 px-3 bg-purple-500 rounded' to={`${pathname}/trailer`}>
            <i className="ri-play-line "></i> Play Trailer
          </Link>
        </div>
      </div>

      <div className='w-full'>
        <div className='flex flex-col gap-2 text-white pr-3vw'>
          <div className='flex gap-3 mt-2'>
            <h3 className='mt-1 md:mt-2 font-semibold text-[2vw] md:font-semibold'>Available on Platform</h3>
            {info.watchprovider?.flatrate?.map((w, i) => (
              <img key={i} title={w.provider_name} src={`https://image.tmdb.org/t/p/w200/${w.logo_path}`} alt='provider' className='w-[3vw] object-fill rounded-lg cursor-pointer' />
            ))}
          </div>
          <div className='flex gap-3'>
            <h3 className='mt-1 md:mt-2 font-semibold text-[2vw] md:font-semibold'>Available for Buy</h3>
            {info.watchprovider?.buy?.map((w, i) => (
              <img key={i} title={w.provider_name} src={`https://image.tmdb.org/t/p/w200/${w.logo_path}`} alt='provider' className='w-[3vw] object-fill rounded-lg cursor-pointer' />
            ))}
          </div>
          <div className='flex gap-3'>
            <h3 className='mt-1 md:mt-2 font-semibold text-[2vw] md:font-semibold'>Available for Rent</h3>
            {info.watchprovider?.rent?.map((w, i) => (
              <img key={i} title={w.provider_name} src={`https://image.tmdb.org/t/p/w200/${w.logo_path}`} alt='provider' className='w-[3vw] object-fill cursor-pointer rounded-lg' />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
      <div className="grid justify-center items-center md:p-8 p-2 bg-black">
        <div
          className="flex flex-wrap md:gap-4 gap-3 justify-center md:shrink-0 pb-4 text-white overflow-hidden rounded-2xl shadowhover:shadow-md transition ">

          <MovieCard data={info.Recommendations.length > 0 ? info.Recommendations : info.simillar}/>
        </div>  

      </div>
      <Outlet/>
    </div>
  );
}

export default TvDetails;
