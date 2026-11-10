import React, { useState } from "react";
import { useBooking } from "../../context/useBooking";
import { BookingsHeader } from "./components/BookingsHeader";
import { BookingsFilterTabs } from "./components/BookingsFilterTabs";
import { BookingCard } from "./components/BookingCard";
import { BookingsEmptyState } from "./components/BookingsEmptyState";

export const MyBookingsPage = () => {
  const {
    bookings,
    cancelBooking,
    deleteBooking,
    openBookingModalWithPro,
    updateBookingStatus
  } = useBooking();
  const [filterTab, setFilterTab] = useState("all");

  const filteredBookings = bookings.filter((b) => {
    if (filterTab === "active") return b.status === "Pending" || b.status === "Confirmed";
    if (filterTab === "completed") return b.status === "Completed";
    if (filterTab === "cancelled") return b.status === "Cancelled";
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAFAFC] py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <BookingsHeader onNewBooking={() => openBookingModalWithPro(null)} />

        <BookingsFilterTabs
          filterTab={filterTab}
          setFilterTab={setFilterTab}
          bookings={bookings}
        />

        {filteredBookings && filteredBookings.length > 0 ? (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onUpdateStatus={updateBookingStatus}
                onCancel={cancelBooking}
                onDelete={deleteBooking}
              />
            ))}
          </div>
        ) : (
          <BookingsEmptyState />
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
