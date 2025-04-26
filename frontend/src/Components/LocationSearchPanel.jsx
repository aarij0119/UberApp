import React from 'react';
import { MdLocationPin } from "react-icons/md";

const LocationSearchPanel = ({
  setVehiclepanel,
  setpanleopen,
  suggestions,
  setpiclocation,
  setdestination,
  Ispick,
  Isdest,
}) => {

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Iterate over suggestions object */}
      {Object.entries(suggestions).map(([key, locations]) => (
        <div key={key} className="bg-[#eeeeeebe] p-4 rounded">
          <h2 className="text-md font-bold uppercase mb-2">{key}</h2>
          {locations.map((location, index) => (
            <div
              key={index}
              onClick={() => {
                if (Ispick) {
                  setpiclocation(location);
                } else if (Isdest) {
                  setdestination(location);
                }
              }}
              className="p-4 flex items-center gap-2 rounded bg-white mb-2 cursor-pointer"
            >
              <span className="shadow-xl p-2 rounded-full inline-block">
                <MdLocationPin size={28} />
              </span>
              <h2 className="text-lg leading-5.5 font-semibold">{location}</h2>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};


export default LocationSearchPanel;
