import React from 'react'
import { useSelector } from 'react-redux'

export default function MovieCard({data}) {
    
    return (
        <>
            {
               
              data.map((m, i) => {
                console.log(m)
                return (
                    <div key={i} className="group w-[13vw] ">
                        <figure className="aspect-square overflow-hidden transition">
                            <img
                                className="w-full h-full object-fill transition-transform group-hover:scale-125 rounded-lg"
                                src={`https://image.tmdb.org/t/p/w500/${m.poster_path || m.backdrop_path}`}
                                alt="Movie Poster"
                            />
                        </figure>
                        <div className="p-4 bg-gradient-to-tr from-purple-600 to-orange-400">
                            <h3 className="text-[1vw] font-semibold">{m.original_title || m.original_name}</h3>
                            <p className="font-serif text-[0.8vw] text-zinc-200">{m.overview.length > 50 ? (m.overview.slice(0,50)+"...more") : m.overview}</p>
                            <small className='text-zinc-400'>Release date  {m.release_date ? m.release_date.split("-")[0] : ''}</small>
                        </div>
                        <footer className="flex gap-2 px-4">
                            <button className="text-blue-400 hover:text-red-400">
                                <i className="fa-solid fa-heart" />
                            </button>
                            <button className="text-blue-400 hover:text-red-400">
                                <i className="fa-solid fa-comment" />
                            </button>
                        </footer>
                    </div>
                );
            })}

        </>

    )
}
