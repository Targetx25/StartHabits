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
        console.log('loginSuccess reducer called', action.payload); 
        state.status = true;
        console.log(action.payload)
        state.userData = action.payload;

      },

      logoutSuccess: (state, action) => {
        console.log('logoutSuccess reducer called');
        state.status = false;
        state.userData = null;

      }

    }

})

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;


