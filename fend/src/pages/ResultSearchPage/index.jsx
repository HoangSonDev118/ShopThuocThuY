import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage';
import styleModule from './index.module.scss'
import axios from 'axios';
import CardComponent from '../../components/CardComponent';
import Button from '../../components/ButtonComponent';
import LoadingComponent from '../../components/LoadingComponent';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function ResultSearchPage() {
    const [productsShow, setProductsShow] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const query = useQuery();
    const searchTerm = query.get('q');

    const handleSearchApi = async () => {
        setIsLoading(true)
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/product/search?q=${encodeURIComponent(searchTerm.trim())}&type=more`)
            .then(res => {
                setProductsShow(res.data)
                setIsLoading(false)
            })

        return res
    }

    useEffect(() => {
        handleSearchApi()
    }, [])


    if (!searchTerm) return <NotFoundPage />
    return (
        <div className={`${styleModule.search_result_page} grid wide`}>
            <h3 className={`${styleModule.title}`}>Có <span style={{ color: '#d08f00' }}>{productsShow.length}</span> kết quả</h3>
            {/* <h5 className={`${styleModule.title}`}>Có : <b>{searchTerm}</b></h5> */}
            <div className={styleModule.product_show_group}>
                <div className={`${styleModule.product_title}`}>
                    <h3>Tìm kiếm cho : "{searchTerm}"</h3>
                </div>

                <div className={styleModule.product_block}>

                    {productsShow.map((product, i) => (
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
                    />

                </div>
            </div>
            {isLoading && <LoadingComponent/>}
        </div>
    );
}

export default ResultSearchPage;
