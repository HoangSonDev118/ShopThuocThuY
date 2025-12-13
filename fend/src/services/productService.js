import axios from "axios"
import * as userService from './userService'

export const createProductApi = async (dataReq) => {
    const { data, access_token } = dataReq
    const res = await userService.axiosJWT.post(`${process.env.REACT_APP_BASE_URL}/product/create-pruduct`, data, {
        headers: {
            'token': `Bearer ${access_token}`
        }
    })

    return res.data
}

export const getAllProductApi = async (page) => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/product/get-all-products`, {
        params: {
            page: page
        }
    });
    return res.data
}
export const getDetailProductApi = async (id) => {
    console.log('id', id);
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/product/get-detail-product/${id}`)
    return res.data.product
}


export const updateProductApi = async (dataReq) => {
    const { id, access_token, data } = dataReq
    const res = await userService.axiosJWT.put(`${process.env.REACT_APP_BASE_URL}/product/update-product/${id}`, data, {
        headers: {
            'token': `Bearer ${access_token}`
        }
    })
    return res.data
}
export const deleteProductApi = async (dataReq) => {
    const { id, access_token } = dataReq
    const res = await userService.axiosJWT.delete(`${process.env.REACT_APP_BASE_URL}/product/delete-product/${id}`, {
        headers: {
            'token': `Bearer ${access_token}`
        }
    })
    return res.data
}
export const uploadImg = async ({ formData }) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/upload/image/product`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(res.data);
    } catch (error) {
        console.error(error);
    }
}

