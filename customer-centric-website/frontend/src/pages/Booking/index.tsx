import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Button from "../../components/common/Button";
import Container from "../../components/common/Container";
import SectionTitle from "../../components/common/SectionTitle";

import { submitBooking } from "../../api/booking";
import { getSlots } from "../../api/slot";

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

  const [slots, setSlots] = useState<any[]>([]);
  const [selectedSlot, setSelectedSlot] = useState("");

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
  try {
    const data = await getSlots();

    console.log("Slots from API:", data);

    setSlots(data.filter((slot: any) => slot.available));
  } catch (error) {
    console.error("Error fetching slots:", error);
  }
};

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

    if (!selectedSlot) {
      toast.error("Please select a slot.");
      return;
    }

    const slot = slots.find(
      (s: any) => s.ID === Number(selectedSlot)
    );

    if (!slot) {
      toast.error("Invalid slot selected.");
      return;
    }

    setLoading(true);

    try {
      await submitBooking({
  ...formData,
  date: slot.date,
  time: slot.time,
  slotId: slot.ID,
});

      toast.success(
        "Discovery Call Booked Successfully!"
      );

      setFormData(initialState);
      setSelectedSlot("");

      setErrors({
        fullName: "",
        email: "",
        phone: "",
      });

      fetchSlots();

    } catch (error) {
      toast.error("Something went wrong.");
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
          <div className="md:col-span-2">
  <label className="mb-2 block font-medium">
    Available Discovery Slots
  </label>

  <select
  value={selectedSlot}
  onChange={(e) => setSelectedSlot(e.target.value)}
  className="w-full rounded-lg border border-gray-300 p-3"
>
  <option value="">Select a Slot</option>

  {slots.map((slot: any) => (
    <option key={slot.ID} value={slot.ID}>
      {new Date(slot.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })}
      {" • "}
      {new Date(`1970-01-01T${slot.time}`).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}
    </option>
  ))}
</select>

  {slots.length === 0 && (
    <p className="mt-2 text-red-500">
      No slots available.
    </p>
  )}
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