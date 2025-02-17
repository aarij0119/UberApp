import React from 'react'
import Logo from '../Components/Logo'
import { Link } from 'react-router-dom'

const UserLogin = () => {
    return (
        <div className='p-4'>
            <div className='-ml-6 h-[5rem] mb-2'>
                <Logo />
            </div>
            <div>
                <form className='flex flex-col gap-4 mb-6'>
                    <div >
                        <label className='block  mb-2 font-bold text-base'>What's your email</label>
                        <input
                            className='bg-gray-200 p-2 w-full'
                            type='email'
                            required
                            placeholder='example@gmail.com'
                        />
                    </div>
                    <div>
                        <label className='block mb-2 font-bold text-base'>Enter Password</label>
                        <input
                            className='bg-gray-200 p-2 w-full'
                            type='password'
                            required
                            placeholder='password'
                        />
                    </div>
                </form>
                
                <button className='bg-black text-white p-2 w-full rounded text-lg font-semibold' type='submit'>Login</button>
                <Link to={"/signup"} className='mb-2 flex items-center justify-center hover:text-zinc-600 text-blue-600 mt-2'>New user? create account</Link>

                
                <Link to={'/captain-login'} className='bg-green-700 block text-center text-white p-2 w-[94%] rounded text-lg font-semibold mx-auto absolute bottom-8 left-0 right-0 ' type='submit'>Login as captain</Link>
            </div>
        </div>
    )
}

export default UserLogin