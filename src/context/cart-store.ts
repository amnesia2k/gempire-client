"use client";

import type { CartItem, Product, PromoCode } from "@/lib/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartState {
  cartItems: CartItem[];
  appliedPromoCode: PromoCode | null;
  discountAmount: number;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  applyPromoCode: (promo: PromoCode) => void;
  removePromoCode: () => void;
  clearCart: () => void;
  getCartSubtotal: () => number;
  getCartTotal: () => number;
  getItemCount: () => number;
  getProductQuantity: (productId: string) => number;
  calculateDiscount: (subtotal: number, promo: PromoCode) => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      appliedPromoCode: null,
      discountAmount: 0,

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

            if (newQuantity > product.unit) return state;

            if (updatedItems[existingItemIndex]) {
              updatedItems[existingItemIndex].quantity = newQuantity;
            }

            const newSubtotal = updatedItems.reduce(
              (sub, item) => sub + Number(item.product.price) * item.quantity,
              0,
            );

            const newDiscount = state.appliedPromoCode
              ? get().calculateDiscount(newSubtotal, state.appliedPromoCode)
              : 0;

            return {
              cartItems: updatedItems,
              discountAmount: newDiscount,
            };
          } else {
            if (quantity > product.unit) return state;

            const newItems = [...state.cartItems, { product, quantity }];
            const newSubtotal = newItems.reduce(
              (sub, item) => sub + Number(item.product.price) * item.quantity,
              0,
            );
            const newDiscount = state.appliedPromoCode
              ? get().calculateDiscount(newSubtotal, state.appliedPromoCode)
              : 0;

            return {
              cartItems: newItems,
              discountAmount: newDiscount,
            };
          }
        });
      },

      removeFromCart: (productId) => {
        set((state) => {
          const updatedCartItems = state.cartItems.filter(
            (item) => item.product._id !== productId,
          );
          const newSubtotal = updatedCartItems.reduce(
            (subtotal, item) =>
              subtotal + Number(item.product.price) * item.quantity,
            0,
          );
          const newDiscount = state.appliedPromoCode
            ? get().calculateDiscount(newSubtotal, state.appliedPromoCode)
            : 0;

          return {
            cartItems: updatedCartItems,
            discountAmount: newDiscount,
          };
        });
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

            if (quantity <= 0) {
              const itemsAfterRemoval = state.cartItems.filter(
                (item) => item.product._id !== productId,
              );
              const newSubtotal = itemsAfterRemoval.reduce(
                (subtotal, item) =>
                  subtotal + Number(item.product.price) * item.quantity,
                0,
              );
              const newDiscount = state.appliedPromoCode
                ? get().calculateDiscount(newSubtotal, state.appliedPromoCode)
                : 0;
              return {
                cartItems: itemsAfterRemoval,
                discountAmount: newDiscount,
              };
            }

            if (quantity > product.unit) return state;

            if (updatedItems[existingItemIndex]) {
              updatedItems[existingItemIndex].quantity = quantity;
            }

            const newSubtotal = updatedItems.reduce(
              (subtotal, item) =>
                subtotal + Number(item.product.price) * item.quantity,
              0,
            );
            const newDiscount = state.appliedPromoCode
              ? get().calculateDiscount(newSubtotal, state.appliedPromoCode)
              : 0;

            return {
              cartItems: updatedItems,
              discountAmount: newDiscount,
            };
          }

          return state;
        });
      },

      applyPromoCode: (promo) => {
        set((_state) => {
          const subtotal = get().getCartSubtotal();
          const discount = get().calculateDiscount(subtotal, promo);
          return {
            appliedPromoCode: promo,
            discountAmount: discount,
          };
        });
      },

      removePromoCode: () => {
        set({
          appliedPromoCode: null,
          discountAmount: 0,
        });
      },

      clearCart: () => {
        set({ cartItems: [], appliedPromoCode: null, discountAmount: 0 });
      },

      getCartSubtotal: () => {
        return get().cartItems.reduce(
          (subtotal, item) =>
            subtotal + Number(item.product.price) * item.quantity,
          0,
        );
      },

      getCartTotal: () => {
        const subtotal = get().getCartSubtotal();
        const discount = get().discountAmount;
        return Math.max(0, subtotal - discount);
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

      calculateDiscount: (subtotal: number, promo: PromoCode) => {
        const discountValue = parseFloat(promo.discount);
        let calculatedDiscount = 0;

        if (promo.isPercentage) {
          calculatedDiscount = (discountValue / 100) * subtotal;
        } else {
          calculatedDiscount = discountValue;
        }

        return Math.min(calculatedDiscount, subtotal);
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cartItems: state.cartItems,
        appliedPromoCode: state.appliedPromoCode,
        discountAmount: state.discountAmount,
      }),
      onRehydrateStorage: (_initialState) => {
        // The outer function receives the 'initial' state (default state) before rehydration.
        // We often don't need it for rehydration logic itself.
        return (rehydratedState) => {
          // This inner function receives the state *after* rehydration.
          // It can be undefined if local storage was empty or corrupt.
          if (rehydratedState) {
            // Only proceed if rehydratedState is not undefined
            if (rehydratedState.appliedPromoCode) {
              const subtotal = rehydratedState.cartItems.reduce(
                (acc, item) => acc + Number(item.product.price) * item.quantity,
                0,
              );
              rehydratedState.discountAmount =
                rehydratedState.calculateDiscount(
                  subtotal,
                  rehydratedState.appliedPromoCode,
                );
            } else {
              // If no promo code was applied or it was nullified, ensure discount is 0.
              rehydratedState.discountAmount = 0;
            }
          }
          // If rehydratedState is undefined, it means there was no stored state,
          // and the default initial state will be used, which already has discountAmount: 0.
        };
      },
    },
  ),
);
