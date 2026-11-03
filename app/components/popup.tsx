"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { render } from "storyblok-rich-text-react-renderer";
import Image from "next/image";

interface AutoPopupProps {
  delay?: number;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
  onClose?: () => void;
  showOnce?: boolean;
  storageKey?: string;
  children: React.ReactNode;
  image?: string;
}

const AutoPopup: React.FC<AutoPopupProps> = ({
  delay = 3000,
  title,
  size = "md",
  showCloseButton = true,
  closeOnOverlayClick = true,
  className = "",
  onClose,
  showOnce = true,
  storageKey = "newsletter-popup-closed",
  image,
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hasShown, setHasShown] = useState<boolean>(false);

  useEffect(() => {
    const wasClosedPreviously = localStorage.getItem(storageKey) === "true";

    if (showOnce && (hasShown || wasClosedPreviously)) {
      return;
    }

    const timer = setTimeout(() => {
      setIsOpen(true);
      setHasShown(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, showOnce, hasShown, storageKey]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = "unset";

    localStorage.setItem(storageKey, "true");

    if (onClose) onClose();
  };

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-full mx-4",
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <>
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>

      <div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2 sm:p-4 animate-fadeIn"
        onClick={handleOverlayClick}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 animate-fadeIn" />

        <div
          className={`relative w-full max-h-[92vh] sm:max-h-[88vh] overflow-y-auto rounded-lg shadow-xl ${sizeClasses[size]} transform animate-slideUp ${className}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "popup-title" : undefined}
        >
          {showCloseButton && (
            <div className="flex absolute right-1 top-1 sm:right-2 sm:top-2 items-center justify-between z-10">
              {showCloseButton && (
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  aria-label="Close popup"
                >
                  <X size={30} className="text-gray-600" />
                </button>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 bg-[#F6EEDC] pr-0 md:pr-6 rounded-lg">
            <div className="relative w-full h-[220px] sm:h-[300px] md:h-[600px]">
              <Image
                src={image || "/"}
                fill
                alt="image"
                className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
              />
            </div>
            <div className="flex flex-col gap-4 px-4 pb-5 md:px-0 md:pb-0">
              {title && (
                <h2 id="popup-title" className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900">
                  {title}
                </h2>
              )}
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface NewsletterPopupProps {
  onSubscribe?: (email: string) => void;
  props?: any;
}

export const Popup: React.FC<NewsletterPopupProps> = ({ onSubscribe, props }) => {
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setSent(true);
      } else {
        setStatus("error");
        setSent(false);
      }
    } catch (error) {
      console.error("Error sending message.", error);
      setStatus("error");
    }
  };

  return (
    <AutoPopup
      delay={props.delay || 2000}
      title={props?.popup_title}
      size="xl"
      showOnce={true}
      storageKey="newsletter-popup-closed"
      image={props?.popup_image.filename}
    >
      <div className="space-y-8">
        <div className="text-gray-600">{render(props?.popup_content)}</div>
        {status === "success" && sent && (
          <div className="text-green-600">{props?.popup_success_text || "Tack för din prenumeration!"}</div>
        )}
        {status === "error" && (
          <div className="text-red-600">{props?.popup_error_text || "Något gick fel, försök igen."}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="example@example.se"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div className="flex space-x-3">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-green-200 text-black rounded-md transition-colors duration-200"
            >
              {props?.popup_button}
            </button>
          </div>
        </form>
      </div>
    </AutoPopup>
  );
};
