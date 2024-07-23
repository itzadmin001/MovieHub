import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Card from './Card';
import axios from '../utils/axios';
import Loading from '../utils/Loading';
import { useNavigate } from 'react-router-dom';
import Dropdown from './Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';

function Series() {
    document.title = 'Series || Hub';
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('popular');
    const [series, setSeries] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const options = [
        { value: 'airing_today', label: 'Today' },
        { value: 'on_the_air', label: 'On The Air' },
        { value: 'popular', label: 'Popular' },
        { value: 'top_rated', label: 'Top Rated' },
    ];

    const fetchData = async () => {
        try {
            const response = await axios.get(`/tv/${category}?page=${page}`);
            console.log(response.data.results);
            if (response.data.results && response.data.results.length > 0) {
                setSeries((prevSeries) => [...prevSeries, ...response.data.results]);
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
        setSeries([]);
        setPage(1);
        setHasMore(true);
        setLoading(true);
    };

    useEffect(() => {
        refreshHandler();
    }, [category]);

    useEffect(() => {
        if (loading) {
            fetchData();
        }
    }, [loading]);

    if (loading) return <Loading />;

    return (
        <div className='w-full bg-[#27272A] md:px-10 px-4 min-h-screen'>
            <div className='py-5 md:px-10 px-3 w-[100%] text-white flex items-center gap-5'>
                <h1 className='md:text-3xl text-1xl hidden text-zinc-400 min-w-[16%]'>
                    <i onClick={() => navigate('/')} className="ri-arrow-left-line cursor-pointer pr-2 hover:text-[#1D6D8B] duration-300"></i>
                    Series
                </h1>
                
                <i onClick={() => navigate('/')} className="ri-arrow-left-line cursor-pointer md:hidden pr-2 hover:text-[#1D6D8B] duration-300"></i>

                <Navbar />
                <div className='md:block hidden'>

                <Dropdown options={options} selectedValue={category} onChange={setCategory} />
                </div>
            </div>
            <InfiniteScroll
                dataLength={series.length}
                next={fetchData}
                hasMore={hasMore}
                loader={<h1>Loading....</h1>}
            >
                <Card data={series} title={'series'} />
            </InfiniteScroll>
        </div>
    );
}

export default Series;
