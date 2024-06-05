import React, { useEffect, useState } from "react";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";
const Listing = () => {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountedPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const { currentUser } = useSelector((st) => st.user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { listingId } = useParams();
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  useEffect(() => {
    const handleGetListing = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    handleGetListing();
  }, []);
  return (
    <main>
      {loading && <p className="text-center text-2xl my-7">Loading...</p>}
      {error && (
        <p className="text-center text-2xl my-7">Something Went Wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[500px]"
                  style={{
                    background: `url("${url}") center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex items-center justify-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 bg-slate-100 p-2 rounded-md ">
              Link Copied!
            </p>
          )}
          <div className="max-w-4xl mx-auto p-3 my-7 gap-3 flex flex-col">
            <p className="text-2xl font-semibold">
              {listing.name} - ${" "}
              {listing.offer
                ? listing.discountedPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " / month"}
            </p>
            <p className="flex items-center mt-2 gap-2 text-sm text-slate-600 font-semibold">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full rounded-md max-w-[200px] text-white text-center p-1">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-900 w-full rounded-md max-w-[200px] text-white text-center p-1">
                  ${+listing.regularPrice - +listing.discountedPrice} OFF
                </p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description -</span>{" "}
              {listing.description}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex items-center gap-4 sm:gap-6 flex-wrap">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-xl" /> {listing.bedrooms}{" "}
                {listing.bedrooms > 1 ? `beds` : `bed`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" /> {listing.bathrooms}{" "}
                {listing.bathrooms > 1 ? `baths` : `bath`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-xl" />
                {listing.parking ? `Parking spot` : `No Parking`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-xl" />
                {listing.furnished ? `Furnished` : `Not Furnished`}
              </li>
            </ul>
            {currentUser && listing.userRef === currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
              >
                Contact LandLord
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
};

export default Listing;
