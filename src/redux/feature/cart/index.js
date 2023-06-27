import { createSlice } from '@reduxjs/toolkit'

const initialState = {};
// const initialState: { [name: string]: number } = {};
// {id: кол-во} // хотя лучше в качестве библиотеки в TS использовать не объект а Map

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        increment: (state, { payload }) => {
            const count = state[payload] || 0
            if (count === 30) return;
            state[payload] = count + 1;
        },
        decrement: (state, { payload }) => {
            const count = state[payload]
            if (!count) {
                return;
            }
            if (count === 1) {
                delete state[payload];
                return
            }
            state[payload] = count - 1;
        },
        delete: (state, { payload }) => {
            delete state[payload];
            return
        },
        reset: () => initialState,
    }
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
