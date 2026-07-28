import Container from "../../components/common/Container";
import SectionTitle from "../../components/common/SectionTitle";
import ReviewCard from "../../components/reviews/ReviewCard";

import { reviews } from "../../data/reviews";

export default function Reviews() {
  return (
    <section className="bg-gray-50 py-20">
      <Container>
        <SectionTitle>Customer Reviews</SectionTitle>

        <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-gray-600">
          Hear what our happy clients have to say about working with us.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}