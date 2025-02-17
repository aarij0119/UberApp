import React from 'react'
import Logo from '../Components/Logo'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {
  return (
    
    <div className='p-4'>
            <div className='-ml-6 h-[5rem] mb-2'>
                <Logo />
            </div>
            <div>
                <form className='flex flex-col gap-4 mb-7'>
                    <div >
                        <label className='block  mb-2 font-bold text-base'>What's your email</label>
                        <input
                            className='bg-gray-200 p-4 w-full'
                            type='email'
                            required
                            placeholder='example@gmail.com'
                        />
                    </div>
                    <div>
                        <label className='block mb-2 font-bold text-base'>Enter Password</label>
                        <input
                            className='bg-gray-200 p-4 w-full'
                            type='password'
                            required
                            placeholder='password'
                        />
                    </div>
                </form>
                
                <button className='bg-black text-white p-2 w-full rounded text-lg font-semibold' type='submit'>Login</button>
                
                <Link to={"/captain-signup"} className='mt-2 text-blue-500 text-blue flex items-center justify-center'>Join a fleet? Register as a captain</Link>
                
                <Link to={'/login'} className='bg-yellow-600 block text-center text-white p-2 mx-auto rounded text-lg font-semibold absolute bottom-8 left-0 right-0 w-[94%]' type='submit'>Sign in as user</Link>
            </div>
        </div>
  )
}

export default CaptainLogin