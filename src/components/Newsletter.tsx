"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface NewsletterForm {
  email: string;
}

export default function Newsletter() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterForm>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = (data: NewsletterForm) => {
    console.log("Newsletter signup:", data);
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-600 dark:bg-primary-800">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            ابق على اتصال
          </h2>
          <p className="text-primary-100 text-lg mb-8">
            اشترك في نشرتنا الإخبارية وكن أول من يعرف عن المنتجات الجديدة
            والعروض الحصرية.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  {...register("email", {
                    required: "البريد الإلكتروني مطلوب",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "البريد الإلكتروني غير صحيح",
                    },
                  })}
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  className="w-full px-6 py-4 rounded-full bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-400"
                />
                {errors.email && (
                  <p className="text-primary-100 text-sm mt-2 text-left ml-4">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-medium transition-colors whitespace-nowrap"
              >
                {isSubmitted ? "✓ تم الاشتراك!" : "اشترك"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
