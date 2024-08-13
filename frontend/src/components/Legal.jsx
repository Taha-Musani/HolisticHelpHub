import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Legal = () => {
  const [displaydata, setDisplaydata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(import.meta.env.VITE_BACKEND_CONNECTION_URL);
        let data = await fetch(
          `${import.meta.env.VITE_BACKEND_CONNECTION_URL}legal`,
          {
            method: "GET",
          }
        );
        let datajson = await data.json();
        if (datajson.length > 0) {
          setDisplaydata(datajson);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("search")?.toLowerCase() || "";

    if (searchQuery) {
      const filtered = displaydata.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery) ||
          item.field_of_expertise.toLowerCase().includes(searchQuery)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(displaydata);
    }
  }, [location.search, displaydata]);

  return (
    <div className="grid grid-cols-4 gap-8 p-8 pl-24 min-h-[83vh] max-2xl:grid-cols-3 max-xl:grid-cols-2 max-lg:p-4 max-lg:gap-4 max-md:grid-cols-1 max-md:place-items-center">
      {loading ? (
        <div className="flex justify-center items-center col-span-4">
          <div className="loader"></div> {/* Add your loader component here */}
        </div>
      ) : filteredData.length === 0 ? (
        <p className="text-center text-2xl">Sorry!!! No Data Found</p>
      ) : (
        filteredData.map((ele, index) => (
          <div
            key={index}
            className="card card-side bg-base-100 shadow-xl border-2 border-slate-500"
          >
            <figure>
              <img className="w-40" src={ele.photo} alt="image" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{ele.name}</h2>
              <p>{ele.field_of_expertise}</p>
              <p>{ele.experience_years}+ years Exp</p>
              <p>{ele.contact_number}</p>
              <p>{ele.rating} out of 5</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Legal;
