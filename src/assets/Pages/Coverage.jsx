// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { useLoaderData } from "react-router";
// import { useRef } from "react";

// const Coverage = () => {
//   const mapRef = useRef(null);
//   const servicesZone = useLoaderData();
//   console.log(servicesZone);
//   const position = [23.685, 90.3563];
//   const handleSearch = (e) => {
//     e.preventDefault();
//     const location = e.target.location.value;

//     const district = servicesZone.find((c) =>
//       c.district.toLowerCase().includes(location.toLowerCase())
//     );

//     if (district) {
//       const coord = [district.latitude, district.longitude];
//       console.log(district, coord);

//       mapRef.current.flyTo(coord, 14);
//     }
//   };
//   return (
//     <div className="mt-16 shadow-2xl p-8  rounded-2xl bg-white">
//       <h1 className="font-bold text-3xl text-secondary">
//         We are available in 64 Districts
//       </h1>
//       <div className="mt-8">
//         <form onSubmit={handleSearch}>
//           <label className="input rounded-full border border-secondary">
//             <svg
//               className="h-[1em] opacity-50"
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//             >
//               <g
//                 strokeLinejoin="round"
//                 strokeLinecap="round"
//                 strokeWidth="2.5"
//                 fill="none"
//                 stroke="currentColor"
//               >
//                 <circle cx="11" cy="11" r="8"></circle>
//                 <path d="m21 21-4.3-4.3"></path>
//               </g>
//             </svg>
//             <input
//               className=""
//               name="location"
//               type="search"
//               required
//               placeholder="Search Your Location"
//             />
//           </label>
//         </form>
//       </div>
//       <div className="h-[800px] mt-8  border">
//         <MapContainer
//           className="h-[800px]"
//           ref={mapRef}
//           center={position}
//           zoom={13}
//           scrollWheelZoom={false}
//         >
//           <TileLayer
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
//           {servicesZone.map((center) => (
//             <Marker position={[center.latitude, center.longitude]}>
//               <Popup>
//                 <strong>{center.district}</strong> <br /> Service Area:{" "}
//                 {center.covered_area.join(", ")}.
//               </Popup>
//             </Marker>
//           ))}
//         </MapContainer>
//       </div>
//     </div>
//   );
// };

// export default Coverage;
import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const servicesZone = useLoaderData();
  const mapRef = useRef(null);

  const bdBounds = [
    [20.34, 88.03],
    [26.63, 92.67],
  ];

  const position = [23.685, 90.3563];

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value.trim();

    const district = servicesZone.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );

    if (district && mapRef.current) {
      const coord = [district.latitude, district.longitude];
      mapRef.current.flyTo(coord, 10);
    }
  };

  return (
    <div className="mt-16 shadow-2xl p-8 rounded-2xl bg-white">
      <h1 className="text-3xl font-bold text-secondary">
        We are available in 64 Districts
      </h1>

      <div className="mt-8">
        <form onSubmit={handleSearch}>
          <label className="input rounded-full border border-secondary flex items-center">
            <svg
              className="h-[1em] opacity-50 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              name="location"
              placeholder="Search Your Location"
              className="outline-none flex-grow p-2 rounded-full"
              required
            />
          </label>
        </form>
      </div>

      <div className="h-[800px] mt-8 border">
        <MapContainer
          center={position}
          zoom={7}
          scrollWheelZoom={false}
          className="h-[800px]"
          ref={mapRef}
          maxBounds={bdBounds}
          maxBoundsViscosity={1.0}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {servicesZone.map((center, index) => (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
                <strong>{center.district}</strong> <br />
                Service Area: {center.covered_area.join(", ")}.
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
