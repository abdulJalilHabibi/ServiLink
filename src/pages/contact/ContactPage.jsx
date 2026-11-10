import React from "react";
import { ContactHeader } from "./components/ContactHeader";
import { ContactInfoCards } from "./components/ContactInfoCards";
import { ContactForm } from "./components/ContactForm";
import { ContactFaq } from "./components/ContactFaq";

export const ContactPage = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFC] py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ContactHeader />
        <ContactInfoCards />

        {/* Main Grid: Form + FAQs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-16">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
          <ContactFaq />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
