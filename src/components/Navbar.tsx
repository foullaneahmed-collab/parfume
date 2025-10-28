"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const items = useCartStore((state) => state.items);
  const setCartIconPosition = useCartStore(
    (state) => state.setCartIconPosition
  );
  const [cartCount, setCartCount] = useState(0);
  const [prevCartCount, setPrevCartCount] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setCartCount(getTotalItems());

    // Update cart icon position
    const updateCartPosition = () => {
      if (cartRef.current) {
        const rect = cartRef.current.getBoundingClientRect();
        setCartIconPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    };

    updateCartPosition();
    window.addEventListener("resize", updateCartPosition);
    window.addEventListener("scroll", updateCartPosition);

    return () => {
      window.removeEventListener("resize", updateCartPosition);
      window.removeEventListener("scroll", updateCartPosition);
    };
  }, [getTotalItems, setCartIconPosition]);

  useEffect(() => {
    const newCount = getTotalItems();
    if (newCount > prevCartCount) {
      // Open cart when item reaches center, close after it enters
      setTimeout(() => setCartOpen(true), 700);
      setTimeout(() => setCartOpen(false), 1800);
    }
    setPrevCartCount(newCount);
    setCartCount(newCount);
  }, [items, prevCartCount, getTotalItems]);

  const navLinks = [
    { href: "/", label: "الرئيسية" },
    { href: "/products", label: "تسوق" },
    { href: "/products?category=women", label: "نساء" },
    { href: "/products?category=men", label: "رجال" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-40 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.h1
              whileHover={{ scale: 1.05 }}
              className="font-display text-3xl md:text-4xl font-bold text-primary-800 dark:text-primary-200"
            >
              Parfume Nadia
            </motion.h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
                  pathname === link.href
                    ? "text-primary-600 dark:text-primary-400"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4 space-x-reverse">
            {/* Dark Mode Toggle */}
            {mounted && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </motion.button>
            )}

            {/* Cart with Opening Animation */}
            <Link href="/cart">
              <motion.div
                ref={cartRef}
                animate={cartOpen ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors overflow-visible"
              >
                {/* Cart Lid (Top part) */}
                <motion.div
                  animate={
                    cartOpen
                      ? { rotate: -25, y: -5, x: -2 }
                      : { rotate: 0, y: 0, x: 0 }
                  }
                  transition={{ duration: 0.3 }}
                  className="absolute top-2 left-2 origin-bottom-left"
                >
                  <svg
                    className="w-6 h-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 8"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 4h14"
                    />
                  </svg>
                </motion.div>

                {/* Cart Body */}
                <motion.svg
                  animate={cartOpen ? { scale: 1.1 } : { scale: 1 }}
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </motion.svg>

                {/* Cart Badge */}
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium z-10"
                  >
                    {cartCount}
                  </motion.span>
                )}

                {/* Ripple Effect when cart opens */}
                {cartOpen && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0.6 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 rounded-full bg-yellow-400"
                  />
                )}
              </motion.div>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 space-y-3"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-primary-600 dark:text-primary-400"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
