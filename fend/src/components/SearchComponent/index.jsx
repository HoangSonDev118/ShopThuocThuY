import React, { memo, useEffect, useRef, useState } from 'react'
import Input from '../InputComponent'
import Button from '../ButtonComponent'
import styleModule from '../HeaderComponent/index.module.scss'
import { priceDisplay } from '../../utils/priceDisplay'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDebounce } from '../../hooks/useDebounce'


const SearchComponent = React.memo(({ value, setSearch }) => {
    const navigate = useNavigate()

    const [showResult, setShowResult] = useState(false)

    const debounce = useDebounce(value, 500)

    const inputRef = useRef(null);
    const handleOnSearch = (e) => {
        setSearch(e.target.value)
    }


    useEffect(() => {
        const handleClickOutPopover = (e) => {
            if (inputRef.current === document.activeElement) {
                setShowResult(true)
            }
            else { setShowResult(false) }
        }
        document.addEventListener('click', handleClickOutPopover)
        return () => {
            document.removeEventListener('click', handleClickOutPopover)
        }
    }, [])

    const [dataResult, setDataResult] = useState([])


    // const dataResult = [
    //     {
    //         name: 'nắp silicon bảo quản thức ăn kèm thìa',
    //         price: 28000,
    //         img: 'https://product.hstatic.net/200000263355/product/z4999286777666_255bfbab3994c8e560eaecb2623901ba_ce4f4c2156154255a001180fdf7a2b78_compact.jpg'
    //     },
    //     {
    //         name: 'Bàn chải đánh răng Budle’Budle đeo ngón tay cho chó mèo',
    //         price: 28000,
    //         img: 'https://product.hstatic.net/200000263355/product/secv9013_0f2d5b81ab274902b8096952d13266ee_master.jpg'
    //     },
    //     {
    //         name: 'Snack cho chó Bít tết Bò Cừu Cá hồi',
    //         price: 138000,
    //         img: 'https://product.hstatic.net/200000263355/product/z5607826917045_d558d6bb8c97fa61a124193780ed5a50_c76faa4f9e934c83b79c2eb98c13514c_master.jpg'
    //     },
    // ]


    const handleSubmitSearch = (e) => {
        e.preventDefault();
        if (value == '') return
        navigate(`/search?q=${value}`);
        window.location.reload();
    };


    const handleSearchApi = async () => {
        if (!debounce.trim()) return
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/product/search?q=${encodeURIComponent(debounce.trim())}&type=less`)
            .then(res => {
                const dataProduct = res.data?.map(product => ({
                    name: product.product_name,
                    price: product.product_types[0]?.price,
                    img: product.product_imgs[0],
                    slugify: product.product_slugify
                }));
                setDataResult(dataProduct)
            })

        return res
    }

    useEffect(() => {
        if (!value.trim()) {
            setDataResult([])
        }
        handleSearchApi()
    }, [debounce])

    const handleClickProduct = (slugify) => {
        navigate(`/products/${slugify}`)
        window.location.reload();
    }





    return (
        <div className={styleModule.header_search}>
            <form>
                <Input
                    ref={inputRef}
                    placeholder="Tìm kiếm ..."
                    w='85%'
                    p='8px 20px'
                    bgc='white'
                    border='2px solid rgb(208 143 0)'
                    br='20px'
                    fsize='15px'
                    handleOnChange={handleOnSearch}
                    inputValue={value}
                />
                <Button
                    onClick={handleSubmitSearch}
                    content=''
                    p='8px 30px'
                    m="0 0 0 10px"
                    br='20px'
                    fsize='15px'
                    icon='fa-solid fa-magnifying-glass'
                    bdl='none'
                />
            </form>
            {value.trim().length !== 0 && showResult && dataResult.length > 0 && <div className={styleModule.search_resutl}>
                <div className={styleModule.prodict_list}>
                    {dataResult?.map((item, i) => (
                        <div className={styleModule.prodict_item} key={i} onClick={() => handleClickProduct(item.slugify)}>
                            <img src={item.img} />
                            <div className={styleModule.prodict_item_infor}>
                                <div className={styleModule.prodict_item_name}>
                                    {item.name}
                                </div>
                                <div className={styleModule.prodict_item_price}>
                                    {priceDisplay(item.price)}
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
                <div className={styleModule.show_more} onClick={handleSubmitSearch}>
                    Xem thêm
                </div>
            </div>}
        </div>
    )
})

export default SearchComponent