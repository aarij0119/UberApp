import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Components/Logo'

const CaptainSignup = () => {

  return (

    <div className='p-4'>
      <div className='-ml-6 h-[4rem] mb-2'>
        <Logo />
      </div>
      <div>
        <form className='flex flex-col gap-4 mb-5'>
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
          <label className='block  font-bold text-base'>vehicle information</label>
          <div className='grid grid-cols-2 gap-2'>
            <div>
              <input
                className='bg-gray-200 p-4 w-full focus:outline-yellow-800 rounded'
                type='password'
                required
                placeholder='Vehicle Color'
              />
            </div>
            <div>
              <input
                className='bg-gray-200 p-4 w-full focus:outline-yellow-800 rounded'
                type='password'
                required
                placeholder='Vehicle Plate'
              />
            </div>
            <div>
              <input
                className='bg-gray-200 p-4 w-full focus:outline-yellow-800 rounded'
                type='password'
                required
                placeholder='Vehicle Number'
              />
            </div>
            <div>
              <select className="bg-gray-200 p-4 w-full focus:outline-yellow-800 rounded" required>
                <option value="">Select a vehicle</option>
                <option selected value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="motorcycle">Motorcycle</option>
              </select>

            </div>
          </div>
        </form>

        <button className='bg-black text-white p-2 w-full rounded text-lg font-semibold' type='submit'>Register</button>

        <Link to={"/captain-login"} className='mt-2 text-blue-500 text-blue flex items-center justify-center'>Alreday have account? Login</Link>

        {/* <Link to={'/signup'} className='bg-green-700 block text-center text-white p-2 mx-auto rounded text-lg font-semibold absolute bottom-8 left-0 right-0 w-[94%]' type='submit'>Sign up as a user</Link> */}
      </div>
    </div>

  )
}

export default CaptainSignup