import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import {
  getBookings,
  deleteBooking,
} from "../../api/booking";

import {
  getWebsiteRequests,
  deleteWebsiteRequest,
} from "../../api/website";

import {
  getSlots,
  createSlot,
  deleteSlot,
} from "../../api/slot";

export default function Admin() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [websiteRequests, setWebsiteRequests] = useState<any[]>([]);

  // NEW
  const [slots, setSlots] = useState<any[]>([]);
  // const [date, setDate] = useState("");
  // const [time, setTime] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const bookingData = await getBookings();
      const websiteData = await getWebsiteRequests();
      const slotData = await getSlots();

      setBookings(bookingData);
      setWebsiteRequests(websiteData);
      setSlots(slotData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteWebsite = async (id: number) => {
    try {
      await deleteWebsiteRequest(id);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteBooking = async (id: number) => {
    try {
      await deleteBooking(id);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  // NEW
  const handleAddSlot = async () => {
  if (!selectedDateTime) {
    alert("Please select a date and time.");
    return;
  }

  const date = selectedDateTime
    .toISOString()
    .split("T")[0];

  const time = selectedDateTime.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  try {
    await createSlot({
      date,
      time,
    });

    setSelectedDateTime(null);

    fetchData();
  } catch (error) {
    console.error(error);
  }
};

  // NEW
  const handleDeleteSlot = async (id: number) => {
    try {
      await deleteSlot(id);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="mx-auto max-w-7xl p-8">

      {/* Header */}

      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Statistics */}

      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg bg-blue-500 p-6 text-white shadow">
          <h2 className="text-lg">Website Requests</h2>

          <p className="mt-2 text-4xl font-bold">
            {websiteRequests.length}
          </p>
        </div>

        <div className="rounded-lg bg-green-500 p-6 text-white shadow">
          <h2 className="text-lg">Discovery Calls</h2>

          <p className="mt-2 text-4xl font-bold">
            {bookings.length}
          </p>
        </div>

        <div className="rounded-lg bg-purple-500 p-6 text-white shadow">
          <h2 className="text-lg">Total Records</h2>

          <p className="mt-2 text-4xl font-bold">
            {websiteRequests.length + bookings.length}
          </p>
        </div>
      </div>

      {/* ====================================================== */}
      {/* NEW : SLOT MANAGEMENT */}
      {/* ====================================================== */}

      <h2 className="mb-4 text-2xl font-semibold">
        Manage Available Slots
      </h2>

      <div className="mb-6 flex flex-wrap gap-4">

        <DatePicker
  selected={selectedDateTime}
  onChange={(date) => setSelectedDateTime(date)}
  showTimeSelect
  timeIntervals={30}
  minDate={new Date()}
  dateFormat="dd MMM yyyy, hh:mm aa"
  placeholderText="Select Date & Time"
  className="rounded border p-2 w-72"
/>

        <button
          onClick={handleAddSlot}
          className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Add Slot
        </button>
      </div>

      <table className="mb-10 w-full border border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Date</th>
            <th className="border p-2">Time</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {slots.map((slot: any) => (
            <tr key={slot.ID}>
              <td className="border p-2">
                {slot.date}
              </td>

              <td className="border p-2">
  {new Date(`1970-01-01T${slot.time}`).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  })}
</td>

              
<td className="border border-black-300 px-4 py-3">
  {slot.available ? (
    <span className="font-medium text-green-600">
      🟢 Available
    </span>
  ) : (
    <span className="font-medium text-red-600">
      🔴 Booked
    </span>
  )}
</td>
              <td className="border p-2">
                <button
                  onClick={() =>
                    handleDeleteSlot(slot.ID)
                  }
                  className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Website Requests */}

      <h2 className="mb-4 text-2xl font-semibold">
        Website Requests
      </h2>

      <table className="mb-10 w-full border border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Company</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Pages</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {websiteRequests.map((request: any) => (
            <tr key={request.ID}>
              <td className="border p-2">
                {request.full_name}
              </td>

              <td className="border p-2">
                {request.company_name}
              </td>

              <td className="border p-2">
                {request.email}
              </td>

              <td className="border p-2">
                {request.pages}
              </td>

              <td className="border p-2">
                <button
                  onClick={() =>
                    handleDeleteWebsite(request.ID)
                  }
                  className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Discovery Call Bookings */}

      <h2 className="mb-4 text-2xl font-semibold">
        Discovery Call Bookings
      </h2>

      <table className="w-full border border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Company</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Time</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking: any) => (
            <tr key={booking.ID}>
              <td className="border p-2">
                {booking.full_name}
              </td>

              <td className="border p-2">
                {booking.company_name}
              </td>

              <td className="border p-2">
                {booking.date}
              </td>

              <td className="border p-2">
  {new Date(`1970-01-01T${booking.time}`).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  })}
</td>

              <td className="border p-2">
                <button
                  onClick={() =>
                    handleDeleteBooking(booking.ID)
                  }
                  className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}