import React, { useState } from 'react'
import styleModule from './index.module.scss'
import Button from '../ButtonComponent';
import axios from 'axios';
import { toast } from 'react-toastify';

const DisplayComponent = () => {

    const [selectedImages, setSelectedImages] = useState([]);

    const handleImageChange = (event) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            const imageUrls = files.map(file => URL.createObjectURL(file));
            setSelectedImages(imageUrls);
        }
    };

    const handleDeleteImgShow = (i) => {
        const newImgs = [...selectedImages]
        newImgs.splice(i, 1)
        setSelectedImages(newImgs)
    }

    const handleSelectMoreImg = (event) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            const imageUrls = files.map(file => URL.createObjectURL(file));
            const newImgs = [...selectedImages, ...imageUrls]
            setSelectedImages(newImgs);
        }
    }
    const handleRefreshImgs = () => {
        setSelectedImages([])
    }



    const [navs, setNavs] = useState(
        [
            { name: 'Tất cả sản phẩm', href: 'http://localhost:3000/' },
            { name: 'Sản phẩm cho mèo', childs: [{ name: 'Đồ ăn', href: 'http://localhost:3000/' }] },
            // { name: 'Sản phẩm cho chó' }
        ]
    )


    const handleOnChangeNav = (e, i, typeChange) => {
        // // Sao chép mảng hiện tại
        // const newTypes = [...navs];

        // if (typeChange === 'name') {
        //     newTypes[i].name = e.target.value
        // } else if (typeChange === 'addChild') {
        //     newTypes[i].child.push({ name: '' })
        //     console.log('first')
        //     // if (newTypes[i].some(type => type.name === '')) return
        // }else if (typeChange === 'removeChild'){  
        //     // newTypes[i].child.splice()
        // } else if (typeChange === 'add') {
        //     if (newTypes.some(type => type.name === '')) return
        //     // const newType = prompt('Nhập link cho điều hướng mới : ')
        //     // if (newType) {
        //     //     const newTypes = [...dataTypes]
        //     //     newTypes.push(newType)
        //     //     setDataTypes(newTypes)
        //     //     // setDataType(prev => prev.push(newType))
        //     //     console.log('no')
        //     // }
        //     // console.log('add')
        //     newTypes.push({ name: '', price: '' })
        // } else if (typeChange === 'remove') {
        //     console.log('remove')
        //     newTypes.splice(i, 1)
        //     console.log(newTypes)
        //     if (newTypes.length === 1) {
        //         newTypes[0].name = 'Mặc định'
        //     }
        // }

        // // Cập nhật state
        // setNavs(newTypes);
        const newNavs = [...navs];
        if (typeChange === 'add') {
            newNavs.push({ name: '' })
        } else if (typeChange === 'remove') {
            newNavs.splice(i, 1)
        } else if (typeChange === 'name') {
            newNavs[i].name = e.target.value
        } else if (typeChange === 'addHref') {
            const newHref = prompt('Nhập link cho điều hướng mới : ')
            if (newHref) {
                delete newNavs[i].childs
                newNavs[i].href = newHref
            }
        }
        setNavs(newNavs);
    }
    const handleOnChangeNavChild = (e, i, typeChange, iChild) => {
        const newNavs = [...navs]
        if (typeChange === 'add') {
            if (!newNavs[i].childs) {
                delete newNavs[i].href
                newNavs[i].childs = []
            }
            newNavs[i].childs.push({ name: '' })
        } else if (typeChange === 'remove') {
            console.log('first', newNavs[i].childs)

            // newNavs.splice(i, 1)

            newNavs[i].childs.splice(iChild, 1)
        } else if (typeChange === 'name') {
            newNavs[i].childs[iChild].name = e.target.value
        } else if (typeChange === 'addHref') {
            const newHref = prompt('Nhập link cho điều hướng mới : ')
            if (newHref) {
                newNavs[i].childs[iChild].href = newHref
            }
        }
        setNavs(newNavs)
    }






    const handleDeleteProduct = async (e, id) => {
        e.stopPropagation()
        const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này ?')
        if (confirmDelete) {
            const access_token = localStorage.getItem('token')
            try {
                await axios.get(`${process.env.REACT_APP_BASE_URL}/product/get-images-product/${id}`, {
                    headers: {
                        'token': `Bearer ${access_token}`
                    }
                })
                    .then(async (res) => {
                        console.log(res.data.product.product_imgs)
                        await axios.post(`${process.env.REACT_APP_BASE_URL}/upload/product/delete`, { imagePaths: res.data.product.product_imgs }, {
                            headers: {
                                'token': `Bearer ${access_token}`
                            }
                        })
                            .then(async () => {
                                await axios.delete(`${process.env.REACT_APP_BASE_URL}/product/delete-product/${id}`, {
                                    headers: {
                                        'token': `Bearer ${access_token}`
                                    }
                                })
                                    .then(async response3 => {
                                        if (response3.data.status === 200) {
                                            const notifySuccess = () => toast.success("Xóa sản phẩm thành công");
                                            notifySuccess()
                                        }
                                    })
                            })
                    })
            } catch (err) {
                console.error(err);
            }
        }
    }



























    return (
        <div>
            <div className={styleModule.banner}>
                <div className={styleModule.product_show}>
                    <div className={styleModule.product_show_main}>
                        {selectedImages.length === 0 ? (<><label className={styleModule.selectMain} htmlFor='mainImg'><i className="fa-solid fa-plus"></i></label>
                            <input id='mainImg' type='file' hidden
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                            /></>) : (<div className={styleModule.mainImgShow}>
                                <a className={styleModule.mainImgShowHiden} href={selectedImages[0]} target="_blank" rel="noopener noreferrer">
                                    <img src={selectedImages[0]} />
                                </a>
                                <i onClick={() => handleDeleteImgShow(0)} className={`fa-duotone fa-solid fa-circle-xmark ${styleModule.deleteImg}`}></i>
                            </div>
                        )}
                    </div>
                    <div className={styleModule.product_show_sub}>
                        {selectedImages.map((image, index) => {
                            if (index === 0) return
                            return (
                                <div key={index} className={styleModule.subImg}>
                                    <a href={image} target="_blank" rel="noopener noreferrer">
                                        <img src={image} />
                                    </a>
                                    <i onClick={() => { handleDeleteImgShow(index) }} className={`fa-solid fa-circle-xmark ${styleModule.deleteImg}`}></i>
                                </div>
                            )
                        }
                        )}
                        {selectedImages.length !== 0 && <div>
                            <label className={styleModule.selectMoreImg} htmlFor='mainImg'><i className="fa-solid fa-plus"></i></label>
                            <input id='mainImg' type='file' hidden
                                multiple
                                accept="image/*"
                                onChange={handleSelectMoreImg} />
                        </div>}
                        {selectedImages.length !== 0 && <div>
                            <i className={`fa-solid fa-rotate-right ${styleModule.refreshBtn}`} onClick={handleRefreshImgs}></i>
                        </div>
                        }
                    </div>
                </div>
            </div>

            <div className={styleModule.navs}>
                {navs.map((nav, i) => (
                    // <div className={styleModule.nav} key={i}>
                    //     <input className={styleModule.typeName} value={nav.name} onChange={(e) => handleOnChangeType(e, i, 'name')} placeholder='tên loại...' />
                    //     {nav.href ? (<a>{nav.href}</a>) : (<i onClick={(e) => handleOnChangeType(e, i, 'addChild')} className="fa-solid fa-circle-plus"></i>)}
                    //     {nav.child ?
                    //         nav.child.map((child, i) => (
                    //             <div key={i} style={{ backgroundColor: 'red' }}><input /> <i className="fa-solid fa-link"></i> </div>
                    //         ))
                    //         : (<i className="fa-solid fa-link"></i>)}
                    //     {/* <i className="fa-solid fa-link"></i> */}
                    //     {/* <i className="fa-solid fa-circle-plus"></i>
                    //     <i onClick={(e) => handleOnChangeType(e, i, 'remove')} className={`fa-solid fa-circle-xmark ${styleModule.deleteType}`}></i> */}
                    // </div>
                    <div className={styleModule.nav} key={i}>
                        <input className={styleModule.navName} value={nav.name} onChange={(e) => handleOnChangeNav(e, i, 'name')} placeholder='tên loại...' />
                        <i className={`fa-solid fa-link ${styleModule.buttonNav}`} onClick={(e) => handleOnChangeNav(e, i, 'addHref')}></i>
                        <i className={`fa-solid fa-circle-plus ${styleModule.buttonNav}`} onClick={(e) => handleOnChangeNavChild(e, i, 'add')}></i>
                        <i onClick={(e) => handleOnChangeNav(e, i, 'remove')} className={`fa-solid fa-circle-xmark ${styleModule.deleteNav}`}></i>
                        {nav.href && <a target='_blank' href={nav.href} className={styleModule.navHref}>{nav.href}</a>}
                        <div className={styleModule.navChilds}>
                            {nav.childs?.map((child, indexChild) => (
                                <div key={indexChild} className={styleModule.navChild}>
                                    <input onChange={(e) => handleOnChangeNavChild(e, i, 'name', indexChild)} value={child.name} />
                                    {/* <i onClick={(e) => handleOnChangeNavChild(e, i, 'addHref', indexChild)} className="fa-solid fa-link"></i> */}
                                    <i className={`fa-solid fa-link ${styleModule.buttonNavChild}`} onClick={(e) => handleOnChangeNavChild(e, i, 'addHref', indexChild)}></i>
                                    <i onClick={(e) => handleOnChangeNavChild(e, i, 'remove', indexChild)} className={`fa-solid fa-circle-xmark ${styleModule.deleteNav}`}></i>
                                    {child.href && <a target='_blank' className={styleModule.navHref} href={child.href}>{child.href}</a>}
                                </div>
                            ))}
                        </div>
                    </div>

                ))}
                <div className={styleModule.addNav} onClick={(e) => handleOnChangeNav(e, navs.length, 'add')}><i className="fa-solid fa-circle-plus"></i></div>

                <button onClick={() => console.log(navs)}>submit</button>

            </div>
        </div>
    )
}

export default DisplayComponent