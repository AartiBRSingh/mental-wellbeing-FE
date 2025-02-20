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
import CustomCursor from "./CustomCursor";
import { FaWhatsapp } from "react-icons/fa";

const ShareModal = ({ onClose, copyToClipboard, src }) => {
  const [copied, setCopied] = useState(false);
  const url = src?.replace(/ /g, "%20");

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
          {/* Social Share Buttons */}
          <button
            className={`${buttonStyle} bg-blue-600 hover:bg-blue-700`}
            onClick={() =>
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${url}`,
                "_blank"
              )
            }
          >
            <Facebook size={20} className="text-white" />
          </button>

          <button
            className={`${buttonStyle} bg-sky-500 hover:bg-sky-600`}
            onClick={() =>
              window.open(
                `https://twitter.com/intent/tweet?url=${url}`,
                "_blank"
              )
            }
          >
            <Twitter size={20} className="text-white" />
          </button>

          <button
            className={`${buttonStyle} bg-[#0077b5] hover:bg-[#006396]`}
            onClick={() =>
              window.open(
                `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
                "_blank"
              )
            }
          >
            <Linkedin size={20} className="text-white" />
          </button>

          <button
            className={`${buttonStyle} bg-green-500 hover:bg-green-600`}
            onClick={() => window.open(`https://wa.me/?text=${url}`, "_blank")}
          >
            <FaWhatsapp size={20} className="text-white" />
          </button>

          <button
            className={`${buttonStyle} bg-red-500 hover:bg-red-600`}
            onClick={() => window.open(`mailto:?body=${url}`, "_blank")}
          >
            <Mails size={20} className="text-white" />
          </button>

          <button
            className={`${buttonStyle} bg-gray-500 hover:bg-gray-600`}
            onClick={() => {
              copyToClipboard();
              setCopied(true);
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
