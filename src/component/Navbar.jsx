import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import Loading from '../utils/Loading';
import { Link } from 'react-router-dom';

function Navbar() {
  const menu = [
    {
        name:"Trending",
        path:"/trending",
    },
    {
        name:"TV Shows",
        path:"/tv_shows",
    },
    {
        name:" Series",
        path:"/series",
    },
    {
        name:"Movie",
        path:"/movie",
    }
]

  const [query, setquery] = useState('');
  const [results, setresults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sideMenu, setSideMenu] = useState(false)
  const getdata = async () => {
    if (query) {
      setLoading(true);
      try {
        const d = await axios.get(`/search/movie?query=${query}`);
        setresults(d.data.results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getdata()
  }, [query]);

  return (
    <>
    <div className={`w-full md:hidden absolute top-0 z-[10] ${sideMenu ? 'left-[0%]' : "left-[-100%]"} duration-300 flex bg-black h-screen text-white flex-col items-center gap-8`} >
      <h1 className='text-[4vw] mt-3'> <i className="ri-tv-fill text-[#1D6D8B]"></i> Movies <span className=' text-yellow-500'>HUB</span></h1>
      <ul className='p-4 text-2xl font-semibold flex flex-col'>
        {
            menu.map((item, i) =>{
                return (
                    <Link to={item.path} className='mt-5 px-5 cursor-pointer hover:bg-[#1D6D8B] rounded-lg duration-200' key={i} onClick={() => setSideMenu(!sideMenu)}>{item.name}</Link>
                )
            })
        }
        
      </ul>
     <hr className='w-[80%] h-[1px]'/>
     <h2 className=' text-xl'>Website Information</h2>
     <ul className='text-2xl w-full flex flex-col items-center'>
        <li className='mt-5 px-5 hover:bg-[#1D6D8B] rounded-lg duration-200' >Contact Us</li>
        <li className='mt-5 px-5 hover:bg-[#1D6D8B] rounded-lg duration-200' >Accounts</li>
     </ul> 
    </div>
      <div className='w-full p-3 bg-transparent rounded relative flex'>
        <form action="" className={`text-gray-200 w-[50%] mx-auto flex gap-4 ${sideMenu ? "hidden" : "flex"}`}>
          <i className="ri-search-line"></i>
          <input
            type="text"
            onChange={(e) => setquery(e.target.value)}
            className='w-[60%] rounded-md bg-transparent outline-none'
            placeholder='Search Movies'
          />
        </form>
          <i className={`ri-menu-3-line md:hidden  cursor-pointer z-10 flex text-white ${sideMenu ? "w-full , justify-end" : "flex"}`} onClick={() => setSideMenu(!sideMenu)}></i>
        {query && (
          <div className='w-[32vw] h-[45vh] z-10 absolute left-[50%] top-[100%] -translate-x-[50%] bg-slate-300 overflow-auto'>
            {loading ? (
              <Loading />
            ) : (
              results.map((q, i) => (
                
                <Link to={`/movie/details/${q.id}`} key={i} className='py-2 border border-zinc-400 flex justify-evenly items-center'>
                  <div className='w-[7vw]'>
                    <img src={`https://image.tmdb.org/t/p/w500/${q?.poster_path})`} alt="Movie Poster" className='rounded' />

                  </div>
                  <div className='w-1/2 font-semibold'>
                    <h3 className='text-[1.2vw]'>{q.title}</h3>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
