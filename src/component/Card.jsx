import React, { useState } from 'react'
import axios from '../utils/axios';
import { useEffect } from 'react';
import Loading from '../utils/Loading';
import { Link } from 'react-router-dom';

export default function Card({data , title}) {
    const [TvShow, setTvShow] = useState([])
    const [loading , Setloading] = useState(true);

    useEffect(() => {
        if (data) {
            setTvShow(data);
            Setloading(false);
        } else {
            const fetchData = async () => {
                try {
                    const response = await axios.get('/trending/all/day');
                    setTvShow(response.data.results);
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    Setloading(false);
                }
            };
            fetchData();
        }
    }, [data]);

    if(loading) return <Loading/>
    
    return (
        
        <> 
                    
                        <div className="flex flex-wrap md:justify-start justify-center md:px-2 gap-3 mt-2">
                            {

                                TvShow.map((M, i) => {
                                    return (
                                        <div key={i} className='mvcard rounded-sm m-2 w-32 overflow-hidden'>
                                            <Link to={`/${title}/details/${M.id}`} className='mposter w-[100%] h-45' >
                                                <img src={`https://image.tmdb.org/t/p/w500${M.poster_path
                                                    }`} alt="" className='w-[100%] rounded-lg shadow-lg' />
                                            </Link>
                                            <h2 className=' md:text-[0.9vw] text-[2.3vw] mt-2 text-white'>{M.
                                                original_title || M.original_name
                                            }</h2>
                                            <h2 className='md:text-[0.6vw] text-[1.5vw] text-zinc-400 '>{M.release_date}</h2>
                                        </div>
                                    )
                                })
                            }

                        </div>
        </>
    )
}
