import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Contact = ({ listing }) => {
  const [landLord, setLandlord] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        setError(false);
        setLoading(true);
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        if (data.success === false) {
          setLoading(false);
          setError(data.message);
          return;
        }
        setLoading(false);
        setError(false);
        setLandlord(data);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };
    fetchLandlord();
  }, []);
  return (
    <div>
      {!error && !loading && landLord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landLord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border p-3 rounded-lg"
            placeholder="Enter your message"
          ></textarea>
          <Link
            to={`mailto:${landLord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="p-3 rounded-lg bg-slate-700 uppercase text-center text-white hover:opacity-95"
          >
            Send Message
          </Link>
        </div>
      )}
      {error && <p className="text-sm text-red-700 mt-7">{error}</p>}
      {loading && <p className="text-sm text-slate-700 mt-7">Loading....</p>}
    </div>
  );
};

export default Contact;
