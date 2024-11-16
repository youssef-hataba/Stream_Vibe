"use client";
import { useState, useEffect } from "react";
import StarRating from "@/app/_components/StarRating";

import supabase from "@/app/lib/supabaseClient";
import { updateUserRatings } from "../lib/services/profileService";
import Alert from "./Alert";

const Rating = ({ movieId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: "", type: "info" });

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);

      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user || null);
      });

      return () => {
        authListener?.subscription.unsubscribe();
      };
    };

    fetchSession();
  }, []);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleRate = async () => {
    if (!user?.email) {
      setAlert({ message: "You need to be logged in to rate a movie.", type: "danger" });
      return;
    }

    const email = user.email;

    try {
      await updateUserRatings(email, movieId, rating);
      setAlert({ show: true, message: "Rating submitted successfully!", type: "success" });
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating rating:", error.message);
      setAlert({ show: true, message: "Error updating rating: " + error.message, type: "danger" });
    }
  };

  return (
    <div>

      {alert.show && <Alert message={alert.message} type={alert.type} duration={5000} />}

      <div className="flex justify-center items-center bg-black-10 p-8 rounded-lg mb-6 border border-black-15">
        <span className="flex justify-center">
          {isOpen && (
            <span className="flex justify-center gap-5">
              <StarRating
                rating={rating}
                setRating={setRating}
                color="#CA8A04"
                pStyle="text-yellow-600"
              />
              {rating > 0 && (
                <button
                  onClick={handleRate}
                  className="rounded-md text-sm text-black-6 px-2 font-semibold bg-yellow-600 hover:scale-105 transition-all duration-150">
                  Rate
                </button>
              )}
            </span>
          )}
        </span>
        <button
          className="text-xl font-semibold border border-black-15 rounded-lg py-2 px-4 text-gray-75 ml-auto"
          onClick={handleOpen}>
          <span className="text-xl">+</span> Add Your Rating
        </button>
      </div>
    </div>
  );
};

export default Rating;
