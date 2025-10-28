"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-display text-3xl font-bold text-primary-800 dark:text-primary-200 mb-4">
              Parfume Nadia
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              اكتشف فن العطور الفاخرة. كل عطر مصنوع بأجود المكونات لخلق روائح لا
              تُنسى.
            </p>
            <div className="flex space-x-4 mt-6">
              {["facebook", "instagram", "twitter"].map((social) => (
                <motion.a
                  key={social}
                  href={`#${social}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors"
                  aria-label={social}
                >
                  <span className="capitalize">{social[0]}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              روابط سريعة
            </h3>
            <ul className="space-y-2">
              {[
                { en: "Home", ar: "الرئيسية" },
                { en: "Shop", ar: "تسوق" },
                { en: "About", ar: "عنا" },
                { en: "Contact", ar: "اتصل" },
              ].map((link) => (
                <li key={link.en}>
                  <Link
                    href={
                      link.en === "Home" ? "/" : `/${link.en.toLowerCase()}`
                    }
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.ar}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              خدمة العملاء
            </h3>
            <ul className="space-y-2">
              {[
                "معلومات الشحن",
                "الإرجاع",
                "دليل المقاسات",
                "الأسئلة الشائعة",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>&copy; {currentYear} Parfume Nadia. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
