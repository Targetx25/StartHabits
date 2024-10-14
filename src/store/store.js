import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import authReducer from "../features/authSlice";
import listReducer from "../features/listSlice";
import streakReducer from "../features/streakSlice";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "auth",
    storage,
}

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({ 
    reducer: {
        auth: persistedReducer,
        list : listReducer,
        streak : streakReducer
    },
   middleware : (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck : false,
   })

})

export const persistor = persistStore(store);

export default store;
