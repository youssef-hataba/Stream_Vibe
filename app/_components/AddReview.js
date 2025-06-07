"use client";

import {useState} from "react";
import StarRating from "@/app/_components/StarRating";
import {useUser} from "@/app/context/UserContext";
import Alert from "./Alert";
import {AiOutlineUser} from "react-icons/ai";
import Image from "next/image";

const Review = ({movieId, onReviewSubmitted}) => {
  const {user, loading,reviews, setReviews} = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [alert, setAlert] = useState({show: false, message: "", type: "info"});

  const existingReview = reviews.find(
    (r) => r.movieId == movieId
  );

  const handleToggle = () => {
    if (!user && !loading) {
      setAlert({
        show: true,
        message: "You need to be logged in to submit a review.",
        type: "danger",
      });
      return;
    }

    if (!isOpen) {
      if (existingReview) {
        setRating(existingReview.rating);
        setReview(existingReview.review);
      } else {
        setRating(0);
        setReview("");
      }
    }

    setIsOpen(!isOpen);
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      setAlert({
        show: true,
        message: "Please select a rating before submitting.",
        type: "danger",
      });
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          movieId,
          rating,
          review,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to submit");

      const updatedReview = data.review;
      setReviews((prev) => {
        const filtered = prev.filter((r) => r.movieId != movieId);
        return [...filtered, updatedReview];
      });

      setAlert({
        show: true,
        message: existingReview
          ? "Your review has been updated!"
          : "Your review has been submitted!",
        type: "success",
      });

      setIsOpen(false);
      setRating(0);
      setReview("");

      if (onReviewSubmitted) onReviewSubmitted();
    } catch (error) {
      console.error(error);
      setAlert({
        show: true,
        message: "Failed to submit your review.",
        type: "danger",
      });
    }
  };

  return (
    <div>
      {alert.show && (
        <Alert
          message={alert.message}
          type={alert.type}
          duration={2000}
          onClose={() => setAlert((prev) => ({...prev, show: false}))}
        />
      )}
      <div className="mt-8">
        <button
          onClick={handleToggle}
          className="text-xl font-semibold border border-black-15 rounded-lg py-2 px-4
          text-gray-75 w-full text-center bg-black-15 transition-all"
        >
          <span className="text-xl">+</span>{" "}
          {existingReview ? "Update Your Review" : "Add Your Review"}
        </button>

        {isOpen && (
          <div className="mt-6 flex flex-col gap-4">
            <div className="flex justify-between items-center flex-col lg:flex-row gap-3">
              <div className="flex items-center gap-3">
                {user.profilePic ? (
                  <Image
                    src={user.profilePic}
                    alt="User profilePic"
                    width={36}
                    height={36}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div
                    className="w-9 h-9 rounded-full border border-black-30 p-1 flex items-center 
                  justify-center">
                    <AiOutlineUser className="text-black-30 text-3xl" />
                  </div>
                )}
                <p className="font-semibold text-white text-lg">{user?.fullName}</p>
              </div>

              <div className="flex items-center gap-4 ">
                <StarRating rating={rating} setRating={setRating} />
              </div>
            </div>

            <textarea
              className="w-full p-3 rounded-md border border-black-15 bg-black-8
              text-gray-80 placeholder-gray-500 focus:outline-none resize-none min-h-[100px]"
              placeholder="Write a review (optional)..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />

            <button
              onClick={handleSubmit}
              className="bg-red-45 flex text-white font-semibold px-4 py-2 rounded-md
              hover:scale-105 transition-all w-fit self-end">
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;