import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    count: 0,
    products: [],
    totalPrice: 0,
    totalDiscount: 0,
}
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            return {
                ...state,
                ...action.payload
            };
        },
        addProduct: (state, action) => {
            console.log('add', action.payload);
            if (state.products.some((product) => (product.id === action.payload.id) && (product.product_type.idType === action.payload.product_type.idType))) {
                state.products.forEach(product => {
                    if ((product.id === action.payload.id) && (product.product_type.idType === action.payload.product_type.idType)) {
                        product.count = action.payload.count ? product.count += action.payload.count : product.count += 1
                    }
                })
            }
            else {
                state.count++
                console.log('them');
                state.products.unshift({
                    img: action.payload.img,
                    name: action.payload.name,
                    price: action.payload.price,
                    discount: action.payload.discount,
                    id: action.payload.id,
                    count: action.payload.count || 1, check: true,
                    slugify: action.payload.slugify,
                    product_type: action.payload.product_type
                })
            }

            state.totalPrice = state.products.reduce((total, product) => product.check ? (total + product.price * product.count) : total, 0);
            state.totalDiscount = state.products.reduce((total, product) => product.check ? (total + product.price * (product.discount / 100) * product.count) : total, 0);
        },
        decrementProduct: (state, action) => {
            state.products.forEach(product => {
                if ((product.id === action.payload.id) && (product.product_type.idType === action.payload.product_type.idType)) {
                    if (product.count > 1) {
                        product.count--
                    }
                }
            })
            state.totalPrice = state.products.reduce((total, product) => product.check ? (total + product.price * product.count) : total, 0);
            state.totalDiscount = state.products.reduce((total, product) => product.check ? (total + product.price * (product.discount / 100) * product.count) : total, 0);
        },
        deleteProduct: (state, action) => {
            state.count--
            state.products.splice(state.products.findIndex(product => (product.id === action.payload.id) && (product.product_type.idType === action.payload.product_type.idType)), 1);
            state.totalPrice = state.products.reduce((total, product) => product.check ? (total + product.price * product.count) : total, 0);
            state.totalDiscount = state.products.reduce((total, product) => product.check ? (total + product.price * (product.discount / 100) * product.count) : total, 0);
        },

        changeCheck: (state, action) => {
            // console.log('checksda');
            state.products.forEach(product => {
                if ((product.id === action.payload.id) && (product.product_type.idType === action.payload.product_type.idType)) {
                    product.check = !product.check
                    console.log('check', product.check);
                }
            })
            state.totalPrice = state.products.reduce((total, product) => product.check ? (total + product.price * product.count) : total, 0);
            state.totalDiscount = state.products.reduce((total, product) => product.check ? (total + product.price * (product.discount / 100) * product.count) : total, 0);
        },

        resetCart: (state) => {
            state.count = 0
            state.products = []
        }
    },
})
export const { addProduct, deleteProduct, resetCart, decrementProduct, changeCheck, setCart } = cartSlice.actions

export default cartSlice.reducer
