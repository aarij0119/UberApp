import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../Components/Logo'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import axios from 'axios';
const UserSignup = () => {
    const navigate = useNavigate();
    const [formdata, setformdata] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    });
    const [formmerror, setformerror] = useState({
        firstname: '',
        email: '',
        password: '',
    });
    const[apians,setapians] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const validator = () => {
        const errors = {};
        const emailregex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const passwordregex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

        if (!formdata.firstname || formdata.firstname == null) {
            errors.firstname = "Firstname can't be empty";
        }
        else if (Number(formdata.firstname)) {
            errors.firstname = "Name can't be a number";
        }
        else if (formdata.firstname.length < 3) {
            errors.firstname = "Name should have maximum 3 character"
        }

        if (!formdata.email) {
            errors.email = "Email can't be empty"
        }
        else if (!emailregex.test(formdata.email)) {
            errors.email = "Enter a valid email"
        }
        if (!formdata.password) {
            errors.password = "Password can't be empty"
        }
        else if (formdata.password.length < 6) {
            errors.password = "Password should have maximum 6 character"
        }
        else if (!passwordregex.test(formdata.password)) {
            errors.password = "At least one uppercase letter, one lowercase, one number, one special character,"
        }
        return errors
    }
    const submithandler = async (e) => {
        e.preventDefault();
        const error = validator();
        if (Object.keys(error).length === 0) {
            console.log("Form data:", formdata);
            try {
                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, formdata);
                console.log(response)
                if(response.status === 201){
                    navigate('/home')
                }
                // const data = response.data;
                // console.log(`data is ${data}`);
                setformdata({
                    firstname: '',
                    lastname: '',
                    email: '',
                    password: ''
                });
            } catch (err) {
                // console.log("Error:", err.response.data.message);
                const apiresponse = err.response.data.message;
                setapians(apiresponse)
                
            }
        } else {
            setformerror(error);
        }
    }
    const changehandler = (e) => {
        const { name, value } = e.target
        setformdata({ ...formdata, [name]: value })
    }
    const showpassword = () => {
        setShowPassword((prev) => !prev);
    }
    
    return (

        <div className='p-4'>
            <div className='-ml-6 h-[5rem] mb-2'>
                <Logo />
            </div>
            <div>
                <form className='flex flex-col gap-4' onSubmit={submithandler}>
                    <label className="font-bold text-base -mb-3">What's your name</label>
                    <div className='flex items-center gap-2'>
                        <div className='w-1/2'>
                            <h4 className='text-red-600 text-sm font-bold mb-2'>{formmerror.firstname}</h4>
                            <input
                                className='bg-gray-200 p-4 w-full focus:outline-yellow-800 rounded'
                                type='text'
                                placeholder='First Name'
                                name='firstname'
                                value={formdata.firstname}
                                onChange={changehandler}
                            />
                        </div>
                        <div className='w-1/2'>
                            <h4 className='text-red-600 text-md font-bold mb-2'>{formmerror.lastname}</h4>
                            <input
                                className='bg-gray-200 p-4 w-full focus:outline-yellow-800 rounded'
                                type='text'
                                placeholder='Last Name'
                                name='lastname'
                                value={formdata.lastname}
                                onChange={changehandler}
                            />
                        </div>
                    </div>
                    <div>
                        <label className='block  mb-2 font-bold text-base'>What's your email</label>
                        <h4 className='text-red-600 text-md font-bold mb-2'>{formmerror.email}</h4>
                        <input
                            className='bg-gray-200 p-4 w-full focus:outline-yellow-800 rounded'
                            type='text'
                            placeholder='example@gmail.com'
                            name='email'
                            value={formdata.email}
                            onChange={changehandler}
                        />
                    </div>
                    <div>
                        <label className='block mb-2 font-bold text-base'>Enter Password</label>
                        <h4 className='text-red-600 text-md font-bold mb-2'>{formmerror.password}</h4>
                        <div className='flex items-center justify-center w-full bg-gray-200 rounded-r rounded-l'>
                            <input
                                className='p-4 bg-gray-200 w-[100%] outline-none rounded-l '
                                type={showPassword ? 'text' : 'password'}
                                placeholder='password'
                                name='password'
                                value={formdata.password}
                                onChange={changehandler}
                            />
                            <h4 onClick={showpassword} className='h-full px-4'>
                                {showPassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
                            </h4>
                        </div>



                    </div>
                    <button className='bg-black text-white p-2 w-full rounded text-lg font-semibold mt-3' type='submit'>Register</button>
                </form>
                <h4 className='text-red-600 text-md font-bold mb-2'>{apians}</h4>
                <Link to={"/login"} className='mt-2 text-blue-500 text-blue flex items-center justify-center'>Alreday have account? Login</Link>

                <Link to={'/captain-signup'} className='bg-green-700 block text-center text-white p-2 mx-auto rounded text-lg font-semibold absolute bottom-8 left-0 right-0 w-[94%]' type='submit'>Sign up as a Captain</Link>
            </div>
        </div>

    )
}

export default UserSignup