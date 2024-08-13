import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Health = () => {
  const [displayData, setDisplayData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch(
          `${import.meta.env.VITE_BACKEND_CONNECTION_URL}remedies`,
          {
            method: "GET",
          }
        );
        let dataJson = await response.json();
        console.log(dataJson);
        if (dataJson.length > 0) {
          setDisplayData(dataJson);
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
      const filtered = displayData.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery) ||
          item.purpose.toLowerCase().includes(searchQuery)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(displayData);
    }
  }, [location.search, displayData]);

  return (
    <div>
      <div className="grid grid-cols-4 gap-8 p-8 pl-24 min-h-[83vh] max-2xl:grid-cols-3 max-xl:grid-cols-2 max-lg:p-4 max-lg:gap-4 max-md:grid-cols-1 max-md:place-items-center">
        {loading ? (
          <div className="flex justify-center items-center col-span-4">
            <div className="loader"></div>{" "}
            {/* Add your loader component here */}
          </div>
        ) : filteredData.length === 0 ? (
          <p className="text-center text-2xl">Sorry!!! No Data Found</p>
        ) : (
          filteredData.map((ele, index) => (
            <div
              key={index}
              className="card bg-base-100 max-lg:w-80 shadow-xl m-2"
            >
              <div className="card-body">
                <h2 className="card-title">{ele.name}</h2>
                <p>{ele.purpose}</p>
                <div className="card-actions justify-start">
                  <button
                    className="btn"
                    onClick={() =>
                      document.getElementById(`${ele.id}`).showModal()
                    }
                  >
                    More Details
                  </button>
                  <dialog id={ele.id} className="modal">
                    <div className="modal-box">
                      <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                        </button>
                      </form>
                      <h3 className="font-bold text-lg">{ele.name}</h3>
                      <p className="py-4">{ele.detailed_information}</p>
                    </div>
                  </dialog>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Health;
