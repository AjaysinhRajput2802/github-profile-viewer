import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./Pagination.css";

const Pagination = ({ noPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(noPages + 1).keys()].slice(1);
  const lastPageSetNo = Math.ceil(noPages / 9);
  const [currentPageNumbers, setCurrentPageNumbers] = useState([]);
  const [OnscreenPages, setOnscreenPages] = useState(1);

  useEffect(() => {
    const pageNumber = [...Array(noPages + 1).keys()].slice(1);
    setCurrentPageNumbers(pageNumber.slice(0, Math.min(9, pageNumber.length)));
  }, [noPages]);

  const olderPages = () => {
    //console.log(OnscreenPages);
    if (OnscreenPages !== 1) {
      setOnscreenPages((prev) => prev - 1);
      //console.log(OnscreenPages);
      setCurrentPageNumbers(
        pageNumbers.slice(9 * (OnscreenPages - 2), 9 * (OnscreenPages - 1))
      );
    }
  };

  const newerPages = () => {
    //console.log(OnscreenPages);
    if (OnscreenPages !== lastPageSetNo) {
      setOnscreenPages((prev) => prev + 1);
      //console.log(OnscreenPages);
      setCurrentPageNumbers(
        pageNumbers.slice(9 * OnscreenPages, 9 * (OnscreenPages + 1))
      );
    }
  };

  const nextPage = () => {
    if (currentPage !== noPages) {
      //console.log(currentPage, OnscreenPages);
      if (currentPage === 9 * OnscreenPages) newerPages();
      //console.log(currentPageNumbers);
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage !== 1) {
      if (currentPage === 9 * (OnscreenPages - 1) + 1) olderPages();
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <Button className="page-link" onClick={prevPage}>
            Previous
          </Button>
        </li>
        {currentPageNumbers.map((pgNumber) => (
          <li
            key={pgNumber}
            className={`page-item ${currentPage === pgNumber ? "active" : ""} `}
          >
            <Button
              onClick={() => setCurrentPage(pgNumber)}
              className="page-link"
            >
              {pgNumber}
            </Button>
          </li>
        ))}
        <li className="page-item">
          <Button className="page-link" onClick={nextPage}>
            Next
          </Button>
        </li>
      </ul>
      <ul>
        <li className="pageButtons">
          <Button
            className={`button ${OnscreenPages === 1 ? "disabled" : ""}`}
            onClick={olderPages}
          >
            &#10229;Older
          </Button>
        </li>
        <li className="pageButtons">
          <Button
            className={`button ${
              OnscreenPages === lastPageSetNo ? "disabled" : ""
            }`}
            onClick={newerPages}
          >
            Newer&#10230;
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
