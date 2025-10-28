"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "women" | "men"
  >("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high">(
    "featured"
  );

  useEffect(() => {
    if (categoryParam === "women" || categoryParam === "men") {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === "all") return true;
    return product.category === selectedCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return 0;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            مجموعتنا
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 dark:text-gray-400 text-lg"
          >
            اكتشف العطور الفاخرة لكل مناسبة
          </motion.p>
        </div>
      </div>

      {/* Filters and Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12"
        >
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {(["all", "women", "men"] as const).map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {category === "all"
                  ? "جميع المنتجات"
                  : category === "women"
                  ? "نساء"
                  : "رجال"}
              </motion.button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              ترتيب حسب:
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none px-6 py-3 pr-12 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-600 focus:border-transparent cursor-pointer font-medium shadow-sm hover:shadow-md transition-all"
              >
                <option value="featured">مميز</option>
                <option value="price-low">السعر: من الأقل إلى الأعلى</option>
                <option value="price-high">السعر: من الأعلى إلى الأقل</option>
              </select>
              <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                <svg
                  className="w-4 h-4 text-gray-600 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Product Count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-600 dark:text-gray-400 mb-8"
        >
          عرض {sortedProducts.length}{" "}
          {sortedProducts.length === 1 ? "منتج" : "منتجات"}
        </motion.p>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              لا توجد منتجات في هذه الفئة.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">جاري التحميل...</p>
          </div>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
