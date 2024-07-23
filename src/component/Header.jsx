import React, { useEffect, useState } from 'react'
import axios from '../utils/axios'


function Header() {
    const [wallpaper, setWallpaper] = useState(null);
    const [info, setInfo] = useState(null);
    const getdata = async () => {
        try {
            const data = await axios.get('/trending/all/day')
                .then(
                    (response) => {
                        if (response.data.results && response.data.results.length > 0) {
                            let randomIndex = Math.floor(Math.random() * response.data.results.length);
                            let randomData = response.data.results[randomIndex];
                            setWallpaper(randomData);
                            setInfo(randomData);

                        } else {

                        }
                    }).catch((error) => {
                        console.log(error)
                    })
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        getdata()

    }, [])

    return (
        <>

            <div className='w-[100%] h-[60vh] bg-red-300' style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.7),rgba(0,0,0,0.9)) , url(https://image.tmdb.org/t/p/w500/${wallpaper?.backdrop_path || wallpaper?.poster_path})`,
                backgroundSize: `cover`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
            }}>
                {/* <img src={`https://image.tmdb.org/t/p/w500/${wallpaper?.backdrop_path})`} alt="" className='w-full object-cover h-[100%]' /> */}
                <div className='w-[100%] relative md:top-[5vh] top-[14vh]  px-5 h-[40vh] flex justify-center flex-col text-white '>
                {info && ( // Check if info is not null
                    <>
                        <h1 className='uppercase text-[5vw]'>{info.name || info.original_title}</h1>
                        <p className='md:text-[1vw] text-[2vw] w-[60%]'>{info.overview.length > 200 ? (info.overview.slice(0,180)+"...") : info.overview}</p>
                        <div>
                            <button className='md:w-[9vw] w-[15vw] text-black mt-5 py-2 px-2 bg-white rounded mr-5'>Watch</button>
                            <button className='md:w-[18vw] mt-5 py-2 px-2 bg-transparent rounded border-2 hover:bg-white hover:text-black duration-300 text-white'>
                                More information
                            </button>
                        </div>
                    </>
                )}
                </div>
            </div>
        </>
    )
}

export default Header;
