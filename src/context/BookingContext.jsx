import React, { useState, useEffect } from "react";
import { BookingContext } from "./BookingContextObject";

const STORAGE_KEY = "servilink_bookings";
const STORAGE_FAVORITES_KEY = "servilink_favorites";
const STORAGE_SERVICES_KEY = "servilink_provider_services";

export const BookingProvider = ({ children }) => {
  // Bookings state
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load bookings from localStorage", e);
    }
    return [
      {
        id: "KY-839214",
        serviceName: "Emergency Pipe Leak Repair",
        category: "plumbing",
        providerName: "Farhad Mohammad",
        clientName: "Ahmad Shah",
        clientPhone: "0799123456",
        address: "Street 4, Wazir Akbar Khan, Kabul",
        preferredDate: "2026-11-10",
        timeSlot: "Morning (09:00 AM - 12:00 PM)",
        rate: 35,
        status: "Confirmed",
        createdAt: "2026-11-09T08:30:00.000Z",
        notes: "Main shutoff valve leaking in cellar"
      },
      {
        id: "KY-519283",
        serviceName: "Split AC Seasonal Gas Recharge",
        category: "hvac",
        providerName: "Zuhra Alimi",
        clientName: "Ahmad Shah",
        clientPhone: "0799123456",
        address: "Street 4, Wazir Akbar Khan, Kabul",
        preferredDate: "2026-11-12",
        timeSlot: "Afternoon (01:00 PM - 04:00 PM)",
        rate: 45,
        status: "Pending",
        createdAt: "2026-11-09T14:15:00.000Z",
        notes: "Living room unit blowing warm air"
      },
      {
        id: "KY-294810",
        serviceName: "Circuit Breaker Tripping Diagnostics",
        category: "electrical",
        providerName: "Ahmad Tariq Rahimi",
        clientName: "Ahmad Shah",
        clientPhone: "0799123456",
        address: "Street 4, Wazir Akbar Khan, Kabul",
        preferredDate: "2026-11-05",
        timeSlot: "Morning (09:00 AM - 12:00 PM)",
        rate: 40,
        status: "Completed",
        createdAt: "2026-11-04T10:00:00.000Z",
        notes: "All 3 bedrooms lost power after storm"
      }
    ];
  });

  // Favorites state
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_FAVORITES_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load favorites", e);
    }
    return ["pro-1", "pro-2"];
  });

  // Provider's own catalog of services
  const [providerServices, setProviderServices] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SERVICES_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load provider services", e);
    }
    return [
      {
        id: "srv-1",
        title: "Main Circuit Breaker Panel Upgrade",
        category: "electrical",
        rate: 55,
        estimatedHours: "2-3 hours",
        description: "Replacement of obsolete fuse panels with modern RCCB breaker protection.",
        active: true
      },
      {
        id: "srv-2",
        title: "Solar Inverter & Battery Storage Setup",
        category: "electrical",
        rate: 65,
        estimatedHours: "4-6 hours",
        description: "Hybrid inverter wiring, charge controller setup, and lithium battery calibration.",
        active: true
      },
      {
        id: "srv-3",
        title: "24/7 Emergency Blackout Diagnosis",
        category: "electrical",
        rate: 45,
        estimatedHours: "1-2 hours",
        description: "Rapid isolation of shorted circuits, burnt conduits, or generator switch issues.",
        active: true
      }
    ];
  });

  // Modals state
  const [selectedProForBooking, setSelectedProForBooking] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [lastCreatedBooking, setLastCreatedBooking] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedProForDetails, setSelectedProForDetails] = useState(null);

  // Toast notification state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ id: Date.now(), message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    } catch (e) {
      console.error("Failed to persist bookings", e);
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_FAVORITES_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error("Failed to persist favorites", e);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_SERVICES_KEY, JSON.stringify(providerServices));
    } catch (e) {
      console.error("Failed to persist provider services", e);
    }
  }, [providerServices]);

  const addBooking = (newBookingData) => {
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    const trackingId = `KY-${randomCode}`;

    const newBooking = {
      id: trackingId,
      status: "Pending",
      createdAt: new Date().toISOString(),
      ...newBookingData
    };

    setBookings((prev) => [newBooking, ...prev]);
    setLastCreatedBooking(newBooking);
    setIsBookingModalOpen(false);
    setIsConfirmationModalOpen(true);
    showToast(`Service request ${trackingId} created successfully!`, "success");
    return newBooking;
  };

  const cancelBooking = (bookingId) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: "Cancelled" } : b))
    );
    showToast(`Booking ${bookingId} cancelled`, "info");
  };

  const deleteBooking = (bookingId) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    showToast(`Booking ${bookingId} permanently deleted`, "info");
  };

  const updateBookingStatus = (bookingId, newStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
    showToast(`Booking ${bookingId} updated to ${newStatus}`, "success");
  };

  const toggleFavorite = (proId) => {
    setFavorites((prev) => {
      const exists = prev.includes(proId);
      if (exists) {
        showToast("Removed from favorites", "info");
        return prev.filter((id) => id !== proId);
      } else {
        showToast("Saved to favorites!", "success");
        return [...prev, proId];
      }
    });
  };

  const isFavorite = (proId) => favorites.includes(proId);

  // Provider service management
  const addProviderService = (service) => {
    const newSrv = {
      id: `srv-${Date.now()}`,
      active: true,
      ...service
    };
    setProviderServices((prev) => [newSrv, ...prev]);
    showToast("New service offering published!", "success");
  };

  const updateProviderService = (id, updatedFields) => {
    setProviderServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updatedFields } : s))
    );
    showToast("Service details updated!", "success");
  };

  const deleteProviderService = (id) => {
    setProviderServices((prev) => prev.filter((s) => s.id !== id));
    showToast("Service offering removed", "info");
  };

  // Booking modal actions
  const openBookingModalWithPro = (pro) => {
    setSelectedProForBooking(pro);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedProForBooking(null);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
    setLastCreatedBooking(null);
  };

  // Provider profile details modal
  const openProDetails = (pro) => {
    setSelectedProForDetails(pro);
  };

  const closeProDetails = () => {
    setSelectedProForDetails(null);
  };

  const activeBookingsCount = bookings.filter((b) => b.status !== "Cancelled").length;

  return (
    <BookingContext.Provider
      value={{
        bookings,
        activeBookingsCount,
        addBooking,
        cancelBooking,
        deleteBooking,
        updateBookingStatus,
        favorites,
        toggleFavorite,
        isFavorite,
        providerServices,
        addProviderService,
        updateProviderService,
        deleteProviderService,
        selectedProForBooking,
        isBookingModalOpen,
        openBookingModalWithPro,
        closeBookingModal,
        lastCreatedBooking,
        isConfirmationModalOpen,
        closeConfirmationModal,
        selectedProForDetails,
        openProDetails,
        closeProDetails,
        toast,
        showToast,
        hideToast
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export default BookingProvider;
