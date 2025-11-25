"use client";

import { DiVisualstudio } from "react-icons/di";
import { useEffect, useState } from "react";
import AppCard from "@/components/AppCard";

const AllAppsPage = () => {
  const [apps, setapps] = useState([])
  const [appsLoader, setAppsLoader] = useState(true)
  const [totalApps, setTotalApps] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchText, setSearchText] = useState("")
  const [sort, setSort] = useState("")
  const [order, setOrder] = useState("")

  const limit = 12;

  useEffect(() => {
    fetch(`http://localhost:5000/apps?limit=${limit}&skip=${limit * (currentPage - 1)}&sort=${sort}&order=${order}&search=${searchText}`)
      .then((res) => res.json())
      .then((data) => {
        setapps(data.apps)
        setTotalApps(data.totalApps)
        const pages = Math.ceil(data.totalApps / limit);
        setTotalPages(pages);
        setAppsLoader(false)
      });
  }, [currentPage, searchText, sort, order]);

  const handleSearch = (e) => {
    setSearchText(e.target.value)
    setCurrentPage(1)
  }

  const handleSortOrder = (e) => {
    const sortText = e.target.value
    setSort(sortText.split("-")[0]);
    setOrder(sortText.split("-")[1]);
  }

  return (
    <div>
      <title>All Apps | Hero Apps</title>
      {/* Header */}
      <div className="py-16">
        <h2 className="text-4xl font-bold text-center text-primary flex justify-center gap-3">
          Our All Applications
          <DiVisualstudio size={48} className="text-secondary"></DiVisualstudio>
        </h2>
        <p className="text-center text-gray-400">
          Explore All Apps on the Market developed by us. We code for Millions
        </p>
      </div>
      {/* Search and Count */}
      <div className="w-11/12 mx-auto flex flex-col-reverse lg:flex-row gap-5 items-start justify-between lg:items-end mt-10">
        <div>
          <h2 className="text-lg underline font-bold">
            ({totalApps}) Apps Found
          </h2>
        </div>

        <form onChange={handleSearch}>
          <label className="input max-w-[300px] w-[300px] input-secondary">
            <svg
              className="h-[1em] opacity-50"
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
            <input type="search" className="" placeholder="Search Apps" />
          </label>
        </form>

        <div className="">
          <select onChange={handleSortOrder} className="select bg-white">
            <option value="default" disabled className="text-xs">
              Sort by R / S / D
            </option>
            <option value={"rating-desc"}>Ratings : High - Low</option>
            <option value={"rating-asc"}>Ratings : Low - High</option>
            <option value={"size-desc"}>Size : High - Low</option>
            <option value={"size-asc"}>Size : Low - High</option>
            <option value={"downloads-desc"}>Downloads : High - Low</option>
            <option value={"downloads-asc"}>Downloads : Low - High</option>
          </select>
        </div>
      </div>
      {/* Apps Grid */}
      <>
        <div className="w-11/12 mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-10 gap-5">
          {
            appsLoader ? (
              [...Array(12)].map((_, i) => (
                <div key={i} className="flex w-full flex-col gap-4">
                  <div className="skeleton h-52 w-full"></div>
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
              ))
            ) : apps.length === 0 ? (
              <div className="col-span-full text-center py-10 space-y-10">
                <h2 className="text-6xl font-semibold opacity-60">
                  No Apps Found
                </h2>
                <button className="btn btn-primary">Show All Apps</button>
              </div>
            ) : (
              apps.map((app) => <AppCard key={app.id} app={app} />)
            )
          }
        </div>
        {/* Pagination */}
        <div className="join flex justify-center w-full py-4">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="join-item btn">«</button>
          {[...Array(totalPages)].map((_, i) => (
            <button key={i} onClick={() => setCurrentPage(i + 1)} className={`join-item btn ${currentPage === i + 1 ? "btn-primary" : ""}`}>{i + 1}</button>
          ))}
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="join-item btn">»</button>
        </div>
      </>
    </div>
  );
};

export default AllAppsPage;
