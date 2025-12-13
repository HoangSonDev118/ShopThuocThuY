import React, { useEffect, useState } from 'react'
import styleModule from './index.module.scss'
import CardProductTypeCartComponent from '../../components/CardProductTypeCartComponent'
import { priceDisplay } from '../../utils/priceDisplay'
import logo from '../../assets/images/Logo3.png'

import * as orderService from '../../services/orderService'
import { useMutationHook } from '../../hooks/useMutation'
import LoadingComponent from '../../components/LoadingComponent'
import { useLocation, useNavigate } from 'react-router-dom'
import NotfoundPage from '../NotFoundPage'
import axios from 'axios'
import Button from '../../components/ButtonComponent'

const CheckoutPage = () => {

    const [products, setProducts] = useState([])
    const navigate = useNavigate()


    const location = useLocation();
    const { id } = location.state || {}; // Kiểm tra xem state có tồn tại không

    console.log(id)



    const mutation = useMutationHook(
        id => orderService.getDetaiOrderApi(id)
    )
    const { data, isLoading, isSuccess } = mutation


    useEffect(() => {
        mutation.mutate(id)
    }, [])

    const handleGetProducts = async (idList) => {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/product/get-all-products-id`, { id_product_list: idList })
            .then((res) => {
                setProducts(res.data?.products)
            })
    }

    useEffect(() => {
        const idList = data?.order?.order_products_infor.map(product => product.id)
        handleGetProducts(idList)



    }, [isSuccess])




    const [showProduct, setShowProduct] = useState(true)
    const { order } = data || {}



    if (data?.order) {
        return (
            <div className={`${styleModule.checkout_page} grid wide`}>

                <h3 className={`${styleModule.page_title}`}>Đặt hàng thành công <i className="fa-solid fa-circle-check"></i></h3>
                <div className={`${styleModule.row} row`} style={{ position: 'relative' }} >

                    <div className={`${styleModule.order_infor} col l-7 m-12 c-12`}>
                        <div className={`${styleModule.order_infor_top}`}>
                            <div className={styleModule.header}>
                                <img src={logo} />
                                <div className={styleModule.title}>
                                    <span>Bạn đã đặt hàng thành công</span>
                                    <span>Mã đơn hàng: <span style={{ fontWeight: 300 }}>#{order?.order_id}</span></span>
                                    <span>Cảm ơn bạn đã mua hàng!</span>
                                </div>
                            </div>
                            <div className={styleModule.order_infor_box}>
                                <h3>Thông tin đơn hàng</h3>
                                <div className={styleModule.infor_list}>
                                    <div>
                                        <b>Họ và tên: </b><span>{order?.order_customer_infor.name}</span>
                                    </div>
                                    <div>
                                        <b>SĐT: </b><span>{order?.order_customer_infor.phone}</span>
                                    </div>
                                    {order?.order_customer_infor.email && <div>
                                        <b>Email: </b><span>{order?.order_customer_infor.email}</span>
                                    </div>}
                                    <div>
                                        <b>Địa chỉ: </b><span>{order?.order_customer_infor.address}</span>
                                    </div>
                                    <div style={{ marginTop: 50 }}>
                                        <b>Phương thức thanh toán: </b> <span>Thanh toán khi nhận hàng</span>
                                    </div>
                                    <div>
                                        <b>Phương thức vận chuyển: </b> <span>Tích kiệm</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${styleModule.order_infor_bottom}`}>
                            {order?.order_customer_infor.email ? <span>Chúng tôi sẽ thông báo cho bạn thông tin về đơn hàng qua email: <b>{order?.order_customer_infor.email}</b> hoặc qua số điện thoại: <b>{order?.order_customer_infor.phone}</b>. Xin vui lòng chú ý để đơn hàng có thể vận chuyển đến bạn được tốt nhất.</span>
                            :
                            <span>Chúng tôi sẽ thông báo cho bạn thông tin về đơn hàng qua số điện thoại: <b>{order?.order_customer_infor.phone}</b>. Xin vui lòng chú ý để đơn hàng có thể vận chuyển đến bạn được tốt nhất.</span>}
                            
                            <p style={{marginTop: 10}}>SHOP THUOC THU Y Cảm ơn bạn đã quan tâm ủng hộ.</p>
                            <br />
                            <p>Trân trọng.</p>

                            <Button
                                onClick={() => navigate('/')}
                                content='Tiếp tục mua hàng'
                                className={styleModule.btn}
                                bgc='white'
                                color='#d19002'
                                br='10px'
                                border='1px solid #d19002'
                                icon='fa-solid fa-cart-shopping'
                            />

                        </div>

                    </div>

                    <div className={`${styleModule.order_products} col l-5 m-12 c-12`}>

                        <div className={`${styleModule.order_products_top}`}>
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
                                    <div>{priceDisplay(product.price)}</div>
                                </div>)
                                )}
                            </div>}
                        </div>
                        <div className={`${styleModule.order_products_bottom}`}>
                            <h3>Tổng số tiền</h3>
                            <div className={styleModule.total_bottom_lst}>

                                <div className={styleModule.total_bottom_item}><span className={styleModule.total_bottom_title}>Tạm tính</span><span className={styleModule.total_bottom_value}>{priceDisplay(order?.order_status.total_price)}</span></div>
                                <div className={styleModule.total_bottom_item}><span className={styleModule.total_bottom_title}>Giảm giá</span><span className={styleModule.total_bottom_value}>- {priceDisplay(order?.order_status.total_discount)}</span></div>
                                <div className={styleModule.total_bottom_item}><span className={styleModule.total_bottom_title}>Vận chuyển</span><span className={styleModule.total_bottom_value}>{priceDisplay(order?.order_status.total_shipping_cost)}</span></div>
                                <div className={styleModule.total_bottom_item}><span className={styleModule.total_bottom_title}>Thành tiền</span><span className={styleModule.total_bottom_value}>{priceDisplay(order?.order_status.total_final_price)}</span></div>

                            </div>
                        </div>
                    </div>
                </div>
                {isLoading && <LoadingComponent />}
            </div>
        )
    }
    else {
        return (
            <NotfoundPage />
        )
    }
}

export default CheckoutPage