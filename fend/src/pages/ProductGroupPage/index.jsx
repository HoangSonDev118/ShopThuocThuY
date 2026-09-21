import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import styleModule from '../DistributorPage/index.module.scss'
import CardComponent from '../../components/CardComponent';
import axios from 'axios';
import LoadingComponent from '../../components/LoadingComponent';

const ProductGroupPage = () => {

    const location = useLocation();
    const { slugify } = useParams();
    const [typeActive, setTypeActive] = useState(-1)
    const [dataTypes, setDataTypes] = useState([]);
    const [products, setProducts] = useState([])
    const [name, setName] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [productType, setProductsType] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)

    const handleGetData = async () => {
        setIsLoading(true)
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/type-product/get-all-type-product-name`)
        setDataTypes(response.data.types || [])
        setIsLoading(false)
    }

    const getProduct = async (page = currentPage) => {
        setIsLoading(true)

        if (location.pathname === '/products') {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/product/get-all-products-card?limit=20&page=${page}`)
            setName('Tất cả sản phẩm')
            setProducts(response.data?.products || [])
            setTotalPage(Math.max(response.data?.totalPage || 1, 1))
            setCurrentPage(Number(response.data?.curentPage || page))
            setIsLoading(false)
            return
        }

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
        setCurrentPage(1)
        handleGetData()
        getProduct(1)
    }, [location.pathname, slugify])

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPage) return;
        setCurrentPage(page)
        if (location.pathname === '/products') {
            getProduct(page)
        }
    }

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
        if (typeActive === -1) return
        handleGetProductType(dataTypes[typeActive]?.name)
    }, [typeActive, dataTypes])

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
                            if (typeActive!==-1 && !productType?.some(idProduct=>idProduct===product._id)) return null
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
                    {location.pathname === '/products' && totalPage > 1 && (
                        <div className={styleModule.paginationWrapper}>
                            <button type="button" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Trước</button>
                            <span>Trang {currentPage}/{totalPage}</span>
                            <button type="button" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPage}>Sau</button>
                        </div>
                    )}
                </div>
                {isLoading && <LoadingComponent />}
            </div>
        )
    }
    else {
        return (
            <div className={`${styleModule.DistributorPage} grid wide`}>
                <div className={styleModule.product_show_group}>
                    <div className={`${styleModule.product_title}`}>
                        <h3>{name || 'Sản phẩm'}</h3>
                    </div>

                    <div className={styleModule.emptyState}>
                        <div className={styleModule.emptyIcon}>
                            <i className="fa-solid fa-box-open"></i>
                        </div>
                        <h3>Không có sản phẩm</h3>
                        <p>Hiện tại danh mục này chưa có sản phẩm nào để hiển thị.</p>
                        <button
                            className={styleModule.continueShoppingBtn}
                            onClick={() => window.location.href = '/'}
                        >
                            Tiếp tục mua sắm
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductGroupPage