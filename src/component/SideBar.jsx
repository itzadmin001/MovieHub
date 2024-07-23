import React from 'react'
import { Link } from 'react-router-dom'

function SideBar() {
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
  return (
    <div className='w-[20%] md:flex hidden bg-zinc-900 h-screen text-white flex-col items-center gap-8' >
      <h1 className='text-[1vw] mt-3'> <i className="ri-tv-fill text-[#1D6D8B]"></i> Movies <span className=' text-yellow-500'>HUB</span></h1>
      <ul className='p-4 text-2xl font-semibold flex flex-col'>
        {
            menu.map((item, i) =>{
                return (

                    <Link to={item.path} className='mt-5 px-5 cursor-pointer hover:bg-[#1D6D8B] rounded-lg duration-200' key={i}>{item.name}</Link>
                )
            })
        }
        
      </ul>
     <hr className='w-[80%] h-[1px]'/>
     <h2 className=' text-xl'>Website Information</h2>
     <ul className='text-2xl w-full flex flex-col items-center'>
        <Link className='mt-5 px-5 hover:bg-[#1D6D8B] rounded-lg duration-200' to={`https://github.com/itzadmin001`} >Contact Us</Link>
        <Link className='mt-5 px-5 hover:bg-[#1D6D8B] rounded-lg duration-200' >Accounts</Link>
     </ul> 
    </div>
  )
}

export default SideBar
