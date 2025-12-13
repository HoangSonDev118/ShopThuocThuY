import React, { useState } from 'react'
import InputCheckBox from '../InputCheckboxComponent'
import styleModule from './index.module.scss'
import { priceDisplay } from '../../utils/priceDisplay'
// import { slugify } from '../../utils/slugify'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { changeCheck, deleteProduct } from '../../redux/Slices/cartSlice'

const CardProductTypeCartComponent = (props) => {


    const navigate = useNavigate()

    const { product, handleDecrement, handleIncrement } = props
    // console.log(product)

    const cart = useSelector(state => state.cart)


    const handleClickCard = (e) => {
        e.stopPropagation()
        // navigate(`/products/${slugify(product.name)}`, { state: { id: product.id } })
        navigate(`/products/${product.slugify}`, { state: { idType: product.product_type.idType } })
    }

    const dispatch = useDispatch()
    const handleDelete = () => {
        dispatch(deleteProduct({ id: product.id, product_type: product.product_type }))
    }

    const handleChangeCheck = () => {
        dispatch(changeCheck({ id: product.id, product_type: product.product_type }))
    }



    return (
        <div className={styleModule.card}>
            {/* (product.id == action.payload.id) && (product.product_type.idType == action.payload.product_type.idType) */}
            <InputCheckBox isChecked={cart.products.find(productRedux => (productRedux.id == product.id) && (productRedux.product_type.idType == product.product_type.idType)).check} handleCheckboxChange={handleChangeCheck} />
            <img src={product.img} onClick={(e) => handleClickCard(e)} />


            <div className={styleModule.card_infor}>

                <div className={styleModule.card_name_and_type}>
                    <span className={styleModule.card_name} onClick={(e) => handleClickCard(e)}>{product.name}</span>
                    <span className={styleModule.card_type} onClick={(e) => handleClickCard(e)}>Phân loại: <b>{product.product_type.nameType}</b></span>
                </div>

                <div className={styleModule.card_infor_price}>
                    <div>
                        <span className={styleModule.card_price}>{product.discount && priceDisplay(product.price)}</span>
                        {product.discount && <span className={styleModule.card_discount} style={{ padding: product.discount ? '5px' : '0' }}>-{product.discount}%</span>}
                    </div>


                    <span className={styleModule.card_priceBeforDiscount}>{product.discount ? priceDisplay(product.price, product.discount) : priceDisplay(product.price)}</span>

                </div>
                <div className={styleModule.card_infor_count_and_delete}>


                    <div className={styleModule.group_count}>
                        <button className={styleModule.decrement} onClick={(e) => handleDecrement(e, product.id, product.product_type.idType)}><i className="fa-solid fa-minus"></i></button>
                        <div className={styleModule.count_value}>{product.count}</div>
                        <button className={styleModule.increment} onClick={(e) => handleIncrement(e, product.id, product.product_type.idType)}><i className="fa-solid fa-plus"></i></button>
                    </div>

                    <i onClick={() => handleDelete()} className={`fa-regular fa-trash-can ${styleModule.card_delete}`}></i>

                </div>

            </div>
        </div>
    )
}

export default CardProductTypeCartComponent