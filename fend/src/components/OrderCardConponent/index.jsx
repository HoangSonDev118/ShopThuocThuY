import React, { useEffect, useState } from 'react'
import styleModule from './index.module.scss'
import { priceDisplay } from '../../utils/priceDisplay'
import Button from '../ButtonComponent'
import axios from 'axios'
import { timeDifferenceInHours } from '../../utils/timeDifferenceInHours'
import * as orderService from '../../services/orderService'
import { useMutationHook } from '../../hooks/useMutation'
import LoadingComponent from '../LoadingComponent'
const OrderCardConponent = ({ order, queryOrders }) => {

    const { order_customer_infor, order_products_infor, order_status } = order

    const [showProduct, setShowProduct] = useState(false)
    const [products, setProducts] = useState([])

    const handleGetProducts = async (idList) => {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/product/get-all-products-id`, { id_product_list: idList })
            .then((res) => {
                setProducts(res.data?.products)
            })
    }


    useEffect(() => {
        const idList = order_products_infor.map(product => product.id)
        handleGetProducts(idList)
    }, [])

    const ButtonNext = () => {
        if (order_status?.order_status === 0) {
            return (
                <Button
                    onClick={() => handleUpdateStatusOrder(1)}
                    content='Chấp nhận'
                    br='20px'
                    fsize='13px'
                    p='10px 25px'
                    bgc='#23c245'
                />
            )
        }
        else if (order_status?.order_status === 1) {
            return (
                <Button
                    onClick={() => handleUpdateStatusOrder(2)}
                    content='Đã đóng hàng'
                    br='20px'
                    fsize='13px'
                    p='10px 25px'
                    bgc='rgb(50 193 255)'
                />
            )
        }
        else if (order_status?.order_status === 2) {
            return (
                <Button
                    onClick={() => handleUpdateStatusOrder(3)}
                    content='Đã giao hàng'
                    br='20px'
                    fsize='13px'
                    p='10px 25px'
                    bgc='rgb(50 193 255)'
                />
            )
        }
    }

    const mutation = useMutationHook(
        (dataReq) => orderService.updateOrderApi(dataReq)
    )
    const { data, isLoading, isSuccess } = mutation


    const handleUpdateStatusOrder = (status) => {
        const access_token = localStorage.getItem('token')
        mutation.mutate(
            {
                id: order._id,
                access_token: access_token,
                data: {
                    "order_status.order_status": status
                }
            }
        )
    }
    
    const mutationDelete = useMutationHook(
        (dataReq) => orderService.deleteOrderApi(dataReq)
    )
    const { isLoading: isLoadingDelete, isSuccess: isSuccessDelete } = mutationDelete
    
    
    const handleDeleteOrder = () => {
        const access_token = localStorage.getItem('token')
        mutationDelete.mutate(
            {
                id: order._id,
                access_token: access_token
            }
        )
    }
    useEffect(() => {
        queryOrders.refetch()
    }, [isSuccess, isSuccessDelete])


    return (
        <div className={styleModule.card}>
            <span className={styleModule.card_title}>
                <h3 className={styleModule.idCard}>#{order.order_id}</h3>
                <span>{timeDifferenceInHours(order.createdAt)}</span>
            </span>

            <div className={styleModule.customer_infor}>
                <span>{order_customer_infor.name}</span>
                <span>{order_customer_infor.phone}</span>
                <span>{order_customer_infor.address}</span>
                <span>{order_customer_infor.address_detail}</span>
                <span>{order_customer_infor.email}</span>
                <span>{order_customer_infor.note}</span>
            </div>

            <div className={`${styleModule.product_list}`}>
                <h3 onClick={() => setShowProduct(s => !s)}>Danh sách sản phẩm
                    <i className="fa-solid fa-angle-down" style={{ transform: showProduct ? 'translate(7px, 0px) scaleY(-1)' : 'translate(7px, 2px) scaleY(1)' }}>
                    </i></h3>
                {showProduct && <div className={`${styleModule.order_products_list}`}>
                    {order?.order_products_infor.map((product, i) =>
                    (<div className={styleModule.product} key={i}>
                        <img src={products.find(product_ => product.id === product_._id)?.product_imgs[0]} />
                        <div className={styleModule.product_infor}>
                            <span className={styleModule.name}>{product.name}</span>
                            <span className={styleModule.type}><b>Phân loại: </b><span>{product.type}</span></span>
                            <span className={styleModule.count}><b>SL: </b><span>{product.count}</span></span>
                        </div>
                        <div className={styleModule.price}>{priceDisplay(product.price)}</div>
                    </div>)
                    )}
                </div>}
            </div>

            <div className={styleModule.order_infor}>
                <div className={styleModule.left}>
                    <div>
                        <b>Phương thức thanh toán: </b> <span>{order_status.payment_method === 'payment1' ? 'thanh toán khi nhận hàng' : 'chuyển khoản ngân hàng'}</span>
                    </div>
                    <div>
                        <b>Phương thức vận chuyển: </b> <span>Tiêu chuẩn</span>
                    </div>
                    <div className={styleModule.payment_status}>
                        {order_status.payment_status ? <b style={{ color: 'orange' }}>Đã thanh toán</b> : <b style={{ color: 'rgb(205, 205, 205)' }}>Chưa thanh toán</b>}
                    </div>
                </div>
                <div className={styleModule.right}>
                    <div>
                        <b>Tạm tính: </b> <span>{priceDisplay(order_status.total_price)}</span>
                    </div>
                    <div>
                        <b>Vận chuyển: </b> <span>{priceDisplay(order_status.total_shipping_cost)}</span>
                    </div>
                    <div>
                        <b>Giảm giá: </b> <span>-{priceDisplay(order_status.total_discount)}</span>
                    </div>
                    <div>
                        <b>Tổng cộng: </b> <span style={{ color: 'red', fontWeight: 700, fontSize: 17 }}>{priceDisplay(order_status.total_final_price)}</span>
                    </div>

                </div>
            </div>
            <div className={styleModule.order_action}>
                {order_status.order_status === 3 ?
                    <Button
                        onClick={handleDeleteOrder}
                        content='Xóa'
                        br='20px'
                        fsize='13px'
                        p='10px 25px'
                        bgc='rgb(255 70 70)'
                    />

                    : order_status.order_status === -1 ?
                        <Button
                            onClick={handleDeleteOrder}
                            content='Xóa'
                            br='20px'
                            fsize='13px'
                            p='10px 25px'
                            bgc='rgb(255 70 70)'
                        />
                        :
                        <Button
                            onClick={() => handleUpdateStatusOrder(-1)}
                            content='Từ chối'
                            br='20px'
                            fsize='13px'
                            p='10px 25px'
                            bgc='#cdcdcd'
                        />
                }
                {/* {if(order_status.order_status === 0){
                    return (
                        <Button
                            content='Chấp nhận'
                            br='20px'
                            fsize='13px'
                            p='10px 25px'
                            bgc='#23c245'
                        />
                    )
                }} */}
                <ButtonNext />
            </div>
            {isLoading || isLoadingDelete && <LoadingComponent />}
        </div>
    )
}

export default OrderCardConponent