import React, { useState } from 'react';
import Navbar from './Navbar';
import Dropdown from './Dropdown';
import Card from './Card';
import axios from '../utils/axios';
import { useEffect } from 'react';
import Loading from '../utils/Loading';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Trending() {
    const navigate = useNavigate();
    const [category, setCategory] = useState('all');
    const [duration, setDuration] = useState('day');
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const options = [
        { value: 'all', label: 'All' },
        { value: 'movie', label: 'Movies' },
        { value: 'tv', label: 'TV Shows' },
    ];

    const durationOptions = [
        { value: 'day', label: 'Day' },
        { value: 'week', label: 'Week' }
    ];

    const fetchData = async () => {
        try {
            const response = await axios.get(`/trending/${category}/${duration}?page=${page}`);
            if (response.data.results && response.data.results.length > 0) {
                setMovies((prevState) => [...prevState, ...response.data.results]);
                setPage((prevPage) => prevPage + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const refreshHandler = () => {
        setMovies([]);
        setPage(1);
        setHasMore(true);
        setLoading(true);
    };

    useEffect(() => {
        refreshHandler();
    }, [category, duration]);

    useEffect(() => {
        if (loading) {
            fetchData();
        }
    }, [loading]);

    if (loading) return <Loading />;

    return (
        <div className='w-full bg-[#27272A] md:px-10 px-4 min-h-screen relative'>
            <div className='py-5  md:px-10 px-3 w-[100%] text-white flex items-center gap-5'>
                <h1 className='md:text-3xl hidden text-zinc-400'>
                    <i onClick={() => navigate('/')} className="ri-arrow-left-line cursor-pointer pr-2 hover:text-[#1D6D8B] duration-300"></i>
                Trending
                </h1>
                <i onClick={() => navigate(-1)} className="ri-arrow-left-line cursor-pointer md:hidden pr-2 hover:text-[#1D6D8B] duration-300"></i>

                <Navbar />
                <div className='md:flex hidden'>
                    
                <Dropdown options={options} selectedValue={category} onChange={setCategory}/>
                <Dropdown options={durationOptions} selectedValue={duration} onChange={setDuration} />
                </div>
            </div>
            <InfiniteScroll
                dataLength={movies.length}
                next={fetchData}
                hasMore={hasMore}
                loader={<h1>Loading....</h1>}
            >
                <Card data={movies} title={'trending'} />
            </InfiniteScroll>
        </div>
    );
}
