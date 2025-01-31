import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from './feedSlice'
import connectionReducer from './connections'
import requestReducer from './requestSlice'
import footerReducer from './footerSlice'
const appStore = configureStore({
    reducer:{
       user: userReducer,
        feed :feedReducer,
        connection: connectionReducer,
        request: requestReducer,
        footer: footerReducer,
    }

})

export default appStore;