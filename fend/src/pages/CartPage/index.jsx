// import React, { useState } from 'react'

import styleModule from './index.module.scss'

import { useDispatch, useSelector } from 'react-redux'
// import CardProductTypeCardComponent from '../../components/CardProductTypeCartComponent'
import { addProduct, decrementProduct } from '../../redux/Slices/cartSlice'
import { priceDisplay } from '../../utils/priceDisplay'
import Button from '../../components/ButtonComponent'
import CardProductTypeCartComponent from '../../components/CardProductTypeCartComponent'
import { useNavigate } from 'react-router-dom'
import noProductImg from '../../assets/images/noProduct.png'

const CartPage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)

    console.log('cart', cart)

    const handleIncrement = (e, id, idType) => {
        e.stopPropagation()
        dispatch(addProduct({ id: id, product_type: { idType } }))
    }
    const handleDecrement = (e, id, idType) => {
        e.stopPropagation()
        dispatch(decrementProduct({ id: id, product_type: { idType } }))
    }



    const handleClickBuy = () => {
        navigate('/payment')
    }


    return (
        <div className={`${styleModule.cart_page} grid wide`}>

            {cart.products.length > 0 ?
                (<div className="row" style={{ position: 'relative' }}>

                    <div className={`${styleModule.products} col l-9 m-12 c-12`}>
                        {cart.products.map((product, i) => (
                            <CardProductTypeCartComponent
                                key={i}
                                product={product}
                                handleIncrement={handleIncrement}
                                handleDecrement={handleDecrement} />
                        ))
                        }
                    </div>

                    <div className={`${styleModule.total_amount} col l-3 m-12 c-12`}>

                        <div className={styleModule.total_top}>
                            {cart.products.map((product, i) => {
                                const price = priceDisplay(product.price * product.count)
                                // console.log('first', product)
                                if (product.check) {
                                    return (
                                        <div key={i} className={styleModule.product_buy}>
                                            <span>x{product.count}</span><span>{product.name}</span><span style={{ float: 'right' }}>{price}</span>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                        <div className={styleModule.total_bottom}>
                            <div className={styleModule.total_bottom_lst}>

                                <div className={styleModule.total_bottom_item}><span className={styleModule.total_bottom_title}>Tạm tính</span><span className={styleModule.total_bottom_value}>{priceDisplay(cart.totalPrice)}</span></div>
                                <div className={styleModule.total_bottom_item}><span className={styleModule.total_bottom_title}>Giảm giá</span><span className={styleModule.total_bottom_value}>- {priceDisplay(cart.totalDiscount)}</span></div>
                                <div className={styleModule.total_bottom_item}><span className={styleModule.total_bottom_title}>Thành tiền</span><span className={styleModule.total_bottom_value}>{priceDisplay(cart.totalPrice - cart.totalDiscount)}</span></div>

                            </div>

                            <Button
                                content="Mua hàng"
                                bgc="rgb(255, 66, 78)"
                                m="20px 0 0 0"
                                w="100%"
                                onClick={handleClickBuy}
                            />
                        </div>

                    </div>

                </div>)

                :
                (<div className={styleModule.noCart}>
                    <img src={noProductImg}></img>
                    <span> Bạn chưa có sản phẩm nào trong giỏ hàng !</span>
                    <Button
                        onClick={() => navigate('/')}
                        className={styleModule.not_found_page_btn}
                        content='Tiếp tục mua sắm'
                        m='50px 0 0 0'
                        bgc='white'
                        color='#d19002'
                        br='10px'
                        border='1px solid #d19002'
                        icon='fa-solid fa-house'
                    />
                </div>)}
        </div>
    )
}

export default CartPage