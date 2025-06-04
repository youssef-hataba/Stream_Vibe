"use client";
import {useEffect, useState} from "react";
import Image from "next/image";
import {AiOutlineUser} from "react-icons/ai";
import {getMovieReviews} from "../lib/services/movieService";
import StarRating from "./StarRating";
import Review from "./AddReview";

const MAX_REVIEW_LENGTH = 180;

const MovieReviews = ({movieId}) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndexes, setExpandedIndexes] = useState([]);

  const fetchReviews = async () => {
    try {
      const data = await getMovieReviews(movieId);
      setReviews(data || []);
    } catch (error) {
      console.error("Failed to load reviews", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [movieId]);

  const toggleExpand = (index) => {
    setExpandedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const filteredReviews = reviews
    .filter((review) => {
      const name = review.author?.name;
      const rating = review.author?.rating;
      const content = review.content;
      return name && rating !== null && rating !== undefined && content?.trim();
    })
    .slice(0, 5);

  return (
    <div className="space-y-6 mt-3">
      {loading ? (
        <div className="text-center text-gray-500">Loading reviews...</div>
      ) : filteredReviews.length === 0 ? (
        <div className="text-center text-gray-400 mt-8">
          No reviews yet 😕 — but the spotlight is yours! Be the first to share your thoughts 😃.
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 py-2">
          {filteredReviews.map((review, index) => {
            const name = review.author.name;
            const rating =
              review.source === "tmdb"
                ? (review.author.rating / 2).toFixed(1)
                : review.author.rating;

            const avatarPath = review.author.avatar_path;
            const content = review.content;

            const isExpanded = expandedIndexes.includes(index);
            const shouldTruncate = content.length > MAX_REVIEW_LENGTH;
            const displayedText = isExpanded
              ? content.length > 350
                ? content.slice(0, 350) + "..."
                : content
              : content.slice(0, MAX_REVIEW_LENGTH);
            return (
              <div
                key={review.id || index}
                className="bg-black-10 p-4 rounded-lg border border-black-15 shadow-md flex-shrink-0 w-[280px] md:w-[350px]">
                <div className="flex items-center gap-4 mb-2">
                  {avatarPath ? (
                    <Image
                      src={
                        avatarPath.startsWith("/https")
                          ? avatarPath.slice(1)
                          : avatarPath.startsWith("/")
                          ? `https://image.tmdb.org/t/p/w200${avatarPath}`
                          : avatarPath
                      }
                      alt="User profile"
                      width={36}
                      height={36}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full border border-black-30 p-1 flex items-center justify-center">
                      <AiOutlineUser className="text-black-30 text-3xl" />
                    </div>
                  )}

                  <div>
                    <p className="font-semibold text-gray-100">{name}</p>
                    <div className="flex gap-1">
                      <StarRating
                        actualRating={parseFloat(rating)}
                        StartStyle="w-[20px] h-[8px] bg-blue flex items-center bg-black-8"
                      />
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-300 leading-relaxed">
                  {displayedText}
                  {shouldTruncate && (
                    <span
                      onClick={() => toggleExpand(index)}
                      className="ml-1 text-red-300 cursor-pointer hover:underline">
                      {isExpanded ? " Show less" : "... Show more"}
                    </span>
                  )}
                </p>
              </div>
            );
          })}
        </div>
      )}

      <Review movieId={movieId} onReviewSubmitted={fetchReviews} />
    </div>
  );
};

export default MovieReviews;
