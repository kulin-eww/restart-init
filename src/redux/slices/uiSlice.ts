import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  anchorElId: string | null;
}

const initialState: UIState = {
  anchorElId: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setAnchorElId(state, action: PayloadAction<string | null>) {
      state.anchorElId = action.payload;
    },
  },
});

export const { setAnchorElId } = uiSlice.actions;
export default uiSlice.reducer;
