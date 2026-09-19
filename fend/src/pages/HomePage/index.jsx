import React, { useEffect, useState } from 'react'
import styleModule from './index.module.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderComponent from '../../components/SliderComponent';
import CardComponent from '../../components/CardComponent';
import Button from '../../components/ButtonComponent';


import dogImg from '../../assets/images/ProductTypeAnimal/004-dog.png'
import catImg from '../../assets/images/ProductTypeAnimal/006-cat.png'
import chickenImg from '../../assets/images/ProductTypeAnimal/003-chicken.png'
import pigImg from '../../assets/images/ProductTypeAnimal/005-pig.png'
import cowImg from '../../assets/images/ProductTypeAnimal/001-cow.png'
import rabbitImg from '../../assets/images/ProductTypeAnimal/007-rabbit.png'
import buffaloImg from '../../assets/images/ProductTypeAnimal/008-buffalo.png'
import goatImg from '../../assets/images/ProductTypeAnimal/002-goat.png'


import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingComponent from '../../components/LoadingComponent';

const bannerImages = [
    // 'https://res.cloudinary.com/arlo65tv/image/upload/v1789812061/Screenshot_2026-09-19_170049.png',
    'https://res.cloudinary.com/arlo65tv/image/upload/v1789812191/Screenshot_2026-09-19_170122.png',
    // 'https://res.cloudinary.com/arlo65tv/image/upload/v1789812192/Screenshot_2026-09-19_170212.png',
    'https://res.cloudinary.com/arlo65tv/image/upload/v1789812192/Screenshot_2026-09-19_170303.png'
]


const HomePage = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    ///định nghĩa state dải phân cách
    const [activeIndex, setActiveIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % 4);
        }, 6000);
        return () => clearInterval(interval);
    }, []);
    ///


    ///ĐỊNH NGHĨA VÀ CALL CÁC API SHOW
    const [distributors, setDistributors] = useState([])
    const [productsShow1, setProductsShow1] = useState([])
    const [productsShow2, setProductsShow2] = useState([])

    const handleGetData = async () => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/distributor-product/get-all-distributor-product-name`)
            .then(res => {
                setDistributors(res.data?.distributors)
            })
    }
    // const handleGetDataProductsShow1 = async () => {
    //     await axios.get(`${process.env.REACT_APP_BASE_URL}/product/get-all-products-card`)
    //         .then(res => {
    //             setProductsShow1(res.data?.products)
    //         })
    // }

    const handleGetDataProductsShow1 = async () => {
        setIsLoading(true)
        await axios.get(`${process.env.REACT_APP_BASE_URL}/type-product/get-detail-type-product-name/${"Sản phẩm đang khuyến mãi"}`)
            .then(async res => {
                await axios.post(`${process.env.REACT_APP_BASE_URL}/product/get-all-products-id?type=less`, { id_product_list: res.data.type?.id_product_list })
                    .then((res) => {
                        setProductsShow1(res.data?.products)
                        setIsLoading(false)
                    })
            })
    }
    const handleGetDataProductsShow2 = async () => {
        setIsLoading(true)
        await axios.get(`${process.env.REACT_APP_BASE_URL}/type-product/get-detail-type-product-name/${"Sản phẩm nổi bật"}`)
            .then(async res => {
                await axios.post(`${process.env.REACT_APP_BASE_URL}/product/get-all-products-id?type=less`, { id_product_list: res.data.type?.id_product_list })
                    .then((res) => {
                        setProductsShow2(res.data?.products)
                        setIsLoading(false)
                    })
            })
    }














    useEffect(() => {
        setIsLoading(true)
        handleGetData()
        handleGetDataProductsShow1()
        handleGetDataProductsShow2()
        setIsLoading(false)
    }, [])


    const handleShowMore = (name) => {
        navigate(`/product/type/${name}`)
    }


    return (
        <div className={`${styleModule.home_page} grid wide`}>
            <SliderComponent
                type='banner'
                imgs={bannerImages.map((img) => ({ img }))}
            />


            <div className={styleModule.separation}>
                <a className={`${activeIndex === 0 ? styleModule.active : ''}`} href="tel: +84971833093"><h4>Liên hệ ngay với  <i className="fa-solid fa-phone"></i> Hotline: +84971833093</h4></a>
                <a className={`${activeIndex === 1 ? styleModule.active : ''}`} href="https://m.me/104988175154682"><h4>Chat ngay qua Mesenger  <i className="fa-brands fa-facebook-messenger"></i></h4></a>
                <a className={`${activeIndex === 2 ? styleModule.active : ''}`} href="https://zalo.me/0971833093" target="_blank"><h4>Chat ngay qua Zalo</h4></a>
                <div className={`${activeIndex === 3 ? styleModule.active : ''}`}><h4>Nhận tư vấn ngay qua Email <i className="fa-solid fa-envelope"></i></h4></div>
            </div>


            <div className={styleModule.product_show_group}>
                <div className={`${styleModule.product_title}`}>
                    <h3>Các nhà phân phối</h3>
                </div>

                <div className={styleModule.product_block}>
                    {distributors.map((distributor, i) => {
                        if (i >= 8) return
                        return (
                            <CardComponent
                                key={i}
                                type='image'
                                className={styleModule.card_item}
                                img={distributor.img}
                                name={distributor.name}
                                slugify={distributor.name}
                            />
                        )
                    })}

                </div>
                <div className={`${styleModule.product_show_more}`}>
                    <Button
                        content='Xem thêm'
                        color='#d08f00'
                        br='22px'
                        p='15px 70px'
                        fsize='19px'
                        fw='600'
                        bgc='white'
                        onClick={() => navigate('/distributor')}

                    />
                </div>
            </div>

            <div className={styleModule.separation}>
                <a className={`${activeIndex === 1 ? styleModule.active : ''}`} href="tel: +84971833093"><h4>Liên hệ ngay với  <i className="fa-solid fa-phone"></i> Hotline: +84971833093</h4></a>
                <a className={`${activeIndex === 2 ? styleModule.active : ''}`} href="https://m.me/104988175154682"><h4>Chat ngay qua Mesenger  <i className="fa-brands fa-facebook-messenger"></i></h4></a>
                <a className={`${activeIndex === 3 ? styleModule.active : ''}`} href="https://zalo.me/0971833093" target="_blank"><h4>Chat ngay qua Zalo</h4></a>
                <div className={`${activeIndex === 0 ? styleModule.active : ''}`}><h4>Nhận tư vấn ngay qua Email <i className="fa-solid fa-envelope"></i></h4></div>
            </div>


            <div className={styleModule.product_show_group}>
                <div className={`${styleModule.product_title}`}>
                    <h3>Sản phẩm đang khuyến mãi</h3>
                </div>

                <div className={styleModule.product_block}>

                    {productsShow1.map((product, i) => (
                        <CardComponent
                            key={i}
                            type='product'
                            className={styleModule.card_item}
                            img={product.product_imgs[0]}
                            name={product.product_name}
                            price={product.product_types[0].price}
                            discount={product.product_discount}
                            slugify={product.product_slugify}
                            status={product.product_status}
                        />
                    ))}
                </div>

                <div className={`${styleModule.product_show_more}`}>
                    <Button
                        content='Xem thêm'
                        color='#d08f00'
                        br='22px'
                        p='15px 70px'
                        fsize='19px'
                        fw='600'
                        bgc='white'
                        onClick={() => handleShowMore('Sản phẩm đang khuyến mãi')}
                    />

                </div>
            </div>

            <div className={styleModule.separation}>
                <a className={`${activeIndex === 2 ? styleModule.active : ''}`} href="tel: +84971833093"><h4>Liên hệ ngay với  <i className="fa-solid fa-phone"></i> Hotline: +84971833093</h4></a>
                <a className={`${activeIndex === 3 ? styleModule.active : ''}`} href="https://m.me/104988175154682"><h4>Chat ngay qua Mesenger  <i className="fa-brands fa-facebook-messenger"></i></h4></a>
                <a className={`${activeIndex === 0 ? styleModule.active : ''}`} href="https://zalo.me/0971833093" target="_blank"><h4>Chat ngay qua Zalo</h4></a>
                <div className={`${activeIndex === 1 ? styleModule.active : ''}`}><h4>Nhận tư vấn ngay qua Email <i className="fa-solid fa-envelope"></i></h4></div>
            </div>


            <div className={styleModule.product_show_group}>
                <div className={`${styleModule.product_title}`}>
                    <h3>Sản phẩm cho</h3>
                </div>

                <SliderComponent
                    type='category'
                    imgs={[
                        { img: dogImg, name: 'chó', to: 'type/Sản phẩm cho chó' },
                        { img: catImg, name: 'mèo', to: 'type/Sản phẩm cho mèo' },
                        { img: pigImg, name: 'lợn', to: 'type/Sản phẩm cho lợn' },
                        { img: chickenImg, name: 'gà', to: 'type/Sản phẩm cho gà' },
                        { img: cowImg, name: 'bò', to: 'type/Sản phẩm cho bò' },
                        { img: rabbitImg, name: 'thỏ', to: 'type/Sản phẩm cho thỏ' },
                        { img: buffaloImg, name: 'trâu', to: 'type/Sản phẩm cho trâu' },
                        { img: goatImg, name: 'dê', to: 'type/Sản phẩm cho dê' }
                    ]}
                />
            </div>


            <div className={styleModule.separation}>
                <a className={`${activeIndex === 3 ? styleModule.active : ''}`} href="tel: +84971833093"><h4>Liên hệ ngay với  <i className="fa-solid fa-phone"></i> Hotline: +84971833093</h4></a>
                <a className={`${activeIndex === 0 ? styleModule.active : ''}`} href="https://m.me/104988175154682"><h4>Chat ngay qua Mesenger  <i className="fa-brands fa-facebook-messenger"></i></h4></a>
                <a className={`${activeIndex === 1 ? styleModule.active : ''}`} href="https://zalo.me/0971833093" target="_blank"><h4>Chat ngay qua Zalo</h4></a>
                <div className={`${activeIndex === 2 ? styleModule.active : ''}`}><h4>Nhận tư vấn ngay qua Email <i className="fa-solid fa-envelope"></i></h4></div>
            </div>

            <div className={styleModule.product_show_group}>
                <div className={`${styleModule.product_title}`}>
                    <h3>Sản phẩm nổi bật</h3>
                </div>

                <div className={styleModule.product_block}>
                    {productsShow2.map((product, i) => (
                        <CardComponent
                            key={i}
                            type='product'
                            className={styleModule.card_item}
                            img={product.product_imgs[0]}
                            name={product.product_name}
                            price={product.product_types[0].price}
                            discount={product.product_discount}
                            slugify={product.product_slugify}
                            status={product.product_status}
                        />
                    ))}
                </div>

                <div className={`${styleModule.product_show_more}`}>
                    <Button
                        content='Xem thêm'
                        color='#d08f00'
                        br='22px'
                        p='15px 70px'
                        fsize='19px'
                        fw='600'
                        bgc='white'
                        onClick={() => handleShowMore('Sản phẩm nổi bật')}
                    />
                </div>
            </div>



            {isLoading && <LoadingComponent />}

        </div>
    )
}

export default HomePage