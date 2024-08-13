import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Education = () => {
  const [displaydata, setDisplaydata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch(
          `${import.meta.env.VITE_BACKEND_CONNECTION_URL}education`,
          {
            method: "GET",
          }
        );
        let datajson = await response.json();
        if (datajson.length > 0) {
          setDisplaydata(datajson);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
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
          item.topic.toLowerCase().includes(searchQuery) ||
          item.website.toLowerCase().includes(searchQuery)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(displaydata);
    }
  }, [location.search, displaydata]);

  return (
    <div className="p-8 min-h-[83vh]">
      {loading ? (
        <div className="grid grid-cols-4 gap-8 p-8 pl-24 min-h-[83vh] max-2xl:grid-cols-3 max-xl:grid-cols-2 max-lg:p-4 max-lg:gap-4 max-md:grid-cols-1 max-md:place-items-center">
          <div className="flex justify-center items-center col-span-4">
            <div className="loader"></div>
          </div>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Topic Name</th>
              <th>Website Name</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center text-2xl">
                  Sorry!!! No Data Found
                </td>
              </tr>
            ) : (
              filteredData.map((ele, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{ele.topic}</td>
                  <td>{ele.website}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Education;
