import { configureStore } from '@reduxjs/toolkit'

import userInforSlice from './Slices/userSlice'
import cartorSlice from './Slices/cartSlice'

export const store = configureStore({
    reducer: {
        userInfor: userInforSlice,
        cart: cartorSlice
    },
})