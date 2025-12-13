import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styleModule from './index.module.scss'
import CardComponent from '../../components/CardComponent';
import LoadingComponent from '../../components/LoadingComponent';

const DistributorPage = () => {
    const [distributors, setDistributors] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const handleGetData = async () => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/distributor-product/get-all-distributor-product-name`)
        .then(res => {
            setDistributors(res.data?.distributors)
            setIsLoading(false)
        })
    }
    useEffect(() => {
        setIsLoading(true)
        handleGetData()
    }, [])
    return (
        <div className={`${styleModule.DistributorPage} grid wide`}>
            <div className={styleModule.product_show_group}>
                <div className={`${styleModule.product_title}`}>
                    <h3>Các nhà phân phối</h3>
                </div>

                <div className={styleModule.product_block}>
                    {distributors.map((distributor, i) => (
                        <CardComponent
                            key={i}
                            type='image'
                            className={styleModule.card_item}
                            img={distributor.img}
                            name={distributor.name}
                            slugify={distributor.name}
                        />
                    ))}

                </div>
            </div>
            {isLoading && <LoadingComponent/>}
        </div>
    )
}

export default DistributorPage