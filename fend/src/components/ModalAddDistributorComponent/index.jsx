import React, { useEffect, useState } from 'react';
import styleModule from './index.module.scss'
import Button from '../ButtonComponent';
import LoadingComponent from '../LoadingComponent';
import axios from 'axios';
import { toast } from 'react-toastify';

function ModalAddDistributorComponent({ onClose, onSubmit, distributor }) {
    const [isLoading, setIsLoading] = useState(false)

    const [avatar, setAvatar] = useState(null);
    const [preview, setPreview] = useState(null);
    const [name, setName] = useState('');

    const [selectedAvatar, setSelectedAvatar] = useState(false)


    // const handleGetData = async () => {
    //     const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/distributor-product/get-all-distributor-product-name`)
    //     setDataDistributors(response.data.distributors)
    // }

    useEffect(() => {
        if (distributor) {
            console.log('first', distributor.img)
            setPreview(distributor.img)
            setName(distributor.name)
        }
    }, [])




    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        await axios.post(`${process.env.REACT_APP_BASE_URL}/distributor-product/check-already-name`, { name })
            .then(async respon => {
                if (respon.data.status === 409 && ((respon.data.distributor._id !== distributor?._id) || (preview===distributor.img))) {
                    const notifyWarning = () => toast.warning("Tên nhà phân phối này đã tồn tại");
                    notifyWarning()
                    setIsLoading(false)
                    return
                }
                const access_token = localStorage.getItem('token')
                if (!distributor) {
                    if (!name || !avatar){
                        const notifyWarning = () => toast.warning("Vui lòng nhập đủ thông tin");
                        notifyWarning()
                        setIsLoading(false)
                        return
                    }
                    const formData = new FormData();
                    formData.append('files', avatar);
                    try {
                        await axios.post(`${process.env.REACT_APP_BASE_URL}/upload/image/distributor`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                'token': `Bearer ${access_token}`
                            }
                        })
                            .then(response1 => {
                                if (!response1.data.status === "successd") {
                                    throw new Error('API 1 call failed');
                                }
                                return response1.data;
                            })
                            .then(async (data) => {
                                await axios.post(`${process.env.REACT_APP_BASE_URL}/distributor-product/create-new-distributor-product`, { name, img: data.files[0] }, {
                                    headers: {
                                        'token': `Bearer ${access_token}`
                                    }
                                })
                                    .then(response2 => {
                                        if (response2.data.status === 200) {
                                            const notifySuccess = () => toast.success("Tạo nhà phân phối mới thành công");
                                            notifySuccess()
                                        }
                                        setIsLoading(false)
                                        onClose()
                                        onSubmit()
                                    })
                            })
                    } catch (err) {
                        console.error(err);
                    }
                }
                else {
                    if (selectedAvatar) {
                        const formData = new FormData();
                        formData.append('files', avatar);
                        try {
                            await axios.post(`${process.env.REACT_APP_BASE_URL}/upload/distributor/delete`, { filename: distributor.img }, {
                                headers: {
                                    'token': `Bearer ${access_token}`
                                }
                            })
                                .then((response1) => {
                                    if (response1.status !== 200) {
                                        throw new Error('API 1 call failed');
                                    }
                                    return response1.data;
                                })
                                .then(async () => {
                                    await axios.post(`${process.env.REACT_APP_BASE_URL}/upload/image/distributor`, formData, {
                                        headers: {
                                            'Content-Type': 'multipart/form-data',
                                            'token': `Bearer ${access_token}`
                                        }
                                    })
                                        .then((response1) => {
                                            if (response1.status !== 200) {
                                                throw new Error('API 1 call failed');
                                            }
                                            return response1.data;
                                        })
                                        .then(async (data) => {
                                            await axios.put(`${process.env.REACT_APP_BASE_URL}/distributor-product/update-distributor-product/${distributor._id}`, { name, img: data.files[0] }, {
                                                headers: {
                                                    'token': `Bearer ${access_token}`
                                                }
                                            })
                                                .then(response2 => {
                                                    if (response2.data.status === 200) {
                                                        const notifySuccess = () => toast.success("Cập nhật nhà phân phối thành công");
                                                        notifySuccess()
                                                    }
                                                    setIsLoading(false)
                                                    onClose()
                                                    onSubmit()
                                                })
                                        })
                                })
                        } catch (err) {
                            console.error(err);
                        }
                    }
                    else {
                        await axios.put(`${process.env.REACT_APP_BASE_URL}/distributor-product/update-distributor-product/${distributor._id}`, { name }, {
                            headers: {
                                'token': `Bearer ${access_token}`
                            }
                        })
                            .then(response2 => {
                                if (response2.data.status === 200) {
                                    const notifySuccess = () => toast.success("Cập nhật nhà phân phối thành công");
                                    notifySuccess()
                                }
                                setIsLoading(false)
                                onClose()
                                onSubmit()
                            })
                    }
                }
            }
            )
    };








    const handleFileChange = (e) => {
        setSelectedAvatar(true)
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    // useEffect(()=>{
    //     console.log('priver', preview)
    // }, preview)

    return (
        <div className={styleModule.overlay}>
            <div className={styleModule.form}>
                <div className={styleModule.header}>
                    <h1>Nhập thông tin của nhà phân phối</h1>
                    <div className={styleModule.closeForm} onClick={onClose}>
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                </div>

                <div className={styleModule.body}>
                    <label className={styleModule.selectAvatar} htmlFor='avatar'>
                        {preview ? <img src={preview} />
                            : <i className="fa-solid fa-plus"></i>}
                    </label>
                    <input type="file" id='avatar' accept=".png, .jpg, .jpeg" hidden onChange={handleFileChange} />


                    <input className={styleModule.name} type="text" value={name} onChange={(e) => setName(e.target.value.toUpperCase())} placeholder='Nhập tên nhà phân phối...' />
                </div>

                <div className={styleModule.footer}>
                    <Button
                        content='Xác nhận'
                        p='5px 10px'
                        fsize='14px'
                        onClick={handleSubmit}
                    />
                    <Button
                        content='Đóng'
                        bgc='#ccc'
                        p='5px 10px'
                        fsize='14px'
                        onClick={onClose}
                    />
                </div>
            </div>
            {isLoading && <LoadingComponent />}
        </div>
    );
}


export default ModalAddDistributorComponent;
