import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Govscheme = () => {
  const [displaydata, setDisplaydata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await fetch(
          `${import.meta.env.VITE_BACKEND_CONNECTION_URL}scheme`,
          {
            method: "GET",
          }
        );
        let datajson = await data.json();
        console.log(datajson);
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
          item.details.short_detail.toLowerCase().includes(searchQuery)
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
        filteredData.map((ele, index) => {
          return (
            <div
              key={index}
              className="card bg-base-100 max-lg:w-80 shadow-xl m-2"
            >
              <div className="card-body">
                <h2 className="card-title">{ele.name}</h2>
                <p>{ele.details.short_detail}</p>
                <div className="card-actions justify-start">
                  {/* You can open the modal using document.getElementById('ID').showModal() method */}
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
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                        </button>
                      </form>
                      <h3 className="font-bold text-lg">{ele.name}</h3>
                      <p className="py-2">
                        Description:
                        <br />
                        {ele.details.brief_detail.description}
                      </p>
                      <p className="py-2">
                        Eligibility:
                        <br />
                        {ele.details.brief_detail.eligible_criteria}
                      </p>
                      <p className="py-2">
                        Scheme for:
                        <br />
                        {ele.details.brief_detail.scheme_for}
                      </p>
                      <p>
                        Website:
                        <br />
                        <a
                          href={ele.details.brief_detail.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {ele.details.brief_detail.website}
                        </a>
                      </p>
                    </div>
                  </dialog>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Govscheme;
