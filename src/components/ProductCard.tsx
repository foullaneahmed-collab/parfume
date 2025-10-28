"use client";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { Product, useCartStore } from "@/store/cartStore";
import { useState, useRef } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const cartIconPosition = useCartStore((state) => state.cartIconPosition);
  const [isAdding, setIsAdding] = useState(false);
  const [showFlyingImage, setShowFlyingImage] = useState(false);
  const [flyingImagePos, setFlyingImagePos] = useState({ x: 0, y: 0 });
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0].ml || 50);
  const [selectedPrice, setSelectedPrice] = useState(
    product.sizes?.[0].price || product.price
  );
  const imageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["7.5deg", "-7.5deg"]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-7.5deg", "7.5deg"]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleSizeChange = (ml: number) => {
    setSelectedSize(ml);
    const sizeOption = product.sizes?.find((s) => s.ml === ml);
    if (sizeOption) {
      setSelectedPrice(sizeOption.price);
    }
  };

  const handleAddToCart = () => {
    setIsAdding(true);

    // Get product image position
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      setFlyingImagePos({ x: rect.left, y: rect.top });
      setShowFlyingImage(true);

      // Add to cart after a small delay (so animation starts first)
      setTimeout(() => {
        addItem({
          ...product,
          selectedSize,
          selectedPrice,
        });
      }, 100);

      // Hide flying image after animation completes
      setTimeout(() => {
        setShowFlyingImage(false);
        setIsAdding(false);
      }, 1700);
    }
  };

  return (
    <>
      {/* Flying Image Animation - Arc to Center then to Cart */}
      <AnimatePresence>
        {showFlyingImage && (
          <motion.div
            initial={{
              position: "fixed",
              left: flyingImagePos.x,
              top: flyingImagePos.y,
              width: "280px",
              height: "320px",
              zIndex: 9999,
            }}
            animate={{
              // First go to center of screen, then to actual cart icon position
              left: [
                `${flyingImagePos.x}px`,
                `${window.innerWidth / 2}px`,
                `${cartIconPosition?.x || window.innerWidth - 60}px`,
              ],
              top: [
                `${flyingImagePos.y}px`,
                `${window.innerHeight * 0.25}px`,
                `${cartIconPosition?.y || 40}px`,
              ],
              width: ["280px", "120px", "20px"],
              height: ["320px", "120px", "20px"],
              opacity: [1, 1, 0.8, 0],
              rotate: [0, 120, 360],
              scale: [1, 0.85, 0.1],
            }}
            transition={{
              duration: 1.6,
              times: [0, 0.45, 1],
              ease: "easeInOut",
            }}
            className="pointer-events-none rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.05, z: 50 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl"
      >
        {/* Image */}
        <div
          ref={imageRef}
          className="relative h-80 overflow-hidden bg-gray-100 dark:bg-gray-800"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-900 dark:text-white">
              {product.category === "women" ? "نساء" : "رجال"}
            </span>
          </div>

          {/* Quick Add Button - Shows on hover */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <motion.button
              onClick={handleAddToCart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isAdding}
              className="w-full py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              {isAdding ? (
                <span className="flex items-center justify-center">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="inline-block mr-2"
                  >
                    ⟳
                  </motion.span>
                  جاري الإضافة...
                </span>
              ) : (
                "أضف إلى السلة"
              )}
            </motion.button>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-display text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {product.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          {/* Size Selector */}
          {product.sizes && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">
                اختر الحجم:
              </p>
              <div className="flex gap-2">
                {product.sizes.map((sizeOption) => (
                  <motion.button
                    key={sizeOption.ml}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSizeChange(sizeOption.ml)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedSize === sizeOption.ml
                        ? "bg-primary-600 text-white shadow-md"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {sizeOption.ml}ml - {sizeOption.price} DH
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {selectedPrice} DH
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-500 ml-2">
                {selectedSize}ml
              </span>
            </div>
          </div>
        </div>

        {/* Success Checkmark Animation */}
        <AnimatePresence>
          {isAdding && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/20 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                className="w-24 h-24 bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-500/50"
              >
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="w-12 h-12 text-white drop-shadow-lg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                >
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sparkle Effect */}
        <AnimatePresence>
          {isAdding && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    scale: 0,
                    opacity: 1,
                  }}
                  animate={{
                    x: Math.cos((i * Math.PI) / 3) * 100,
                    y: Math.sin((i * Math.PI) / 3) * 100,
                    scale: [0, 1, 0],
                    opacity: [1, 1, 0],
                  }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="w-3 h-3 bg-yellow-400 rounded-full pointer-events-none"
                  style={{ zIndex: 100 }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
