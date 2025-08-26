import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface userState {
  userDetails: {
    id: string;
    name: string;
    email: string;
  };
  isUserDetailsFetched: boolean;
}

const initialState: userState = {
  userDetails: {
    id: "",
    name: "",
    email: "",
  },
  isUserDetailsFetched: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<any>) => {
      state.userDetails = action.payload;
    },
    setIsUserDetailsFetched: (state, action: PayloadAction<boolean>) => {
      state.isUserDetailsFetched = action.payload;
    },
  },
});

export const { setUserDetails, setIsUserDetailsFetched } = userSlice.actions;
export default userSlice.reducer;
