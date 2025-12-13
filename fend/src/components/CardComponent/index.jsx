// import React, { useEffect, useState } from 'react'
// import styleModule from './index.module.scss'
// import Button from '../ButtonComponent'
// import { useNavigate } from 'react-router-dom'
// import { priceDisplay } from '../../utils/priceDisplay'
// import { useDispatch, useSelector } from 'react-redux'

// const CardComponent = (props) => {
//     const { img, name, price, discount, className, type, bgc, slugify, status } = props
//     const navigate = useNavigate()
//     const handleClickCard = () => {
//         if (type == 'product') {
//             navigate(`/products/${slugify}`)
//         }
//         else if (type === 'image') {
//             navigate(`/product/company/${slugify}`)
//         }
//         return
//     }
//     const discountDisplay = `-${discount}%`


//     const [width, setWidth] = useState(window.innerWidth);

//     useEffect(() => {
//         const handleResize = () => {
//             const newWidth = window.innerWidth;
//             if (newWidth < 740) {
//                 setWidth(((newWidth - 15) / 2) - 20);
//             }
//         };

//         window.addEventListener('resize', handleResize);
//         handleResize();
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);
//     if (type === 'product') {
//         return (
//             <div className={`${styleModule.card} ${className}`} onClick={handleClickCard} style={width && { width: width }}>
//                 <div className={styleModule.card_img} style={width && { height: width }}>
//                     <img src={img} alt="" />
//                 </div>
//                 {discount && <div className={styleModule.card_discount_tag}>
//                     {discountDisplay}
//                 </div>}

//                 <div className={styleModule.card_body}>
//                     <div className={styleModule.card_name}>{name}</div>
//                     {discount ? (<div className={styleModule.card_price}>
//                         <div className={styleModule.card_price_top}>
//                             <span>{priceDisplay(price, discount)}</span>
//                             <span>{discountDisplay}</span>
//                         </div>
//                         <div className={styleModule.card_price_bottom}>
//                             <span>{priceDisplay(price)}</span>
//                         </div>
//                     </div>)
//                         : (
//                             <div className={styleModule.card_price_noDiscount}>
//                                 {priceDisplay(price)}
//                             </div>
//                         )}
//                     {status===1 ? (
//                         <Button
//                         content="Chọn mua"
//                         w="95%"
//                         bgc='#fff'
//                         border='1px solid #d08f00'
//                         color='#d08f00'
//                         onClick={handleClickCard}
//                         />
//                     ): (
//                         <Button
//                         content="Tạm hết hàng"
//                         w="95%"
//                         bgc='#fff'
//                         border='1px solid #d08f00'
//                         color='#d08f00'
//                         onClick={handleClickCard}
//                         />
//                     )}
//                 </div>
//             </div>
//         )
//     }

//     else if (type === 'image') {
//         return (
//             <div className={`${styleModule.card_type_img} ${className}`} onClick={handleClickCard} style={width && { width: width, height: 'auto', padding: 0 }}>
//                 <div className={styleModule.card_img} style={{ ...(width && { height: width }), ...(bgc && { padding: 80 }) }}>
//                     <img src={img} alt="" />
//                     {bgc && <div className={styleModule.card_img_bgc}><div></div></div>}
//                 </div>
//                 <div className={styleModule.card_body}>
//                     <div className={styleModule.card_name}>{name}</div>
//                 </div>
//             </div>
//         )
//     }

//     else {
//         return (
//             <div>
//                 Card
//             </div>
//         )
//     }
// }

// export default CardComponent


import React, { useEffect, useRef, useState } from 'react'
import styleModule from './index.module.scss'
import Button from '../ButtonComponent'
import { useNavigate } from 'react-router-dom'
import { priceDisplay } from '../../utils/priceDisplay'
import { useDispatch, useSelector } from 'react-redux'

const CardComponent = (props) => {
    const { img, name, price, discount, className, type, bgc, slugify, status } = props
    const navigate = useNavigate()
    const handleClickCard = () => {
        if (type == 'product') {
            navigate(`/products/${slugify}`)
            window.location.reload()
        }
        else if (type === 'image') {
            navigate(`/product/company/${slugify}`)
        }
        return
    }
    const discountDisplay = `-${discount}%`




    if (type === 'product') {
        return (
            <div className={`${styleModule.card} ${className}`} onClick={handleClickCard}>
                <div className={styleModule.card_img}>
                    {/* <div className={styleModule.card_img} > */}
                    <img src={img} alt="" />
                </div>
                {discount && <div className={styleModule.card_discount_tag}>
                    {discountDisplay}
                </div>}

                <div className={styleModule.card_body}>
                    <div className={styleModule.card_name}>{name}</div>
                    {discount ? (<div className={styleModule.card_price}>
                        <div className={styleModule.card_price_top}>
                            <span>{priceDisplay(price, discount)}</span>
                            <span>{discountDisplay}</span>
                        </div>
                        <div className={styleModule.card_price_bottom}>
                            <span>{priceDisplay(price)}</span>
                        </div>
                    </div>)
                        : (
                            <div className={styleModule.card_price_noDiscount}>
                                {priceDisplay(price)}
                            </div>
                        )}
                    {status === 1 ? (
                        <Button
                            content="Chọn mua"
                            w="95%"
                            bgc='#fff'
                            border='1px solid #d08f00'
                            color='#d08f00'
                            onClick={handleClickCard}
                        />
                    ) : (
                        <Button
                            content="Tạm hết hàng"
                            w="95%"
                            bgc='#fff'
                            border='1px solid #d08f00'
                            color='#d08f00'
                            onClick={handleClickCard}
                        />
                    )}
                </div>
            </div>
        )
    }

    else if (type === 'image') {
        return (
            <div className={`${styleModule.card_type_img} ${className}`} onClick={handleClickCard}>
                <div className={styleModule.card_img} style={{padding: 50}}>
                    <img src={img} alt="" />
                    {bgc && <div className={styleModule.card_img_bgc}><div></div></div>}
                </div>
                <div className={styleModule.card_body}>
                    <div className={styleModule.card_name}>{name}</div>
                </div>
            </div>
        )
    }

    else {
        return (
            <div>
                Card
            </div>
        )
    }
}

export default CardComponent