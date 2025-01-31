import { createSlice } from "@reduxjs/toolkit";


const footerSlice = createSlice({
    name:"footer",
    initialState:{
        isFixed: false,
    },
    reducers:{
        fixedFooter:(state,action) =>{
            state.isFixed=action.payload;
        }
    }
})

export const { fixedFooter } = footerSlice.actions;
export default footerSlice.reducer;