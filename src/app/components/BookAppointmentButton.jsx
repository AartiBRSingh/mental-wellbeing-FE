"use client";

import React, { useState } from "react";
import ExpertBookingModal from "@/app/components/ExpertBookingModal";

const BookAppointmentButton = ({ expertId }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="w-full bg-green-700 text-white py-3 rounded-xl hover:bg-green-800 transition-colors font-semibold tracking-wider"
      >
        Book Appointment
      </button>

      {showModal && (
        <ExpertBookingModal setShowModal={setShowModal} expertId={expertId} />
      )}
    </>
  );
};

export default BookAppointmentButton;
