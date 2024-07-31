//So this slice will be for loading all the habits list 
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    habits : []
}

const listSlice = createSlice({
    name : "list",
    initialState,

    reducers : {

        allhabits : (state, action) => {
            state.habits = action.payload
        },

        addHabit : (state, action) => {
            state.habits.push(action.payload)
        },
        //Maybe add a reducer for handling the habit after the habit has been completed 

        completeHabit : (state, action) => {   
            const index = state.habits.findIndex(habit => habit.id === action.payload.id);
            state.habits[index].completed = true;

        },

        updateHabit : (state, action) => {
            const index = state.habits.findIndex(habit => habit.id ===action.payload.id);
            state.habits[index]= action.payload;

        },
        deletehabit : (state, action) => {
            state.habits = state.habits.filter(habit => habit.id !== action.payload)

        }


    }


})


export const { addHabit, completeHabit, updateHabit, deletehabit, allhabits } = listSlice.actions;
export default listSlice.reducer;


