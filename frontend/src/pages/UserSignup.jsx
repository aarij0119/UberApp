import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Components/Logo'

const UserSignup = () => {
    return (
        
            <div className='p-4'>
                <div className='-ml-6 h-[5rem] mb-2'>
                    <Logo />
                </div>
                <div>
                    <form className='flex flex-col gap-4 mb-6'>
                    <label className="font-bold text-base">What's your name</label>
                        <div className='flex items-center gap-2'>
                            <div className='w-1/2'>
                                <input
                                    className='bg-gray-200 p-4 w-full focus:outline-yellow-800 rounded'
                                    type='password'
                                    required
                                    placeholder='First Name'
                                />
                            </div>
                            <div className='w-1/2'>
                                <input
                                    className='bg-gray-200 p-4 w-full focus:outline-yellow-800 rounded'
                                    type='password'
                                    required
                                    placeholder='Last Name'
                                />
                            </div>
                        </div>
                        <div>
                            <label className='block  mb-2 font-bold text-base'>What's your email</label>
                            <input
                                className='bg-gray-200 p-4 w-full focus:outline-yellow-800 rounded'
                                type='email'
                                required
                                placeholder='example@gmail.com'
                            />
                        </div>
                        <div>
                            <label className='block mb-2 font-bold text-base'>Enter Password</label>
                            <input
                                className='bg-gray-200 p-4 w-full focus:outline-yellow-800 rounded'
                                type='password'
                                required
                                placeholder='password'
                            />
                        </div>
                    </form>

                    <button className='bg-black text-white p-2 w-full rounded text-lg font-semibold' type='submit'>Register</button>

                    <Link to={"/login"} className='mt-2 text-blue-500 text-blue flex items-center justify-center'>Alreday have account? Login</Link>

                    <Link to={'/captain-signup'} className='bg-green-700 block text-center text-white p-2 mx-auto rounded text-lg font-semibold absolute bottom-8 left-0 right-0 w-[94%]' type='submit'>Sign up as a Captain</Link>
                </div>
            </div>
        
    )
}

export default UserSignup