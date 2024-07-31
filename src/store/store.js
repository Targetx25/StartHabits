import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import listReducer from "../features/listSlice";
import streakReducer from "../features/streakSlice";

const store = configureStore({ 
    reducer: {
        auth: authReducer,
        list : listReducer,
        streak : streakReducer
    }

})

export default store;
