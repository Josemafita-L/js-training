import type { Review } from "../../data/reviews";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({
  review,
}: ReviewCardProps) {
  return (
    <div className="rounded-xl bg-white p-8 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="flex items-center gap-4">
        <img
          src={review.avatar}
          alt={review.name}
          className="h-16 w-16 rounded-full object-cover"
        />

        <div>
          <h3 className="text-xl font-semibold">
            {review.name}
          </h3>

          <p className="text-gray-500">
            {review.company}
          </p>
        </div>
      </div>

      <div className="my-5 text-yellow-500 text-xl">
        {"⭐".repeat(review.rating)}
      </div>

      <p className="text-gray-600 italic">
        "{review.comment}"
      </p>
    </div>
  );
}