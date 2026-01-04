"use client";

import React, { useState, useEffect } from "react";

type CallService = "nhs111" | "samaritans";

const SERVICES = {
  nhs111: {
    name: "NHS 111",
    number: "111",
    displayNumber: "111",
  },
  samaritans: {
    name: "Samaritans",
    number: "116123",
    displayNumber: "116 123",
  },
};

const SUPPORT_MESSAGES = [
  {
    heading: "Need extra support right now?",
    body: "You're not alone. If things feel heavy, these services are here to listen.",
  },
  {
    heading: "You don't have to hold this alone.",
    body: "There's a real human on the other end — ready to listen, no pressure.",
  },
  {
    heading: "Here if you need someone.",
    body: "If things feel heavy right now, there are trained listeners available. You deserve support — even if you're not sure what you need yet",
  },
];

export default function QuickCallButton() {
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [confirmService, setConfirmService] = useState<CallService | null>(
    null,
  );
  const [selectedMessage, setSelectedMessage] = useState<
    (typeof SUPPORT_MESSAGES)[0] | null
  >(null);

  // Close modals on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowSupportModal(false);
        setConfirmService(null);
      }
    };

    if (showSupportModal || confirmService) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [showSupportModal, confirmService]);

  const handleSupportButtonClick = (service: CallService) => {
    setShowSupportModal(false);
    setConfirmService(service);
  };

  const handleConfirmCall = (service: CallService) => {
    const serviceInfo = SERVICES[service];
    window.location.href = `tel:${serviceInfo.number}`;
    setConfirmService(null);
  };

  const handleCancelConfirm = () => {
    setConfirmService(null);
  };

  const handleCloseSupport = () => {
    setShowSupportModal(false);
  };

  const handleOpenSupportModal = () => {
    // Randomly select a message when opening the modal
    const randomIndex = Math.floor(Math.random() * SUPPORT_MESSAGES.length);
    setSelectedMessage(SUPPORT_MESSAGES[randomIndex]);
    setShowSupportModal(true);
  };

  return (
    <>
      {/* Small icon button */}
      <button
        onClick={handleOpenSupportModal}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-purple-200 opacity-75 hover:opacity-85 transition-opacity flex items-center justify-center text-2xl z-40"
        aria-label="Get support"
        style={{
          textShadow: `
            -1px -1px 0 #d4af37,
            1px -1px 0 #d4af37,
            -1px 1px 0 #d4af37,
            1px 1px 0 #d4af37,
            -1px 0 0 #d4af37,
            1px 0 0 #d4af37,
            0 -1px 0 #d4af37,
            0 1px 0 #d4af37
          `,
        }}
      >
        🤍
      </button>

      {/* Support Modal */}
      {showSupportModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4"
          onClick={handleCloseSupport}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-gray-900 text-center">
              {selectedMessage?.heading}
            </h2>
            <p className="text-gray-600 text-center">{selectedMessage?.body}</p>
            <div className="flex flex-col gap-3 mt-2">
              <button
                onClick={() => handleSupportButtonClick("nhs111")}
                className="w-full py-3 px-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
              >
                Call NHS 111
              </button>
              <button
                onClick={() => handleSupportButtonClick("samaritans")}
                className="w-full py-3 px-4 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors"
              >
                Call Samaritans
              </button>
              <button
                onClick={handleCloseSupport}
                className="w-full py-2 px-4 rounded-xl bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-colors mt-2"
              >
                I'm ok
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmService && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4"
          onClick={handleCancelConfirm}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-gray-900 text-center">
              Call {SERVICES[confirmService].name} (
              {SERVICES[confirmService].displayNumber})?
            </h2>
            <p className="text-gray-600 text-center">
              This will open your phone dialler.
            </p>
            <div className="flex gap-3 mt-2">
              <button
                onClick={handleCancelConfirm}
                className="flex-1 py-3 px-4 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-colors"
              >
                I'm okay :)
              </button>
              <button
                onClick={() => handleConfirmCall(confirmService)}
                className="flex-1 py-3 px-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
              >
                Call
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
