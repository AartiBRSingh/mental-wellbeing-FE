"use client";
import React, { useState } from "react";
import {
  X,
  Copy,
  ClipboardX,
  Facebook,
  Twitter,
  Linkedin,
  Mails,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { BsQuora } from "react-icons/bs";

const ShareModal = ({ onClose, copyToClipboard, src }) => {
  const [copied, setCopied] = useState(false);

  // Make sure we have a valid URL to share
  const pageUrl =
    src || (typeof window !== "undefined" ? window.location.href : "");
  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent("Check out this page"); // Default title if none provided

  // Helper function to open share popups with consistent dimensions
  const openSharePopup = (url) => {
    window.open(
      url,
      "",
      "width=600,height=500,location=yes,resizable=yes,scrollbars=yes"
    );
  };

  const buttonStyle =
    "w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer hover:opacity-80";

  return (
    <div className="w-72 relative p-2 rounded-md flex shadow-lg bg-white">
      <div className="w-full">
        <div className="absolute right-2 top-2">
          <button
            onClick={onClose}
            className="cursor-pointer hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex justify-between items-center gap-2 mt-8">
          {/* Facebook */}
          <button
            className={`${buttonStyle} bg-blue-600 hover:bg-blue-700`}
            onClick={() =>
              openSharePopup(
                `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`
              )
            }
          >
            <Facebook size={20} className="text-white" />
          </button>

          {/* Twitter */}
          <button
            className={`${buttonStyle} bg-sky-500 hover:bg-sky-600`}
            onClick={() =>
              openSharePopup(
                `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
              )
            }
          >
            <Twitter size={20} className="text-white" />
          </button>

          {/* LinkedIn */}
          <button
            className={`${buttonStyle} bg-[#0077b5] hover:bg-[#006396]`}
            onClick={() =>
              openSharePopup(
                `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}`
              )
            }
          >
            <Linkedin size={20} className="text-white" />
          </button>

          {/* WhatsApp */}
          <button
            className={`${buttonStyle} bg-green-500 hover:bg-green-600`}
            onClick={() =>
              openSharePopup(
                `https://api.whatsapp.com/send?text=${encodedTitle}%20-%20${encodedUrl}`
              )
            }
          >
            <FaWhatsapp size={20} className="text-white" />
          </button>

          {/* Gmail */}
          <button
            className={`${buttonStyle} bg-red-500 hover:bg-red-600`}
            onClick={() =>
              openSharePopup(
                `https://mail.google.com/mail/?view=cm&fs=1&tf=1&su=${encodedTitle}&body=Check out this page: ${encodedUrl}`
              )
            }
          >
            <Mails size={20} className="text-white" />
          </button>

          {/* Copy URL */}
          <button
            className={`${buttonStyle} bg-gray-500 hover:bg-gray-600`}
            onClick={() => {
              copyToClipboard();
              setCopied(true);
              setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
            }}
          >
            {copied ? (
              <ClipboardX className="text-white" size={20} />
            ) : (
              <Copy className="text-white" size={20} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
