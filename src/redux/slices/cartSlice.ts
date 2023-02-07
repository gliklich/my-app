import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLs } from '../../utils/getCartFromLS';
import { RootState } from '../store';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

interface cartSliceState {
  totalPrice: number;
  items: CartItem[];
}

const { items, totalPrice } = getCartFromLs();

const initialState: cartSliceState = {
  items,
  totalPrice,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /*addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      console.log(action.payload.size); //////////////////////////////////////////////////////////////////////

      if (findItem) {
        // && findItem.size === action.payload.size
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = calcTotalPrice(state.items);
      
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
        state.totalPrice = state.items.reduce((sum, obj) => {
          return obj.price * obj.count + sum;
        }, 0);
      }
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },*/
    addItem(state, action: PayloadAction<CartItem>) {
      const { id, type, size } = action.payload;
      const existingItem = state.items.find(
        (obj) => obj.id === id && obj.type === type && obj.size === size,
      );

      if (existingItem) {
        existingItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },

    removeItem(state, action: PayloadAction<CartItem>) {
      const { id, type, size } = action.payload;
      state.items = state.items.filter(
        (obj) => !(obj.id === id && obj.type === type && obj.size === size),
      );
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    minusItem(state, action: PayloadAction<CartItem>) {
      const { id, type, size } = action.payload;
      const existingItem = state.items.find(
        (obj) => obj.id === id && obj.type === type && obj.size === size,
      );

      if (existingItem) {
        existingItem.count--;
        if (existingItem.count === 0) {
          state.items = state.items.filter(
            (obj) => !(obj.id === id && obj.type === type && obj.size === size),
          );
        }
        state.totalPrice = state.items.reduce((sum, obj) => {
          return obj.price * obj.count + sum;
        }, 0);
      }
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemsById = (id: string, type: string, size: number) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id && obj.type === type && obj.size === size);

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;
export default cartSlice.reducer;
