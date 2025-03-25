import React, { useContext, useState } from 'react'
import Logo from '../Components/Logo'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import axios from 'axios';
import { CaptainDataContext } from '../Context/CaptainContext';

const CaptainLogin = () => {
  const navigate = useNavigate();
  const{setCaptainData}  = useContext(CaptainDataContext);

  const [formdata, setformdata] = useState({
    email: '',
    password: ''
  });

  const [formerror, setformerror] = useState({
    email: '',
    password: ''
  });

  const [hide, sethide] = useState(false);

  const [apiError,setapiError] = useState('');

  const hidehandler = () => {
    sethide((prev) => !prev);
  }
  const changehandler = (e) => {
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value })
  }
  const validator = () => {
    const errors = {};
    const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordregex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!formdata.email || formdata.email === null) {
      errors.email = "Email can't be empty"
    } else if (!emailregex.test(formdata.email)) {
      errors.email = "Please enter a valid email"
    }

    if (!formdata.password || formdata.password === null) {
      errors.password = "Password can't be empty"
    } else if (!passwordregex.test(formdata.password)) {
      errors.password = "Please enter special character and capital letter,number"
    }
    return errors
  }
  const submithandler = async (e) => {
    e.preventDefault();
    const errors = validator();
    setformerror(errors)
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, formdata, {
          withCredentials: true
        });
        if(response.status === 201){
          const data = response.data
          const token = data.token
          localStorage.setItem('captaintoken',token);
          setCaptainData(data);
          navigate('/captain-home')
        }
      } catch (error) {
        const apierror = error.response.data.message
        setapiError(apierror);
      }
    }
  }
  return (

    <div className='p-4'>
      <div className='-ml-6 h-[5rem] mb-2'>
        <Logo />
      </div>
      <div>
        <form onSubmit={submithandler} className='flex flex-col gap-4 mb-6'>
          <div>
            <label className='block mb-2 font-bold text-base'>What's your email</label>
            <span className='text-red-800 font-bold'>{formerror.email}</span>
            <input
              className='bg-gray-200 p-4 w-full rounded'
              placeholder='example@gmail.com'
              value={formdata.email}
              onChange={changehandler}
              name='email'
            />
          </div>
          <div>
            <label className='block mb-2 font-bold text-base'>Enter Password</label>
            <span className='text-red-800 font-bold'>{formerror.password}</span>
            <div className='flex items-center'>
              <input
                className='bg-gray-200 p-4 w-full outline-none rounded-l'
                type={hide ? 'text' : 'password'}
                placeholder='password'
                value={formdata.password}
                onChange={changehandler}
                name='password'
              />
              <button type="button" onClick={hidehandler} className='p-4 bg-gray-200 rounded-r'>
                {hide ? <FaRegEye size={24} /> : <FaRegEyeSlash size={24} />}
              </button>
            </div>
          </div>
          <span className='text-red-800 font-bold'>{apiError}</span>
          <button className='bg-black text-white p-2 w-full rounded text-lg font-semibold' type='submit'>Login</button>
        </form>


        <Link to={"/captain-signup"} className='mt-2 text-blue-500 text-blue flex items-center justify-center'>Join a fleet? Register as a captain</Link>

        <Link to={'/login'} className='bg-green-700 block text-center text-white p-2 mx-auto rounded text-lg font-semibold absolute bottom-8 left-0 right-0 w-[94%]' type='submit'>Sign in as user</Link>
      </div>
    </div>
  )
}

export default CaptainLogin