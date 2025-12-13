import axios from "axios"


export const getAllNotificationApi = async (data) => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/notification/get-all-notifications`)
    return res.data
}
// export const getDetaiOrderApi = async (id) => {
//     console.log("id", id);
//     const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/order/get-detail-order/${id}`)
//     return res.data
// }