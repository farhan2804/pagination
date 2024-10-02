import React, { useState, useEffect } from "react";
import "./Pagination.css";

const Pagination = () => {
  const [fetchedData, setFetchedData] = useState("");
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const FetchData = async () => {
      try {
        const responseObject = await fetch("https://fakestoreapi.com/products");
        const javaScriptObject = await responseObject.json();
        setFetchedData(javaScriptObject);
      } catch (err) {
        console.log("error fetching data", err);
      } finally {
        setIsDataFetched(true);
      }
    };
    FetchData();
  }, []);

  const disablePrevious = currentIndex === 0;
  const disableNext = currentIndex === fetchedData.length / 4 - 1;

  const handleClick = (id) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentIndex(id - 1);
    setPage(id);
  };

  return (
    <>
      <div className="MainContainer">
        {isDataFetched ? (
          fetchedData.slice(page * 4 - 4, page * 4).map((val) => (
            <div key={val.id} className="FetchedContainer">
              {/* Use unique val.id as key */}
              <h3>{val.title}</h3>
              <img src={val.image} alt={val.title} />
            </div>
          ))
        ) : (
          <p>Loading....</p>
        )}
      </div>
      {isDataFetched && (
        <div className="paginationButtons">
          <button
            onClick={() => handleClick(page - 1)}
            disabled={disablePrevious}
          >
            ◀️
          </button>
          {[...Array(Math.ceil(fetchedData.length / 4))].map((_, idx) => {
            return (
              <button
                className={page === idx + 1 ? "selectedPage" : ""}
                onClick={() => handleClick(idx + 1)}
                key={`page-${idx}`} // Ensure unique key by adding a prefix
              >
                {idx + 1}
              </button>
            );
          })}
          <button onClick={() => handleClick(page + 1)} disabled={disableNext}>
            ▶️
          </button>
        </div>
      )}
    </>
  );
};

export default Pagination;
