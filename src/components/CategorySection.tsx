"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    title: "مجموعة النساء",
    description: "عطور أنيقة ومتطورة",
    image:
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=600&q=80",
    href: "/products?category=women",
  },
  {
    title: "مجموعة الرجال",
    description: "روائح قوية وراقية للرجال",
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&q=80",
    href: "/products?category=men",
  },
];

export default function CategorySection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            تسوق حسب الفئة
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            اعثر على العطر المثالي لكل مناسبة
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Link href={category.href}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative group overflow-hidden rounded-2xl shadow-xl h-[400px]"
                >
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="font-display text-3xl font-bold mb-2">
                      {category.title}
                    </h3>
                    <p className="text-gray-200 mb-4">{category.description}</p>
                    <motion.span
                      whileHover={{ x: 5 }}
                      className="inline-flex items-center text-white font-medium"
                    >
                      استكشف الآن
                      <svg
                        className="w-5 h-5 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </motion.span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
