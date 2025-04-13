"use client";
import React, { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      // Close menu when scrolling
      setIsMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <header
      className={`${
        isScrolled || isMenuOpen ? "bg-white" : "bg-transparent"
      } shadow-md sticky top-0 z-50 transition-colors duration-300`}
    >
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-green-500/30 rounded-full flex items-center justify-center mr-3">
            <i
              className={`fas fa-recycle text-2xl ${
                isScrolled || isMenuOpen ? "text-green-500" : "text-white"
              }`}
            ></i>
          </div>
          <button
            onClick={scrollToTop}
            className={`text-2xl font-bold ${
              isScrolled || isMenuOpen ? "text-gray-800" : "text-white"
            } hover:text-green-500 transition-colors cursor-pointer`}
          >
            TrashAid
          </button>
        </div>

        {/* Burger Menu Button - Only visible on mobile */}
        <button className="md:hidden text-2xl" onClick={toggleMenu}>
          <i
            className={`fas ${isMenuOpen ? "fa-xmark" : "fa-bars"} ${
              isScrolled || isMenuOpen ? "text-gray-600" : "text-white"
            }`}
          ></i>
        </button>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <a
                href="#dashboard"
                className={`${
                  isScrolled || isMenuOpen
                    ? "text-gray-600 hover:text-green-500"
                    : "text-white hover:text-green-200"
                } transition-colors`}
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#impact"
                className={`${
                  isScrolled || isMenuOpen
                    ? "text-gray-600 hover:text-green-500"
                    : "text-white hover:text-green-200"
                } transition-colors`}
              >
                Environmental Impact
              </a>
            </li>
            <li>
              <a
                href="#sponsor"
                className={`${
                  isScrolled || isMenuOpen
                    ? "text-gray-600 hover:text-green-500"
                    : "text-white hover:text-green-200"
                } transition-colors`}
              >
                Become a Sponsor
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Menu - Modified to overlay */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 ${
          isMenuOpen ? "block" : "hidden"
        } bg-white shadow-md`}
      >
        <ul className="px-4 py-2">
          <li className="py-2">
            <a
              href="#dashboard"
              className="block text-gray-600 hover:text-green-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </a>
          </li>
          <li className="py-2">
            <a
              href="#impact"
              className="block text-gray-600 hover:text-green-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Environmental Impact
            </a>
          </li>
          <li className="py-2">
            <a
              href="#sponsor"
              className="block text-gray-600 hover:text-green-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Become a Sponsor
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
