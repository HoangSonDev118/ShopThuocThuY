import React, { useEffect, useState } from 'react'
import styleModule from './index.module.scss'
import Button from '../../components/ButtonComponent'
import { useLocation, useNavigate } from 'react-router-dom';
// import { useMutationHook } from '../../hooks/useMutation';
// import * as productService from '../../services/productService'
// import LoadingComponent from '../../components/LoadingComponent';
import { priceDisplay } from '../../utils/priceDisplay';
import CardComponent from '../../components/CardComponent';
import axios from 'axios';
import InputCheckBox from '../../components/InputCheckboxComponent';
import draftToHtml from 'draftjs-to-html';
import { useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/Slices/cartSlice';
import { toast } from 'react-toastify';
import LoadingComponent from '../../components/LoadingComponent';

const DetailProductPage = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const location = useLocation();
    const dispatch = useDispatch()


    const [count, setCount] = useState(1)

    const idTypeProduct = location.state?.idType;
    const [activeIndex, setActiveIndex] = useState(0);

    const [productsShow1, setProductsShow1] = useState([])

    const [product, setProductFetch] = useState()

    const { slugify } = useParams();

    console.log('product', product)





    // console.log('first', idProduct)


    // const mutationGetDetailProduct = useMutationHook(
    //     data => productService.getDetailProductApi(data)
    // )
    // const { data: product, isSuccess: isSuccessGetDetailProduct, isLoading } = mutationGetDetailProduct

    // useEffect(() => {
    //     mutationGetDetailProduct.mutate(idProduct)
    // }, [])
    // // console.log('product', product)
    // const product = {
    //     main_img: 'https://product.hstatic.net/200000263355/product/2-4_8e3c4374435d443ebfcce9104b79e2b1_large.jpg',
    //     sub_img_1: 'https://product.hstatic.net/200000263355/product/2-4_8e3c4374435d443ebfcce9104b79e2b1_large.jpg',
    //     product_name: 'Tổng hợp các loại thuốc trị ve rận viêm da sổ giun cho chó mèo',
    //     product_price: 135000,
    //     discount: 10,
    //     distributor: 'TRUNG ƯƠNG 5',
    //     state: 'Còn hàng',
    //     id: '93912ad283019n',

    //     types: [
    //         { name: 'Một hộp', price: 135000 },
    //         { name: 'Một tuýp Một tuýp Một tuýp', price: 12000 },
    //         { name: 'Một vị', price: 2000 },
    //         { name: 'Khác', price: 5400 },
    //     ]

    // }

    const AddProductToCartSuccessMsg = ({ inforProduct }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginLeft: 20 }}>
            <h3 style={{ color: '#363636' }}>Thêm sản phẩm thành công</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <h4 style={{ minWidth: 23 }}>x{inforProduct.count}</h4>
                <img style={{ width: 40, height: 40, objectFit: 'cover' }} src={inforProduct.img} />
                <span style={{ maxWidth: 200 }}>{inforProduct.name}</span>
            </div>
            <Button
                onClick={() => navigate('/cart')}
                content='Đi đến giỏ hàng'
                p='3px 10px'
                fsize='13px'
            />
        </div>
    );




    const getProduct = async () => {
        setIsLoading(true)
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/product/get-detail-product/${slugify}`)
            .then(async (res) => {
                setProductFetch(res.data.product)
                idTypeProduct && setActiveIndex(res.data.product?.product_types.findIndex(product => product._id === idTypeProduct))
                console.log('first', res.data.product?.product_goods[0])
                await axios.get(`${process.env.REACT_APP_BASE_URL}/type-product/get-detail-type-product/${res.data.product?.product_goods[0]}`)
                    .then(async res2 => {
                        await axios.post(`${process.env.REACT_APP_BASE_URL}/product/get-all-products-id?type=less`, { id_product_list: res2.data.type?.id_product_list })
                            .then((res2) => {
                                setProductsShow1(res2.data?.products)
                                setIsLoading(false)
                            })
                    })
            })
        return res
    }


    useEffect(() => {
        getProduct()
        console.log(getProduct())
    }, [])

    const price = priceDisplay(product?.product_types[activeIndex].price)
    const priceDiscount = priceDisplay(product?.product_types[activeIndex].price, product?.product_discount)
    const discountDisplay = `-${product?.product_discount}%`







    const handleAddProductToCart = () => {
        console.log('product', product)
        console.log('active', product.product_types[activeIndex])
        dispatch(addProduct({
            img: product?.product_imgs[0],
            name: product?.product_name,
            price: product.product_types[activeIndex].price,
            discount: product?.product_discount,
            id: product._id,
            count: count,
            slugify: product?.product_slugify,
            product_type: {
                idType: product.product_types[activeIndex]._id,
                nameType: product.product_types[activeIndex].name,
                priceType: product.product_types[activeIndex].price
            }
        }))
        const notifySuccess = () => toast.success(<AddProductToCartSuccessMsg
            inforProduct={{
                img: product?.product_imgs[0],
                name: product?.product_name,
                count
            }
            }
        />);
        notifySuccess()
    }

    const handleClickBuy = () => {
        dispatch(addProduct({
            img: product?.product_imgs[0],
            name: product?.product_name,
            price: product.product_types[activeIndex].price,
            discount: product?.product_discount,
            id: product._id, count: count,
            slugify: product?.product_slugify,
            product_type: {
                idType: product.product_types[activeIndex]._id,
                nameType: product.product_types[activeIndex].name,
                priceType: product.product_types[activeIndex].price
            }
        }))
        navigate('/payment')
    }

    const handleClick = (index) => {
        setActiveIndex(index); // Cập nhật chỉ số của child đang được chọn
    };

    return (

        <div className={`${styleModule.container} grid wide`}>

            <div className={styleModule.breadcrumb}>
                <h4>Trang chủ</h4>
                <i className="fa-solid fa-chevron-right"></i>
                <h4>Sản phẩm</h4>
                <i className="fa-solid fa-chevron-right"></i>
                <h4>{product?.product_name} </h4>
            </div>

            {!product ? (<div className={styleModule.noData}></div>) : (<>
                <div className={`${styleModule.wrapper}`}>
                    <div className='row'>

                        <div className={`${styleModule.wrapper_left} l-5 m-12 c-12`}>
                            <div className={styleModule.wrapper_slider}>
                                <div className={styleModule.slider_main}>
                                    <img src={product?.product_imgs[0]} alt="" />
                                </div>
                                <ul className={styleModule.slider_sub_list}>

                                    {product?.product_imgs.map((img, i) => (
                                        <div key={i} className={styleModule.slider_sub_item}>
                                            <img src={img} alt="" />
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className={`${styleModule.wrapper_right} l-7 m-12 c-12`}>
                            <h3 className={styleModule.product_name}>{product?.product_name}</h3>


                            <div className={styleModule.group_infor} style={{ marginTop: 30 }}>
                                <div>
                                    <span className={styleModule.state_title}>Mã sản phẩm</span>
                                    <span className={styleModule.state_value}>{product?._id}</span>
                                </div>
                            </div>
                            <div className={styleModule.group_infor}>
                                <div className={styleModule.group_state}>
                                    <span className={styleModule.state_title}>Tình trạng</span>
                                    <span className={styleModule.state_value}>{product?.product_status == 1 ? 'còn hàng' : 'hết hàng'}</span>
                                </div>
                                {product.product_distributor && <div className={styleModule.group_distributor}>
                                    <span className={styleModule.state_title}>Nhà phân phối</span>
                                    <span className={styleModule.state_value}>{product?.product_distributor}</span>
                                </div>}
                            </div>

                            <div className={styleModule.group_price_infor}>

                                {console.log(product?.product_status === 1)}

                                {product?.product_status === 1 ? product?.product_discount ?
                                    (
                                        <><p className={styleModule.discount}>{discountDisplay}</p>
                                            <span className={styleModule.price}>{price}</span>
                                            <span className={styleModule.new_price}>{priceDiscount}</span>
                                        </>)
                                    :
                                    // (<span className={styleModule.new_price}></span>)}
                                    (<span className={styleModule.new_price}>{product?.contactToBuy ? 'Liên hệ' : priceDisplay(product?.product_types[activeIndex].price)}</span>)
                                    : <span style={{ fontWeight: 500 }} className={styleModule.new_price}>Sản phẩm tạm hết hàng</span>
                                }

                            </div>
                            {/* {product?.types.map((type, index)=>(
                                <div></div>
                            ))} */}

                            {product?.product_types.length >= 2 &&
                                <div className={styleModule.group_type}>
                                    <span className={styleModule.type}>Loại</span>
                                    <div className={styleModule.type_list}>
                                        {product?.product_types.map((type, index) => (
                                            <div
                                                key={index}
                                                className={`${styleModule.type_item} ${(type.check && index === activeIndex) ? styleModule.active : ''}  ${!type.check ? styleModule.unAble : ''}`} // Gán class active nếu index trùng với activeIndex
                                                onClick={() => {
                                                    if (!type.check) return
                                                    handleClick(index)
                                                }
                                                }
                                            >
                                                {type.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>}
                            <div className={styleModule.group_count}>
                                <button className={styleModule.decrement} onClick={() => { if (count > 1) { setCount(prev => prev -= 1) } }}><i className="fa-solid fa-minus"></i></button>
                                <div className={styleModule.count_value}>{count}</div>
                                <button className={styleModule.increment} onClick={() => setCount(prev => prev += 1)}><i className="fa-solid fa-plus"></i></button>
                            </div>




                            <div className={styleModule.gruop_action}>

                                {product?.product_status === 1 ? !product?.contactToBuy ? (<>
                                    <Button
                                        className={styleModule.add_cart}
                                        content='Thêm vào giỏ hàng'
                                        p='15px 35px'
                                        bgc='#fff'
                                        color='#d08f00'
                                        border='1px solid #d08f00'
                                        onClick={handleAddProductToCart}
                                    />
                                    <Button
                                        className={styleModule.buy_now}
                                        content='Mua ngay'
                                        p='15px 35px'
                                        onClick={handleClickBuy}
                                    />
                                </>) :
                                    (<Button
                                        className={styleModule.buy_now}
                                        content='Liên hệ ngay'
                                        p='15px 35px'
                                    />)
                                    :
                                    (
                                        // <Button
                                        //     className={styleModule.add_cart}
                                        //     content='Báo cho tôi khi có hàng lại'
                                        //     p='15px 35px'
                                        //     bgc='#fff'
                                        //     color='#d08f00'
                                        //     border='1px solid #d08f00'
                                        //     onClick={()=>{}}
                                        // > <InputCheckBox/> </Button>
                                        <label className={styleModule.BtnCheckbox} htmlFor='btnCheckbox'>Báo cho tôi khi có hàng lại<InputCheckBox id={'btnCheckbox'} /></label>
                                    )
                                }
                            </div>
                        </div>

                    </div>

                </div>
                <div className={`${styleModule.product_infor}`}>
                    <h2 className={`${styleModule.product_infor_title}`}>
                        Thông tin sản phẩm
                    </h2>
                    <div className={`${styleModule.product_infor_content}`}>
                        <div dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(product?.product_describe)) }} />
                    </div>
                </div>
            </>)}

            <div className={styleModule.product_show_group}>
                <div className={`${styleModule.product_title}`}>
                    <h3>Sản phẩm tương tự</h3>
                </div>

                <div className={styleModule.product_block}>

                    {productsShow1.map((product_, i) => {
                        if (product._id === product_._id) return
                        return (
                            <CardComponent
                                key={i}
                                type='product'
                                className={styleModule.card_item}
                                img={product_.product_imgs[0]}
                                name={product_.product_name}
                                price={product_.product_types[0].price}
                                discount={product_.product_discount}
                                slugify={product_.product_slugify}
                                status={product_.product_status}
                            />
                        )
                    })}
                </div>


            </div>

            {isLoading && <LoadingComponent />}
        </div>
    )
}

export default DetailProductPage