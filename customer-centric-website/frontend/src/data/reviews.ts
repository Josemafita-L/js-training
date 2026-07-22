export interface Review {
  id: number;
  name: string;
  company: string;
  rating: number;
  comment: string;
  avatar: string;
}

export const reviews: Review[] = [
  {
    id: 1,
    name: "John Smith",
    company: "ABC Solutions",
    rating: 5,
    comment:
      "Excellent service! The team delivered our website on time and exceeded expectations.",
    avatar: "https://placehold.co/100x100",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    company: "Creative Studio",
    rating: 5,
    comment:
      "Very professional and easy to work with. Highly recommended!",
    avatar: "https://placehold.co/100x100",
  },
  {
    id: 3,
    name: "David Wilson",
    company: "Health Care Plus",
    rating: 4,
    comment:
      "Great communication throughout the project and excellent support.",
    avatar: "https://placehold.co/100x100",
  },
];