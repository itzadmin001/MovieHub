import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import Loading from '../utils/Loading';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import Dropdown from './Dropdown';
import Navbar from './Navbar';
import InfiniteScroll from 'react-infinite-scroll-component';

function TvShow() {
    document.title = 'TvShow || Hub' ;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [duration, setDuration] = useState('popular');
    const [category, setCategory] = useState('day');
    const [tvShow, setTvShow] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const durationOptions = [
        { value: 'airing_today', label: 'Airing Today' },
        { value: 'on_the_air', label: 'On the Air' },
        { value: 'popular', label: 'Popular' },
        { value: 'top_rated', label: 'Top Rated' },
    ];

    const fetchData = async () => {
        try {
            const response = await axios.get(`/tv/${duration}?page=${page}`);
            if (response.data.results && response.data.results.length > 0) {
                setTvShow((prevState) => [...prevState, ...response.data.results]);
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
        setTvShow([]);
        setPage(1);
        setHasMore(true);
        setLoading(true);
    };

    useEffect(() => {
        refreshHandler();
    }, [duration]);

    useEffect(() => {
        if (loading) {
            fetchData();
        }
    }, [loading]);

    if (loading) return <Loading />;

    return (
        <div className='w-full bg-[#27272A] md:px-10 px-4 min-h-screen'>
            <div className='py-5 md:px-10 px-3 w-[100%] text-white flex items-center gap-5'>
                <h1 className='md:text-3xl hidden text-zinc-400'>
                    <i onClick={() => navigate(-1)} className="ri-arrow-left-line cursor-pointer pr-2 hover:text-[#1D6D8B] duration-300"></i>
                   TvShow
                </h1>
                <i onClick={() => navigate(-1)} className="ri-arrow-left-line cursor-pointer md:hidden pr-2 hover:text-[#1D6D8B] duration-300"></i>

                <Navbar />
                <div className='md:flex hidden'>
                <Dropdown options={durationOptions} selectedValue={duration} onChange={setDuration} />
                </div>
            </div>
            <InfiniteScroll
                dataLength={tvShow.length}
                next={fetchData}
                hasMore={hasMore}
                loader={<h1>Loading....</h1>}
            >
                <Card data={tvShow} title={'tv'} />
            </InfiniteScroll>
        </div>
    );
}

export default TvShow;
