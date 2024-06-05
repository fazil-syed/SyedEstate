import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
const ListingItem = ({ listing }) => {
  return (
    <div className="bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow rounded-lg sm:w-[320px]">
      <Link to={`/listing/${listing._id}`} className=" flex flex-col gap-4">
        <img
          src={`${listing.imageUrls[0]}`}
          alt="Listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="text-lg font-semibold text-slate-700 truncate">
            {listing.name}
          </p>
          <div className="flex items-center  gap-1  ">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="truncate text-sm text-gray-600 w-full ">
              {listing.address}
            </p>
          </div>
          <p className="line-clamp-2 text-xs text-slate-600 ">
            {listing.description}
          </p>
          <p className="text-slate-500 mt-2 font-semibold">
            $
            {listing.discountedPrice
              ? listing.discountedPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="flex gap-3 font-bold text-xs text-slate-700">
            <p>
              {listing.bedrooms} {listing.bedrooms > 1 ? "Beds" : "Bed"}
            </p>
            <p>
              {listing.bathrooms} {listing.bathrooms > 1 ? "Baths" : "Bath"}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingItem;
