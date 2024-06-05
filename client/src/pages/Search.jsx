import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";

const Search = () => {
  const [sideBarData, setSideBarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [listings, setListings] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "createdAt";
      const order = e.target.value.split("_")[1] || "desc";
      setSideBarData({
        ...sideBarData,
        sort,
        order,
      });
    }
    if (e.target.id === "searchTerm") {
      setSideBarData({
        ...sideBarData,
        searchTerm: e.target.value,
      });
    }
    if (
      e.target.id === "offer" ||
      e.target.id === "parking" ||
      e.target.id === "furnished"
    ) {
      setSideBarData({
        ...sideBarData,
        [e.target.id]: e.target.checked || e.target.checked === "true",
      });
    }
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSideBarData({
        ...sideBarData,
        type: e.target.id,
      });
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const urlSearchTerm = urlParams.get("searchTerm");
    const urlType = urlParams.get("type");
    const urlParking = urlParams.get("parking");
    const urlFurnished = urlParams.get("furnished");
    const urlOffer = urlParams.get("offer");
    const urlSort = urlParams.get("sort");
    const urlOrder = urlParams.get("order");
    if (
      urlSearchTerm ||
      urlFurnished ||
      urlOffer ||
      urlOrder ||
      urlParking ||
      urlSort ||
      urlType
    ) {
      setSideBarData({
        searchTerm: urlSearchTerm || "",
        type: urlType || "all",
        parking: urlParking === "true",
        furnished: urlFurnished === "true",
        offer: urlOffer === "true",
        order: urlOrder || "desc",
        sort: urlSort || "createdAt",
      });
    }
    const searchQuery = urlParams.toString();
    const fetchListings = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        if (data.success === false) {
          setLoading(false);
          setError(true);
          return;
        }
        setError(false);
        setLoading(false);
        setListings(data);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchListings();
  }, [location.search]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sideBarData.searchTerm);
    urlParams.set("type", sideBarData.type);
    urlParams.set("offer", sideBarData.offer);
    urlParams.set("parking", sideBarData.parking);
    urlParams.set("furnished", sideBarData.furnished);
    urlParams.set("sort", sideBarData.sort);
    urlParams.set("order", sideBarData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2  md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">Search Term:</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
              value={sideBarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label htmlFor="" className="font-semibold">
              Type
            </label>
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                onChange={handleChange}
                checked={sideBarData.type === "all"}
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={sideBarData.type === "rent"}
              />
              <span>Rent </span>
            </div>
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={sideBarData.type === "sale"}
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={sideBarData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label htmlFor="" className="font-semibold">
              Amenites:
            </label>
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={sideBarData.parking}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={sideBarData.furnished}
              />
              <span>Furnished </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="" className="font-semibold">
              Sort:
            </label>
            <select
              onChange={handleChange}
              value={`${sideBarData.sort}_${sideBarData.order}`}
              id="sort_order"
              className="border rounded-lg p-3 "
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl p-3 font-semibold border-b text-slate-700 mt-5">
          Listing Results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {error && (
            <p className="text-red-700  text-center text-xl">
              Something Went Wrong
            </p>
          )}
          {loading && (
            <p className="text-slate-700  text-center text-xl w-full">
              Loading...
            </p>
          )}
          {!error && !loading && listings && listings.length === 0 && (
            <p className="text-center text-slate-700  text-xl">
              No Listings found!
            </p>
          )}
          {!error &&
            !loading &&
            listings &&
            listings.length !== 0 &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
