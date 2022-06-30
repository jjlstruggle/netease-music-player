import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserInfoPayload {}

interface UserState {
  userInfo: object;
  loginState: boolean;
}

let initialState: UserState = {
  userInfo: {},
  loginState: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<UserInfoPayload>) => {
      state.userInfo = action.payload;
    },
    updateLoginState: (state, action: PayloadAction<boolean>) => {
      state.loginState = action.payload;
    },
  },
});

export const { updateLoginState, updateUserInfo } = userSlice.actions;

export default userSlice.reducer;
