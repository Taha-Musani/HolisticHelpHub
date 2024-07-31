import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Education = () => {
  const [displaydata, setDisplaydata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await fetch("/education", {
          method: "GET",
        });
        let datajson = await data.json();
        if (datajson.length > 0) {
          setDisplaydata(datajson);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';

    if (searchQuery) {
      const filtered = displaydata.filter(item =>
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
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
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
                <td colSpan="3" className="text-center text-2xl">Sorry!!! No Data Found</td>
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
      </div>
    </div>
  );
};

export default Education;
