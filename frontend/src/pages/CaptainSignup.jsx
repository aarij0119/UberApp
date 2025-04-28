import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../Components/Logo'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import axios from 'axios';
import { CaptainDataContext } from '../Context/CaptainContext';

const CaptainSignup = () => {
  const { setCaptainData } = useContext(CaptainDataContext);
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    vehiclecolor: '',
    vehiclecapacity: '',
    vehiclenumber: '',
    vehicleType: ''
  });
  const [formerrors, setformerrors] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    vehiclecolor: '',
    vehiclecapacity: '',
    vehiclenumber: '',
    vehicleType: ''
  });
  const [hide, sethide] = useState(false);

  const [apiError, setapiError] = useState('');

  const showhandler = () => {
    sethide((prev) => !prev)
  }


  function validator() {
    const errors = {};
    const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordregex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!formdata.firstname || formdata.firstname === null) {
      errors.firstname = "First name can't be empty";
    } else if (Number(formdata.firstname)) {
      errors.firstname = "First name can't be a number";
    }

    if (!formdata.email || formdata.email === null) {
      errors.email = "Email can't be empty";
    } else if (!emailregex.test(formdata.email)) {
      errors.email = "Please enter a valid email";
    }

    if (!formdata.password || formdata.password === null) {
      errors.password = "Password can't be empty";
    } else if (!passwordregex.test(formdata.password)) {
      errors.password = "Include special character and a capital,number,write minimum 8 char.";
    }

    if (!formdata.vehiclecolor || formdata.vehiclecolor === null) {
      errors.vehiclecolor = "Vehicle color can't be empty";
    } else if (Number(formdata.vehiclecolor)) {
      errors.vehiclecolor = "vehicle color can't be a number"
    }

    if (!formdata.vehiclecapacity || formdata.vehiclecapacity === null) {
      errors.vehiclecapacity = "Vehicle plate can't be empty";
    } else if (!Number(formdata.vehiclecapacity)) {
      errors.vehiclecapacity = "Enter valid no."
    }

    if (!formdata.vehiclenumber || formdata.vehiclenumber === null) {
      errors.vehiclenumber = "Vehicle number can't be empty";
    }
    if (!formdata.vehicleType || formdata.vehicleType === null) {
      errors.vehicleType = "Please select a vehicle type";
    }
    return errors;
  }

  const changehandler = (e) => {
    const { name, value } = e.target
    setformdata({ ...formdata, [name]: value })
  }
  const submithandler = async (e) => {
    e.preventDefault();
    const errors = validator();
    setformerrors(errors);
    
    if (Object.keys(errors).length === 0) {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, formdata, {
                withCredentials: true
            });

            if (response.status === 200) {
                const data = response.data;
                const token = data.token;
                localStorage.setItem('CaptainId',data.createdcaptain._id)
                localStorage.setItem('captaintoken', token);
                setCaptainData(data);
                navigate('/captain-home');

                setformdata({
                    firstname: '',
                    lastname: '',
                    email: '',
                    password: '',
                    vehiclecolor: '',
                    vehiclecapacity: '',
                    vehiclenumber: '',
                    vehicleType: ''
                });
            }
        } catch (error) {
            let apierror = "";
            if (error.response && error.response.data && error.response.data.message) {
                apierror = error.response.data.message;
            } else {
                apierror = error.message;
            }

            setapiError(apierror);
        }
    }
};

  return (

    <div className='p-4'>
      <div className='mb-2'>
        <Logo />
      </div>
      <div>
        <form onSubmit={submithandler} className='flex flex-col  gap-3 mb-5'>
          <label className="font-bold text-base mt-2">What's your name</label>
          <span className='text-red-800 font-bold'>{formerrors.firstname}</span>
          <div className='flex items-center gap-2 -mt-2'>
            <div className='w-1/2 '>
              <input
                className='bg-gray-200 p-4 w-full focus:outline-yellow-800 rounded'
                type='text'
                placeholder='First Name'
                onChange={changehandler}
                value={formdata.firstname}
                name='firstname'
                autoComplete='off'
              />
            </div>
            <div className='w-1/2'>
              <input
                className='bg-gray-200 p-4 w-full focus:outline-yellow-800 rounded'
                type='text'
                placeholder='Last Name'
                onChange={changehandler}
                value={formdata.lastname}
                autoComplete='off'
                name='lastname'
              />
            </div>
          </div>
          <div>
            <label className='block  mb-2 font-bold text-base'>What's your email</label>
            <span className='text-red-800 font-bold'>{formerrors.email}</span>
            <input
              className='bg-gray-200 p-4 w-full focus:outline-yellow-800 rounded lowercase'
              type='text'
              placeholder='example@gmail.com'
              onChange={changehandler}
              value={formdata.email}
              name='email'
              autoComplete='off'
            />
          </div>
          <div>
            <label className='block mb-2 font-bold text-base'>Enter Password</label>
            <span className='text-red-800 font-bold'>{formerrors.password}</span>
            <div className='flex items-center'>
              <input
                className='bg-gray-200 p-4 w-full outline-none rounded-l'
                type={hide ? 'text' : 'password'}
                placeholder='password'
                onChange={changehandler}
                value={formdata.password}
                autoComplete='off'
                name='password'
              />
              <h4 onClick={showhandler} className='p-4 rounded-r bg-gray-200'>{hide ? <FaRegEye size={24} /> : <FaRegEyeSlash size={24} />}</h4>
            </div>
          </div>
          <label className='block  font-bold text-base'>vehicle information</label>
          <div className='grid grid-cols-2 gap-2'>
            <div>
              <span className='text-red-800 font-bold'>{formerrors.vehiclecolor}</span>
              <input
                className='bg-gray-200 p-4 w-full focus:outline-yellow-800 rounded'
                type='text'
                placeholder='Vehicle Color'
                onChange={changehandler}
                value={formdata.vehiclecolor}
                name='vehiclecolor'
                autoComplete='off'
              />
            </div>
            <div>
              <span className='text-red-800 font-bold'>{formerrors.vehiclecapacity}</span>
              <input
                className='bg-gray-200 p-4 w-full focus:outline-yellow-800 rounded'
                type='text'
                placeholder='Vehicle Capacity'
                onChange={changehandler}
                value={formdata.vehiclecapacity}
                name='vehiclecapacity'
                autoComplete='off'
              />
            </div>
            <div>
              <span className='text-red-800 font-bold'>{formerrors.vehiclenumber}</span>
              <input
                className='bg-gray-200 p-4 w-full focus:outline-yellow-800 rounded uppercase'
                type='text'
                placeholder='Vehicle Number'
                onChange={changehandler}
                value={formdata.vehiclenumber}
                name='vehiclenumber'
                autoComplete='off'
              />
            </div>
            <div>
              <span className='text-red-800 font-bold'>{formerrors.vehicleType}</span>
              <select onChange={changehandler} value={formdata.vehicleType} name='vehicleType' className="bg-gray-200 p-4 w-full focus:outline-yellow-800 rounded">
                <option value="">Select a vehicle</option>
                <option selected value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="motorcycle">Motorcycle</option>
              </select>

            </div>
          </div>
          <button className='bg-black text-white p-2 w-full rounded text-lg font-semibold' type='submit'>Register</button>
        </form>
        <span className='text-red-800 font-bold'>{apiError}</span>
        <Link to={"/captain-login"} className='mt-2 text-blue-500 text-blue flex items-center justify-center'>Alreday have account? Login</Link>

        {/* <Link to={'/signup'} className='bg-green-700 block text-center text-white p-2 mx-auto rounded text-lg font-semibold absolute bottom-8 left-0 right-0 w-[94%]' type='submit'>Sign up as a user</Link> */}
      </div>
    </div>

  )
}

export default CaptainSignup