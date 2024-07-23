import React, { useEffect } from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux';
import { useLocation} from 'react-router-dom';
import Loading from '../utils/Loading';

function MovieTrailer() {
    const { pathname } = useLocation();
    const category = pathname.includes("movie") ? "movie" : "TvShow"
    console.log(category)
    const ytvideo = useSelector(state => state[category].info);
console.log(ytvideo)

    if (!ytvideo) return <Loading />;
    return (
        <div className=' w-screen h-screen bg-[rgba(0,0,0,.9)] absolute z-[100] top-0 left-0 flex items-center justify-center '>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${ytvideo.video.key}`}/>

        </div>
    )
}

export default MovieTrailer
