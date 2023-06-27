import { createSlice } from '@reduxjs/toolkit'

const initialState = {};
// const initialState: { [name: string]: number } = {};
// {id: кол-во} // хотя лучше в качестве библиотеки в TS использовать не объект а Map

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setName: (state, { payload }) => {
            state['name'] = payload || ''
        },
        setGenre: (state, { payload }) => {
            state['genre'] = payload || '';
        },
        setCinemaId: (state, { payload }) => {
            state['cinema'] = payload || '';
        }
    }
});

export const filterReducer = filterSlice.reducer;
export const filterActions = filterSlice.actions;
