import React from 'react'
import SideBar from './SideBar'
import Navbar from './Navbar'
import Header from './Header'
import Card from './Card'

export default function Home() {
    return (
        <>
            <SideBar />
            <div className='md:w-[80%] w-full h-screen bg-zinc-800 overflow-auto'>
                <Navbar/>
                <Header/>
                <Card />
            </div>
        </>
    )
}
