/** Design reminder: totals and summaries should be derived centrally for a mature commerce flow. */
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartTotals = createSelector([selectCartItems], (items) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = items.length;
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const delivery = totalQuantity > 0 ? 24 : 0;
  const total = subtotal + delivery;

  return {
    subtotal,
    delivery,
    total,
    totalItems,
    totalQuantity,
  };
});
