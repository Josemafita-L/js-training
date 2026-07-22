import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import Button from "../../components/common/Button";
import Container from "../../components/common/Container";
import SectionTitle from "../../components/common/SectionTitle";
import { submitBooking } from "../../api/booking";
import type { BookingFormData } from "../../types/Booking";

const initialState: BookingFormData = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  budget: "",
  date: "",
  time: "",
  notes: "",
};

export default function Booking() {
  const [formData, setFormData] =
    useState<BookingFormData>(initialState);
  const [errors, setErrors] = useState({
  fullName: "",
  email: "",
  phone: "",
});
const [loading, setLoading] = useState(false);
  const handleChange = (
  event: ChangeEvent<
    HTMLInputElement |
    HTMLTextAreaElement |
    HTMLSelectElement
  >
) => {
  const { name, value } = event.target;

  setFormData((previous) => ({
    ...previous,
    [name]: value,
  }));

  if (name in errors) {
    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  }
};
const validateForm = () => {
  const newErrors = {
    fullName: "",
    email: "",
    phone: "",
  };

  let isValid = true;

  if (!formData.fullName.trim()) {
    newErrors.fullName = "Full Name is required";
    isValid = false;
  }

  if (!formData.email.trim()) {
    newErrors.email = "Email is required";
    isValid = false;
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      formData.email
    )
  ) {
    newErrors.email = "Enter a valid email";
    isValid = false;
  }

  if (!formData.phone.trim()) {
    newErrors.phone = "Phone Number is required";
    isValid = false;
  } else if (
    !/^[0-9]{10}$/.test(formData.phone)
  ) {
    newErrors.phone =
      "Enter a valid 10-digit phone number";
    isValid = false;
  }

  setErrors(newErrors);

  return isValid;
};
  const handleSubmit = async (
  event: FormEvent
) => {
  event.preventDefault();

  if (!validateForm()) {
    toast.error("Please fix the errors.");
    return;
  }

  setLoading(true);

  try {
    await submitBooking(formData);

    toast.success(
      "Discovery Call Booked Successfully!"
    );

    setFormData(initialState);

    setErrors({
      fullName: "",
      email: "",
      phone: "",
    });

  } catch (error) {

    toast.error(
      "Something went wrong."
    );

    console.error(error);

  } finally {

    setLoading(false);

  }
};

  return (
    <section className="bg-gray-50 py-20">
      <Container>
        <SectionTitle>Book a Discovery Call</SectionTitle>

        <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-gray-600">
          Schedule a free consultation with our team to discuss your
          website requirements.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow-lg"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-3"
              />
              {errors.fullName && (
  <p className="mt-1 text-sm text-red-500">
    {errors.fullName}
  </p>
)}
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Company Name
              </label>

              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-3"
              />
              {errors.email && (
  <p className="mt-1 text-sm text-red-500">
    {errors.email}
  </p>
)}
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-3"
              />
              {errors.phone && (
  <p className="mt-1 text-sm text-red-500">
    {errors.phone}
  </p>
)}
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Budget Range
              </label>

              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-3"
              >
                <option value="">Select Budget</option>
                <option value="Under ₹10,000">Under ₹10,000</option>
                <option value="₹10,000 - ₹25,000">₹10,000 - ₹25,000</option>
                <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                <option value="Above ₹50,000">Above ₹50,000</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Preferred Date
              </label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Preferred Time
              </label>

              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-3"
              >
                <option value="">Select Time</option>
                <option>09:00 AM</option>
                <option>10:00 AM</option>
                <option>11:00 AM</option>
                <option>02:00 PM</option>
                <option>03:00 PM</option>
                <option>04:00 PM</option>
              </select>
            </div>
          </div>

          <div className="mt-8">
            <label className="mb-2 block font-medium">
              Additional Notes
            </label>

            <textarea
              name="notes"
              rows={5}
              value={formData.notes}
              onChange={handleChange}
              placeholder="Anything you'd like us to know?"
              className="w-full rounded-lg border border-gray-300 p-3"
            />
          </div>

          <Button
  type="submit"
  className="mt-8 w-full"
  disabled={loading}
>
  {loading
    ? "Booking..."
    : "Book Discovery Call"}
</Button>
        </form>
      </Container>
    </section>
  );
}