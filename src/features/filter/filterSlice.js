const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  filter: 'lws-all',
  sort: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterSelected: (state, action) => {
      state.filter = action.payload.toLowerCase();
    },
    sortSelected: (state, action) => {
      state.sort = action.payload.toLowerCase();
    },
  },
});

export default filterSlice.reducer;
export const { filterSelected, sortSelected } = filterSlice.actions;
