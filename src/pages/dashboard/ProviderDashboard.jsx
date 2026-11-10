import React, { useState } from "react";
import { useAuth } from "../../context/useAuth";
import { useBooking } from "../../context/useBooking";
import { ProviderHeader } from "./components/ProviderHeader";
import { ProviderKpiCards } from "./components/ProviderKpiCards";
import { ProviderTabsNav } from "./components/ProviderTabsNav";
import { ProviderOverviewTab } from "./components/ProviderOverviewTab";
import { ProviderRequestsTab } from "./components/ProviderRequestsTab";
import { ProviderServicesTab } from "./components/ProviderServicesTab";
import { ProviderEarningsTab } from "./components/ProviderEarningsTab";
import { AddServiceModal } from "./components/AddServiceModal";

export const ProviderDashboard = () => {
  const { currentUser } = useAuth();
  const {
    bookings,
    updateBookingStatus,
    providerServices,
    addProviderService,
    deleteProviderService,
    showToast
  } = useBooking();

  const [activeTab, setActiveTab] = useState("overview");
  const [isAvailable, setIsAvailable] = useState(true);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);

  const handleToggleAvailability = () => {
    setIsAvailable(!isAvailable);
    showToast(
      !isAvailable
        ? "You are now online and visible for emergency dispatches!"
        : "You are now set to Off Duty.",
      "info"
    );
  };

  const handleCreateService = (serviceData) => {
    addProviderService(serviceData);
    showToast("New service offering published successfully!", "success");
  };

  const pendingOrConfirmedCount = bookings.filter(
    (b) => b.status === "Pending" || b.status === "Confirmed"
  ).length;

  return (
    <div className="min-h-screen bg-[#FAFAFC] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProviderHeader
          currentUser={currentUser}
          isAvailable={isAvailable}
          onToggleAvailability={handleToggleAvailability}
          onOpenAddService={() => setShowAddServiceModal(true)}
        />

        <ProviderKpiCards
          currentUser={currentUser}
          servicesCount={providerServices.length}
        />

        <ProviderTabsNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          requestsCount={pendingOrConfirmedCount}
          servicesCount={providerServices.length}
        />

        {activeTab === "overview" && (
          <ProviderOverviewTab
            bookings={bookings}
            onUpdateStatus={updateBookingStatus}
          />
        )}

        {activeTab === "requests" && (
          <ProviderRequestsTab
            bookings={bookings}
            onUpdateStatus={updateBookingStatus}
          />
        )}

        {activeTab === "services" && (
          <ProviderServicesTab
            providerServices={providerServices}
            onOpenAddService={() => setShowAddServiceModal(true)}
            onDeleteService={deleteProviderService}
          />
        )}

        {activeTab === "earnings" && (
          <ProviderEarningsTab
            onRequestPayout={() =>
              showToast("Payout requested! Processing within 24 hours.", "success")
            }
          />
        )}

        <AddServiceModal
          isOpen={showAddServiceModal}
          onClose={() => setShowAddServiceModal(false)}
          onAddService={handleCreateService}
        />
      </div>
    </div>
  );
};

export default ProviderDashboard;
