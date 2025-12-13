import axios from "axios"

export const axiosJWT = axios.create()

export const registerUserApi = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/register`, data)
    return res.data
}

export const loginUserApi = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/login`, data)
    return res.data
}

export const logoutUserApi = async () => {
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/logout`)
    localStorage.clear('token')
    return res.data
}

export const getDetailUserApi = async (dataReq) => {
    const { id, access_token } = dataReq
    const res = await axiosJWT.get(`${process.env.REACT_APP_BASE_URL}/user/get-detail-user/${id}`, {
        headers: {
            'token': `Bearer ${access_token}`
        }
    })
    return res.data
}

export const refreshTokenApi = async () => {
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/refresh-token`, {
        withCredentials: true
    })
    return res.data
}

export const updateUserApi = async (dataReq) => {
    const { id, access_token, data } = dataReq
    const res = await axiosJWT.put(`${process.env.REACT_APP_BASE_URL}/user/update-user/${id}`, data, {
        headers: {
            'token': `Bearer ${access_token}`
        }
    })
    return res.data
}

export const getAllUserApi = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_BASE_URL}/user/get-all-users`, {
        headers: {
            'token': `Bearer ${access_token}`
        }
    })
    return res.data
}

export const deleteUserApi = async (dataReq) => {
    const { id, access_token } = dataReq
    const res = await axiosJWT.delete(`${process.env.REACT_APP_BASE_URL}/user/delete-user/${id}`, {
        headers: {
            'token': `Bearer ${access_token}`
        }
    })
    return res.data
}

