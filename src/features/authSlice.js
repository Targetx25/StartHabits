import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,

}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {

      loginSuccess: (state, action) => {
        state.status = true;
        state.userData = action.payload;

      },

      logoutSuccess: (state, action) => {

        state.status = false;
        state.userData = null;

      }

    }

})

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;


