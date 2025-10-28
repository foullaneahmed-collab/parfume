import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "men" | "women";
  size: string;
  sizes?: {
    ml: number;
    price: number;
  }[];
}

export interface CartProduct extends Product {
  selectedSize: number; // The ml size selected
  selectedPrice: number; // The price for that size
}

interface CartItem extends CartProduct {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  cartIconPosition: { x: number; y: number } | null;
  setCartIconPosition: (position: { x: number; y: number }) => void;
  addItem: (product: CartProduct) => void;
  removeItem: (id: string, size: number) => void;
  updateQuantity: (id: string, size: number, quantity: number) => void;
  updateSize: (
    id: string,
    currentSize: number,
    newSize: number,
    newPrice: number
  ) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartIconPosition: null,

      setCartIconPosition: (position) => {
        set({ cartIconPosition: position });
      },

      addItem: (product) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) =>
              item.id === product.id &&
              item.selectedSize === product.selectedSize
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id &&
                item.selectedSize === product.selectedSize
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return { items: [...state.items, { ...product, quantity: 1 }] };
        });
      },

      removeItem: (id, size) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.id === id && item.selectedSize === size)
          ),
        }));
      },

      updateQuantity: (id, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id, size);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && item.selectedSize === size
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      updateSize: (id, currentSize, newSize, newPrice) => {
        set((state) => {
          const existingItemWithNewSize = state.items.find(
            (item) => item.id === id && item.selectedSize === newSize
          );

          if (existingItemWithNewSize) {
            // If an item with the new size already exists, merge quantities
            const currentItem = state.items.find(
              (item) => item.id === id && item.selectedSize === currentSize
            );
            const quantityToAdd = currentItem?.quantity || 1;

            return {
              items: state.items
                .filter(
                  (item) =>
                    !(item.id === id && item.selectedSize === currentSize)
                )
                .map((item) =>
                  item.id === id && item.selectedSize === newSize
                    ? { ...item, quantity: item.quantity + quantityToAdd }
                    : item
                ),
            };
          } else {
            // Update the item's size and price in place
            return {
              items: state.items.map((item) =>
                item.id === id && item.selectedSize === currentSize
                  ? { ...item, selectedSize: newSize, selectedPrice: newPrice }
                  : item
              ),
            };
          }
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) =>
            total + (item.selectedPrice || item.price) * item.quantity,
          0
        );
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
      // Add version for cache invalidation
      version: 1,
      // Migrate old data if needed
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // Migration logic for version 0 to 1
          return persistedState;
        }
        return persistedState;
      },
    }
  )
);
