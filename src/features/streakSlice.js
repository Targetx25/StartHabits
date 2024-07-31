import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    infos : [],
}


const streakSlice = createSlice({
    name : "streak",
    initialState,

    reducers : {

        AddStreak : (state, action) => {
            state.infos.push(action.payload)
        },

        IncreaseStreak : (state, action) => {
            const index = state.infos.findIndex(info =>info.id === action.payload.id);
            state.infos[index].streak += 1
          
        },
        resetStreak : (state, action) => {
            const index = state.infos.findIndex(info =>info.id === action.payload.id);
            state.infos[index].streak = 0
        }
    }
})

export const {AddStreak, IncreaseStreak, resetStreak } = streakSlice.actions;

export default streakSlice.reducer;