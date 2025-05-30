import React, { useContext, useRef, useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { RiTimer2Line } from "react-icons/ri";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { IoIosTimer } from "react-icons/io";
import { TbNotebook } from "react-icons/tb";
import RidingPopUp from './RidingPopUp';
import { CaptainDataContext } from '../Context/CaptainContext';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ConfirmRidePopupPanel from './ConfirmRidePopupPanel';

const Captaindetails = ({Ride, RidePopupPanel, setRidePopUpPanel,confirmRide}) => {
    const {CaptainData} = useContext(CaptainDataContext);
    const [ConfirmRidePanel, setConfirmPanel] = useState(false);
    const RidePopUpPanelRef = useRef(null);
    const ConfirmRidePopUpPanelRef = useRef(null);
    useGSAP(function () {
        if (RidePopupPanel) {
            gsap.to(RidePopUpPanelRef.current, {
                y: '0'
            })
        } else {
            gsap.to(RidePopUpPanelRef.current, {
                y: '100%'
            })
        }
    }, [RidePopupPanel])

    useGSAP(function () {
        if (ConfirmRidePanel) {
            gsap.to(ConfirmRidePopUpPanelRef.current, {
                y: 0
            })
        } else {
            gsap.to(ConfirmRidePopUpPanelRef.current, {
                y: '100%'
            })
        }
    }, [ConfirmRidePanel])
    return (
        <div>
            <div className='p-3'>
                <div className='mb-2 flex justify-between p-2'>
                    <div className='flex items-center gap-3'>
                        <img className='w-16 rounded-full' src="https://unavatar.io/github/1stevengrant" alt="" />
                        <h2 className='text-2xl font-bold'>Riyaz</h2>
                    </div>
                    <div className='flex justify-end items-center flex-col'>
                        <h1 className='flex items-center text-2xl font-bold'><FaIndianRupeeSign />295.20</h1>
                        <h3 className='text-left w-full text-base text-gray-700 font-medium'>Earned</h3>
                    </div>
                </div>

                <div className='h-[40%] w-full'>
                    <div className='bg-gray-200 flex items-center gap-8 p-4 rounded'>
                        <div>
                            <RiTimer2Line className='mx-auto' size={35} />
                            <h2 className='text-xl font-bold text-center'>10.2</h2>
                            <h4 className='text-center text-sm'>Hours Online</h4>
                        </div>
                        <div>
                            <IoIosTimer className='mx-auto' size={35} />
                            <h2 className='text-xl font-bold text-center'>10.2</h2>
                            <h4 className='text-center text-sm'>Hours Online</h4>
                        </div>
                        <div>
                            <TbNotebook className='mx-auto' size={35} />
                            <h2 className='text-xl font-bold text-center'>10.2</h2>
                            <h4 className='text-center text-sm'>Hours Online</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div ref={RidePopUpPanelRef} className='fixed bottom-0 w-full bg-white p-3 transform translate-y-full'>
                <RidingPopUp confirmRide={confirmRide} Ride={Ride} setRidePopUpPanel={setRidePopUpPanel} setConfirmPanel={setConfirmPanel} />
            </div>
            <div ref={ConfirmRidePopUpPanelRef} className='fixed bottom-0 w-full h-screen bg-white p-3 pt-8 transform'>
                <ConfirmRidePopupPanel Ride={Ride} setConfirmPanel={setConfirmPanel} />
            </div>
        </div>

    )
}

export default Captaindetails