import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Components/Logo'

const CaptainSignup = () => {
  const [formdata, setformdata] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    vehiclecolor: '',
    vehicleplate: '',
    vehiclenumber: '',
    vehicletype: ''
  });
  const [formerrors, setformerrors] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    vehiclecolor: '',
    vehicleplate: '',
    vehiclenumber: '',
    vehicletype: ''
  })

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
      errors.password = "Include special character and a capital,number";
    }

    if (!formdata.vehiclecolor || formdata.vehiclecolor === null) {
      errors.vehiclecolor = "Vehicle color can't be empty";
    }else if(Number(formdata.vehiclecolor)){
      errors.vehiclecolor = "vehicle color can't be a number"
    }

    if (!formdata.vehicleplate || formdata.vehicleplate === null) {
      errors.vehicleplate = "Vehicle plate can't be empty";
    }else if(Number(formdata.vehicleplate)){
      errors.vehicleplate = "vehicle color can't be a number"
    }

    if (!formdata.vehiclenumber || formdata.vehiclenumber === null) {
      errors.vehiclenumber = "Vehicle number can't be empty";
    }
    if (!formdata.vehicletype || formdata.vehicletype === null) {
      errors.vehicletype = "Please select a vehicle type";
    }
    return errors;
  }

  const changehandler = (e) => {
    const { name, value } = e.target
    setformdata({ ...formdata, [name]: value })
  }
  const submithandler = (e) => {
    e.preventDefault();
    const errors = validator();
    setformerrors(errors)
    if (Object.keys(errors).length === 0) {
      console.log(formdata)
      console.log("Submitted");
      setformdata({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        vehiclecolor: '',
        vehicleplate: '',
        vehiclenumber: '',
        vehicletype: ''
      })
    }

  }
  return (

    <div className='p-4'>
      <div className='-ml-6 h-[4rem] mb-2'>
        <Logo />
      </div>
      <div>
        <form onSubmit={submithandler} className='flex flex-col gap-4 mb-5'>
          <label className="font-bold text-base">What's your name</label>
          <span className='text-red-800 font-bold'>{formerrors.firstname}</span>
          <div className='flex items-center gap-2'>
            <div className='w-1/2'>
              <input
                className='bg-gray-200 p-4 w-full focus:outline-yellow-800 rounded'
                type='text'
                placeholder='First Name'
                onChange={changehandler}
                value={formdata.firstname}
                name='firstname'
              />
            </div>
            <div className='w-1/2'>
              <input
                className='bg-gray-200 p-4 w-full focus:outline-yellow-800 rounded'
                type='text'
                placeholder='Last Name'
                onChange={changehandler}
                value={formdata.lastname}
                name='lastname'
              />
            </div>
          </div>
          <div>
            <label className='block  mb-2 font-bold text-base'>What's your email</label>
            <span className='text-red-800 font-bold'>{formerrors.email}</span>
            <input
              className='bg-gray-200 p-4 w-full focus:outline-yellow-800 rounded'
              type='text'
              placeholder='example@gmail.com'
              onChange={changehandler}
              value={formdata.email}
              name='email'
            />
          </div>
          <div>
            <label className='block mb-2 font-bold text-base'>Enter Password</label>
            <span className='text-red-800 font-bold'>{formerrors.password}</span>
            <input
              className='bg-gray-200 p-4 w-full focus:outline-yellow-800 rounded'
              type='text'
              placeholder='password'
              onChange={changehandler}
              value={formdata.password}
              name='password'
            />
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
              />
            </div>
            <div>
            <span className='text-red-800 font-bold'>{formerrors.vehicleplate}</span>
              <input
                className='bg-gray-200 p-4 w-full focus:outline-yellow-800 rounded'
                type='text'
                placeholder='Vehicle Plate'
                onChange={changehandler}
                value={formdata.vehicleplate}
                name='vehicleplate'
              />
            </div>
            <div>
            <span className='text-red-800 font-bold'>{formerrors.vehiclenumber}</span>
              <input
                className='bg-gray-200 p-4 w-full focus:outline-yellow-800 rounded'
                type='text'
                placeholder='Vehicle Number'
                onChange={changehandler}
                value={formdata.vehiclenumber}
                name='vehiclenumber'
              />
            </div>
            <div>
            <span className='text-red-800 font-bold'>{formerrors.vehicletype}</span>
              <select onChange={changehandler} value={formdata.vehicletype} name='vehicletype' className="bg-gray-200 p-4 w-full focus:outline-yellow-800 rounded">
                <option value="">Select a vehicle</option>
                <option selected value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="motorcycle">Motorcycle</option>
              </select>

            </div>
          </div>
          <button className='bg-black text-white p-2 w-full rounded text-lg font-semibold' type='submit'>Register</button>
        </form>

        <Link to={"/captain-login"} className='mt-2 text-blue-500 text-blue flex items-center justify-center'>Alreday have account? Login</Link>

        {/* <Link to={'/signup'} className='bg-green-700 block text-center text-white p-2 mx-auto rounded text-lg font-semibold absolute bottom-8 left-0 right-0 w-[94%]' type='submit'>Sign up as a user</Link> */}
      </div>
    </div>

  )
}

export default CaptainSignup