import React from "react";
import { Star } from "lucide-react";

const CourseReviews = ({
  courseReviews,
  onSubmitReview,
  userId,
  loading,
  rating,
  setRating,
  comment,
  setComment,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmitReview(e);
  };

  return (
    <div className="p-6 border rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Course Reviews</h2>

      {userId && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 bg-gray-50 p-4 rounded-lg"
        >
          <h3 className="text-lg font-semibold mb-3">Write a Review</h3>
          <div className="flex mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="p-1"
              >
                <Star
                  size={24}
                  className={`${
                    star <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  } transition-colors`}
                />
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="block w-full p-3 border rounded mb-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Share your experience with this course..."
            rows="4"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      )}

      <div className="space-y-6">
        {courseReviews && courseReviews.length > 0 ? (
          courseReviews.map((review) => (
            <div key={review._id} className="border-b pb-4">
              <div className="flex items-center gap-4 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      className={`${
                        index < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium text-gray-700">
                  {review.studentId && review.studentId.name
                    ? review.studentId.name
                    : "Anonymous"}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No reviews yet. Be the first to review this course!
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseReviews;
