import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    birthday: '',
    address: '',
    addressDetail: '',
    userName: '',
    userId: '',
    isAdmin: false
}
export const userInforSlice = createSlice({
    name: 'userInfor',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.fullName = action.payload.fullName
            state.email = action.payload.email
            state.phone = action.payload.phone
            state.gender = action.payload.gender
            state.birthday = action.payload.birthday
            state.address = action.payload.address
            state.addressDetail = action.payload.addressDetail
            state.userName = action.payload.userName
            state.userId = action.payload.userId
            state.isAdmin = action.payload.isAdmin
        },
        resetUser: (state) => {
            state.fullName = ''
            state.email = ''
            state.phone = ''
            state.gender = ''
            state.birthday = ''
            state.address = ''
            state.addressDetail = ''
            state.userName = ''
            state.userId = ''
            state.isAdmin = false
        }
    },
})
export const { updateUser, resetUser } = userInforSlice.actions

export default userInforSlice.reducer