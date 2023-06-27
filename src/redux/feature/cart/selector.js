const selectCartModule = (state) => state.cart
export const selectProductAmount = (state, id) => selectCartModule(state)[id] || 0;
export const selectCartSum = (state) => Object.values(selectCartModule(state)).reduce((acc, num) => acc + num, 0);
export const selectCart = (state) => selectCartModule(state);
export const selectCartMovies = (state) => Object.keys(selectCartModule(state)) || [];