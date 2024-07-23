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
    <div className=' w-full h-screen '  style={{
      backgroundImage: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.7),rgba(0,0,0,0.9)) , url(https://image.tmdb.org/t/p/w500/${info?.detail.backdrop_path || info?.detail.poster_path})`,
      backgroundSize: `cover`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',

    }} >

      <div className='w-[80%]  px-4 pt-2 mx-auto '>
        <div>
          <nav className=' h-[10vh] text-xl flex gap-5'>
            <Link onClick={() => Navigate(-1)} className="ri-arrow-left-line cursor-pointer pr-2 hover:text-[#1D6D8B] duration-300 text-2xl "></Link>
            <a href={info?.detail.homepage}>
              <i className="ri-external-link-fill"></i>
            </a>
            <a href={`https://www.wikidata.org/wiki/${info?.external.wikidata_id}`}>
              <i className="ri-earth-fill"></i>
            </a>
            <Link to={`https://www.imdb.com/title/${info.external.imdb_id}`} className='font-semibold' >IMDB</Link>
          </nav>
          <div className='w-[100%] flex flex-wrap justify-evenly'>

            <img src={`https://image.tmdb.org/t/p/w500/${info?.detail.poster_path})`} alt="Movie Poster" className='rounded-lg w-[20vw] object-fill shadow-lg' />
            <div className='name w-[70%]'>
              <div className='content ml-[5%] text-zinc-200'>
                <h1 className='text-5xl font-black text-white'>
                  {
                    info.detail.name || info.detail.title || info.detail.original_title || info.detail.original_name

                  }
                  <small className='text-xl font-bold text-zinc-400'>{info.detail.release_date ? info.detail.release_date.split("-")[0] : ''}</small>
                </h1>
                <div className='flex text-zinc-100 item-center gap-x-3 mt-3 mb-4'>
                  <span className='rounded-full text-xl font-semibold bg-yellow-600 text-white w-[5vw] h-[5vh] flex justify-center items-center' >
                    {(info.detail.vote_average * 10).toFixed()}{" "}
                    <span>%</span>
                  </span>
                  <h1 className='w-[60px] font-semibold text-xl = leading-6' >User Score</h1>
                  <h1>{info.detail.release_date}</h1>
                  <h1>{info.detail.genres.map((g) => g.name)}</h1>
                  <h1>{info.detail.runtime}min</h1>
                </div>
                <h1 className=' text-xl font-semibold italic text-zinc-200'>
                  {info.detail.tagline}
                </h1>
                <h1 className='text-2xl mt-5'>OverView</h1>
                <p>{info.detail.overview}</p>
                <h1 className=' text-2xl mt-5 mb-2'>Movie Translate</h1>
                <p className=' text-sm'>{info.translations.join(" , ")}</p>

                <Link className='py-3 px-3 bg-purple-500 rounded relative top-5' to={`${pathname}/trailer`}>
                  <i class="ri-play-line"></i> Play Trailer</Link>
              </div>
            </div>
            <div className='w-[100%]'>

              <div className='flex text-white  flex-col gap-2 pr-3vw'>
                <div className='flex gap-3 mt-2'>
                  <h3 className=' font-semibold mt-2'>Available on Plateform</h3>
                  {

                    info.watchprovider &&
                    info.watchprovider.flatrate &&
                    info.watchprovider.flatrate.map((w , i) => {
                      return (
                        <img title={w.provider_name} key={i} src={`https://image.tmdb.org/t/p/w200/${w.logo_path}`} alt='provider' className='w-[3vw] rounded-lg object-fill cursor-pointer' />
                      )
                    })


                  }
                </div>
                <div className='flex gap-3'>
                  <h3 className=' font-semibold mt-2'>Available for buy</h3>
                  {
                    info.watchprovider &&
                    info.watchprovider.buy &&
                    info.watchprovider.buy.map((w) => {
                      return (
                        <img title={w.provider_name} src={`https://image.tmdb.org/t/p/w200/${w.logo_path}`} alt='provider' className='w-[3vw] rounded-lg object-fill cursor-pointer' />
                      )
                    })
                  }
                </div>
                <div className='flex gap-3'>
                  <h3 className=' font-semibold mt-2'>Available for Rent</h3>
                  {
                    info.watchprovider &&
                    info.watchprovider.rent
                    &&
                    info.watchprovider.rent
                      .map((w) => {
                        return (
                          <img title={w.provider_name} src={`https://image.tmdb.org/t/p/w200/${w.logo_path}`} alt='provider' className='w-[3vw] rounded-lg cursor-pointer' />
                        )
                      })
                  }
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
      <div className="grid justify-center items-center p-8 bg-black">
        <div
          className="flex flex-wrap gap-4 justify-center shrink-0 pb-4 text-white overflow-hidden rounded-2xl shadowhover:shadow-md transition ">

          <MovieCard data={info.Recommendations.length > 0 ? info.Recommendations : info.simillar}/>
        </div>  

      </div>
      <Outlet/>
    </div>
  );
}

export default TvDetails;
