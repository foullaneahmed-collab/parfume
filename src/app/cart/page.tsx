"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { products } from "@/data/products";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    updateSize,
    getTotalPrice,
    clearCart,
  } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSizeChange = (
    itemId: string,
    currentSize: number,
    newSize: number
  ) => {
    // Find the product to get the new price
    const product = products.find((p) => p.id === itemId);
    if (!product || !product.sizes) return;

    const newSizeOption = product.sizes.find((s) => s.ml === newSize);
    if (!newSizeOption) return;

    // Update the size using the store method
    updateSize(itemId, currentSize, newSize, newSizeOption.price);
  };

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;

    setIsSubmitting(true);

    // Format order details for WhatsApp
    const orderDetails = items
      .map(
        (item) =>
          `• ${item.name} (${
            item.selectedSize || parseInt(item.size) || 50
          }ml) x${item.quantity} - ${
            (item.selectedPrice || item.price) * item.quantity
          } DH`
      )
      .join("%0A");

    const total = getTotalPrice();
    const message = `مرحبا! أريد تقديم طلب:%0A%0A${orderDetails}%0A%0Aالمجموع: ${total} DH%0A%0Aيرجى تأكيد طلبي. شكراً!`;

    // Replace with your actual WhatsApp number (format: country code + number, no + or spaces)
    const phoneNumber = "212646880774"; // Your WhatsApp number (Morocco)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    // Optional: Clear cart after sending
    setTimeout(() => {
      setIsSubmitting(false);
      // Uncomment the line below if you want to clear the cart after ordering
      // clearCart()
    }, 1000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-32 h-32 mx-auto mb-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center"
          >
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </motion.div>
          <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Discover our collection of luxury perfumes
          </p>
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-medium transition-colors"
            >
              Start Shopping
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl font-bold text-gray-900 dark:text-white mb-8"
        >
          سلة التسوق
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {items.map((item, index) => (
                <motion.div
                  key={`cart-item-${index}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 flex flex-col sm:flex-row gap-6"
                >
                  {/* Image */}
                  <div className="relative w-full sm:w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-display text-xl font-semibold text-gray-900 dark:text-white">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.category === "women" ? "نساء" : "رجال"}
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          removeItem(
                            item.id,
                            item.selectedSize || parseInt(item.size) || 50
                          )
                        }
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </motion.button>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      {item.description}
                    </p>

                    {/* Size Selector */}
                    {(() => {
                      const product = products.find((p) => p.id === item.id);
                      const currentSize =
                        item.selectedSize || parseInt(item.size) || 50;

                      if (product?.sizes) {
                        return (
                          <div className="mb-4">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">
                              الحجم:
                            </p>
                            <div className="flex gap-2 flex-wrap">
                              {product.sizes.map((sizeOption) => (
                                <motion.button
                                  key={sizeOption.ml}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() =>
                                    handleSizeChange(
                                      item.id,
                                      currentSize,
                                      sizeOption.ml
                                    )
                                  }
                                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                    currentSize === sizeOption.ml
                                      ? "bg-primary-600 text-white shadow-md"
                                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                                  }`}
                                >
                                  {sizeOption.ml}ml - {sizeOption.price} DH
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })()}

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-full p-1">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.selectedSize || parseInt(item.size) || 50,
                              item.quantity - 1
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 12H4"
                            />
                          </svg>
                        </motion.button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.selectedSize || parseInt(item.size) || 50,
                              item.quantity + 1
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        </motion.button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                          {(item.selectedPrice || item.price) * item.quantity}{" "}
                          DH
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-gray-500">
                            {item.selectedPrice || item.price} DH لكل واحد
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 sticky top-24"
            >
              <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-6">
                ملخص الطلب
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>المجموع الفرعي</span>
                  <span>{getTotalPrice()} DH</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>الشحن</span>
                  <span className="text-green-600 dark:text-green-400">
                    مجاني
                  </span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                    <span>المجموع الكلي</span>
                    <span>{getTotalPrice()} DH</span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWhatsAppOrder}
                disabled={isSubmitting}
                className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-medium transition-colors mb-3 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      ⟳
                    </motion.span>
                    جاري المعالجة...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    اطلب عبر واتساب
                  </>
                )}
              </motion.button>

              <Link href="/products">
                <button className="w-full py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-full font-medium transition-colors border border-gray-200 dark:border-gray-700">
                  متابعة التسوق
                </button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={clearCart}
                className="w-full mt-3 py-2 text-sm text-red-600 dark:text-red-400 hover:underline"
              >
                إفراغ السلة
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
