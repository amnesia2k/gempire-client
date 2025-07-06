import type { CartItem, Product } from "@/lib/types";
import { toast } from "sonner";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartState {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
  getProductQuantity: (productId: string) => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (product, quantity) => {
        set((state) => {
          const existingItemIndex = state.cartItems.findIndex(
            (item) => item.product._id === product._id,
          );

          if (existingItemIndex > -1) {
            const updatedItems = [...state.cartItems];
            const currentQuantity =
              updatedItems[existingItemIndex]?.quantity ?? 0;
            const newQuantity = currentQuantity + quantity;

            toast.success(`Added ${product.name} to cart`);

            // Don't allow quantity over stock
            if (newQuantity > product.unit) return state;

            if (updatedItems[existingItemIndex]) {
              updatedItems[existingItemIndex].quantity = newQuantity;
            }
            return { cartItems: updatedItems };
          } else {
            if (quantity > product.unit) return state;

            return { cartItems: [...state.cartItems, { product, quantity }] };
          }
        });
      },

      removeFromCart: (productId) => {
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => item.product._id !== productId,
          ),
        }));
      },

      updateQuantity: (productId, quantity) => {
        set((state) => {
          const existingItemIndex = state.cartItems.findIndex(
            (item) => item.product._id === productId,
          );

          if (existingItemIndex > -1) {
            const updatedItems = [...state.cartItems];
            const existingItem = updatedItems[existingItemIndex];
            if (!existingItem) return state;
            const product = existingItem.product;

            // Remove item if quantity goes to 0 or below
            if (quantity <= 0) {
              return {
                cartItems: state.cartItems.filter(
                  (item) => item.product._id !== productId,
                ),
              };
            }

            // Don't allow quantity over stock
            if (quantity > product.unit) return state;

            if (updatedItems[existingItemIndex]) {
              updatedItems[existingItemIndex].quantity = quantity;
            }
            return { cartItems: updatedItems };
          }

          return state;
        });
      },

      clearCart: () => {
        set({ cartItems: [] });
      },

      getCartTotal: () => {
        return get().cartItems.reduce(
          (total, item) => total + Number(item.product.price) * item.quantity,
          0,
        );
      },

      getItemCount: () => {
        return get().cartItems.reduce(
          (count, item) => count + item.quantity,
          0,
        );
      },

      getProductQuantity: (productId: string) => {
        const item = get().cartItems.find((i) => i.product._id === productId);
        return item?.quantity ?? 0;
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cartItems: state.cartItems }), // only persist cartItems
    },
  ),
);
