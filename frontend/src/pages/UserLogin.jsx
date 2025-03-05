import React, { useContext, useState } from 'react';
import Logo from '../Components/Logo';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import axios from 'axios';
import { UserContextData } from '../Context/UserContext';

const UserLogin = () => {
    const navigate = useNavigate();
    const { setuserdata } = useContext(UserContextData);
    const [formdata, setformdata] = useState({
        email: '',
        password: ''
    });
    const [hide, sethide] = useState(false);
    const[apiresponseerr,setapiresponseerr] = useState('');
    const [formerrors, setformerrors] = useState({
        email: '',
        password: ''
    });
    
    const changehandler = (e) => {
        const { name, value } = e.target;
        setformdata({ ...formdata, [name]: value });
    };

    const validator = () => {
        const emailregex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const passwordregex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        let errors = {};

        if (!formdata.email) {
            errors.email = "Email can't be empty";
        } else if (!emailregex.test(formdata.email)) {
            errors.email = "Please enter a valid email";
        }

        if (!formdata.password) {
            errors.password = "Password can't be empty";
        } else if (!passwordregex.test(formdata.password)) {
            errors.password = "Please add a special character, capital letter, and number";
        }

        return errors;
    };
    const showhandler = () => {
        sethide((prev) => !prev)
    }
    const submithandler = async (e) => {
        e.preventDefault();
        const errors = validator();
        setformerrors(errors);
        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, formdata,{
                    withCredentials:true
                });
                if (response.status === 200) {
                    const data = response.data;
                    localStorage.setItem('token', data.token);
                    setuserdata(data);
                    navigate('/home');
                }
                setformdata({
                    email: '',
                    password: ''
                });
            } catch (error) {
                const apiresponseerr = error.response.data.message;
                setapiresponseerr(apiresponseerr);
            }
        }
    };
    return (
        <div className='p-4'>
            <div className='-ml-6 h-[5rem] mb-2'>
                <Logo />
            </div>
            <div>
                <form className='flex flex-col gap-4 mb-6' onSubmit={submithandler}>
                    <div>
                        <label className='block mb-2 font-bold text-base'>What's your email</label>
                        {formerrors.email && <span className='font-bold text-red-500'>{formerrors.email}</span>}
                        <input
                            className="bg-gray-200 p-2 w-full rounded"
                            type='text'
                            placeholder='example@gmail.com'
                            onChange={changehandler}
                            name='email'
                            value={formdata.email}
                        />
                    </div>
                    <div>
                        <label className='block mb-2 font-bold text-base'>Enter Password</label>
                        {formerrors.password && <span className='font-bold text-red-500'>{formerrors.password}</span>}
                        <div className='flex items-center'>
                            <input
                                className="bg-gray-200 p-2 w-full rounded-l outline-none"
                                type={hide ? 'text' : 'password'}
                                placeholder='password'
                                onChange={changehandler}
                                name='password'
                                value={formdata.password}
                            />
                            <span onClick={showhandler} className='bg-gray-200 p-2.5 rounded-r'>{hide ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}</span>
                        </div>
                    </div>
                    <span className='font-bold text-red-500'>{apiresponseerr}</span>
                    <button type='submit' className='bg-black text-white p-2 w-full rounded text-lg font-semibold outline-none border-0'>
                        Login
                    </button>
                </form>
                <Link to={"/signup"} className='mb-2 flex items-center justify-center hover:text-zinc-600 text-blue-600 mt-2'>
                    New user? create account
                </Link>
                <Link to={'/captain-login'} className='bg-green-700 block text-center text-white p-2 w-[94%] rounded text-lg font-semibold mx-auto absolute bottom-8 left-0 right-0' type='submit'>
                    Login as captain
                </Link>
            </div>
        </div>
    );
};

export default UserLogin;
