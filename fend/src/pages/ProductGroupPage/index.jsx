import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import styleModule from '../DistributorPage/index.module.scss'
import CardComponent from '../../components/CardComponent';
import axios from 'axios';
import LoadingComponent from '../../components/LoadingComponent';

const ProductGroupPage = () => {

    const location = useLocation();

    const [typeActive, setTypeActive] = useState(-1)


    const { type } = location.state || {};
    const [dataTypes, setDataTypes] = useState([]);

    const handleGetData = async () => {
        setIsLoading(true)
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/type-product/get-all-type-product-name`)
        setDataTypes(response.data.types)
        setIsLoading(false)
    }
    useEffect(() => {
        if (!type) return
        handleGetData()
    }, [])

    const { slugify } = useParams();

    const [products, setProducts] = useState([])
    const [name, setName] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const [productType, setProductsType] = useState([])

    const getProduct = async () => {
        setIsLoading(true)
        if (location.pathname.split('/')[2] === 'company') {
            await axios.get(`${process.env.REACT_APP_BASE_URL}/distributor-product/get-detail-distributor-product-name/${slugify}`)
                .then(async res => {
                    setName(res.data.distributor?.name)
                    await axios.post(`${process.env.REACT_APP_BASE_URL}/product/get-all-products-id`, { id_product_list: res.data.distributor?.id_product_list })
                        .then((res) => {
                            setProducts(res.data?.products)
                            setIsLoading(false)
                        })
                })
        }
        else if (location.pathname.split('/')[2] === 'type') {
            await axios.get(`${process.env.REACT_APP_BASE_URL}/type-product/get-detail-type-product-name/${slugify}`)
                .then(async res => {
                    setName(res.data.type?.name)
                    await axios.post(`${process.env.REACT_APP_BASE_URL}/product/get-all-products-id`, { id_product_list: res.data.type?.id_product_list })
                        .then((res) => {
                            setProducts(res.data?.products)
                            setIsLoading(false)
                        })
                })
        }
    }
    useEffect(() => {
        getProduct()
    }, [])

    const handleClickType = (i) => {
        if (i === typeActive) {
            setTypeActive(-1)
            return
        }
        setTypeActive(i)
    }

    const handleGetProductType = async (slugify) => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/type-product/get-detail-type-product-name/${slugify}`)
            .then(async res => {
                console.log(res.data)
                setProductsType(res.data?.type?.id_product_list)
            })
    }

    useEffect(() => {
        if (typeActive===-1) return
        console.log(dataTypes[typeActive]?.name)
        handleGetProductType(dataTypes[typeActive]?.name)
    }, [typeActive])

    if (products.length > 0) {
        return (
            <div className={`${styleModule.DistributorPage} grid wide`}>
                <div className={styleModule.product_show_group}>
                    <div className={`${styleModule.product_title}`}>
                        {location.pathname.split('/')[2] === 'company' ? <h3>Công ty {name}</h3> : <h3>{name}</h3>}
                    </div>
                    <div className={styleModule.type_list}>
                        {dataTypes.map((type, index) => {
                            if (!type.important || type.type_animal) return
                            return (
                                <span key={index} className={styleModule.type_product} style={{ backgroundColor: typeActive === index ? '#d08f00' : '', color: typeActive === index ? 'white' : 'black' }} onClick={() => handleClickType(index)}>
                                    {type.name}
                                </span>
                            )
                        })}
                    </div>

                    <div className={styleModule.product_block}>
                        {products.map((product, i) => 
                        {
                            console.log(typeActive!==-1)
                            console.log('productType', productType)

                            if (typeActive!==-1 && !productType?.some(idProduct=>idProduct===product._id)) return
                            return(
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
                        )})}
                    </div>
                </div>
                {isLoading && <LoadingComponent />}
            </div>
        )
    }
    else {
        return (
            <h3>Không có sản phẩm</h3>
        )
    }
}

export default ProductGroupPage