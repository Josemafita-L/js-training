import api from "./axios";
import type { BookingFormData } from "../types/Booking";

export const submitBooking = async (data: BookingFormData) => {
  const formattedData = {
    full_name: data.fullName,
    company_name: data.companyName,
    email: data.email,
    phone: data.phone,
    budget: data.budget,
    date: data.date,
    time: data.time,
    notes: data.notes,

    slot_id: data.slotId,   // ✅ Added
  };

  const response = await api.post("/bookings", formattedData);

  return response.data;
};

export const getBookings = async () => {
  const response = await api.get("/bookings");
  return response.data;
};

export const deleteBooking = async (id: number) => {
  const response = await api.delete(`/bookings/${id}`);
  return response.data;
};