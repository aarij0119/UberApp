import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Components/Logo'

const Home = () => {
    return (
        <div className='w-full h-screen'>
             <div className='bg-[url(https://images.unsplash.com/photo-1587307293162-2fb7a3ebfc75?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHRyYWZmaWMlMjBsaWdodHxlbnwwfHwwfHx8MA%3D%3D)] h-[80%] w-full bg-cover bg-center'>
               <Logo/>
             </div>
             <div className='h-[20%]'>
               <div className='p-4'>
               <h1 className='text-3xl font-bold text-center'>Get Started With Uber</h1>
               </div>
                <div className='px-5'>
                <Link to={'/login'} className='bg-black inline-block w-full text-white text-2xl text-center py-2 pb-3 rounded'>Continue</Link>
                </div>
             </div>
        </div>
    )
}

export default Home