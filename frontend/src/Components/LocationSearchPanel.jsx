import React from 'react'
import { MdLocationPin } from "react-icons/md";
const LocationSearchPanel = ({setVehiclepanel,setpanleopen}) => {
  const locations = [
    "Sector 26, Bapu Dham Colony, Chandigarh",
    "24B, Near kappor's Cafe, Sheryians Coding School, Bhopal",
    "Sector 28, Near Grain Market, Chandigarh",
    "24B, Near kappor's Cafe, Sheryians Coding School, Bhopal",
    "Sector 26, Bapu Dham Colony, Chandigarh"
  ];
  return (
    // [#eeeeeebe]
    <div className=' w-full flex flex-col gap-3'>
      {locations.map((location,key)=>{
       return <div onClick={()=>{ setVehiclepanel(true),setpanleopen(false)}} key={key} className='bg-[#eeeeeebe] p-4 flex items-center gap-2 rounded'>
          <span className='shadow-xl p-2 rounded-full inline-block'><MdLocationPin size={28} /></span>
          <h2 className='text-lg leading-5.5 font-semibold'>{location}</h2>
        </div>
      })}
    </div>
  )
}

export default LocationSearchPanel