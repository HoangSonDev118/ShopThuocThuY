import React, { useEffect, useState } from 'react';
import styleModule from './index.module.scss'
import Button from '../ButtonComponent';
import axios from 'axios';
import LoadingComponent from '../LoadingComponent';
import { toast } from 'react-toastify';
import ModalAddDistributorComponent from '../ModalAddDistributorComponent';


function ModalSelectDistributorComponent({ onClose, onSubmit, selectedDistributor, setSelectedDistributor }) {

    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const closeAddModal = () => {
        setOpenModalAdd(false)
        setOpenModalEdit(false)
    }
    const [dataDistributors, setDataDistributors] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    //CALL API DATATYPE
    const handleGetData = async () => {
        setIsLoading(true)
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/distributor-product/get-all-distributor-product-name`)
        setDataDistributors(response.data.distributors)
        setIsLoading(false)
    }
    useEffect(() => {
        handleGetData()
    }, [])

    const [idEdit, setIdEdit] = useState('')

    const handleTypeClick = (distributor) => {
        if (editMode){
            setIdEdit(distributor)
            setOpenModalEdit(true)
            return
        }
        else{
            if (distributor._id === selectedDistributor?._id) {
                setSelectedDistributor({})
            }
            else {
                setSelectedDistributor(distributor)
            }
        }
    };

    const [editMode, setEditmode] = useState(false)

    const handleSubmit = () => {
        onSubmit();
        onClose();

        setSelectedDistributor(dataDistributors.find(distributor=>distributor._id === selectedDistributor?._id))
    };

    const handleAddDistributor = async () => {
        setOpenModalAdd(true)
    }
    const handleDeleteType = async (e, distributor) => {
        e.stopPropagation()
        const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa nhà phân phối này này ?')
        if (confirmDelete) {
            setIsLoading(true)
            const access_token = localStorage.getItem('token')
            try {
                if (selectedDistributor._id === distributor._id){
                    setSelectedDistributor({})
                }
                await axios.post(`${process.env.REACT_APP_BASE_URL}/upload/distributor/delete`, { filename: distributor.img }, {
                    headers: {
                        'token': `Bearer ${access_token}`
                    }
                })
                    .then(response1 => {
                        if (!response1.data.status === 200) {
                            throw new Error('API 1 call failed');
                        }
                        return response1.data;
                    })
                    .then(async () => {
                        await axios.delete(`${process.env.REACT_APP_BASE_URL}/distributor-product/delete-distributor-product/${distributor._id}`, {
                            headers: {
                                'token': `Bearer ${access_token}`
                            }
                        })
                            .then(response2 => {
                                if (response2.status === 200) {
                                    const notifySuccess = () => toast.success("Xóa nhà phân phối thành công");
                                    notifySuccess()
                                }
                                setIsLoading(false)
                            })
                    })
            } catch (err) {
                console.error(err);
            }
            handleGetData()
        }
    }

    return (
        <div className={styleModule.overlay}>
            <div className={styleModule.form} style={{ width: 500 }}>
                <div className={styleModule.header}>
                    <h1>Chọn công ty phân phối</h1>
                    <div className={styleModule.closeForm} onClick={onClose}>
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                </div>

                <div className={styleModule.body}>
                    {dataDistributors.length ? (<div className={styleModule.distributors}>
                        {dataDistributors.map((distributor, index) => (
                            <div
                                key={index}
                                // className={`${styleModule.type} `}

                                className={`${styleModule.distributor} ${(!editMode && (distributor._id === selectedDistributor?._id)) ? styleModule.active : ''}`}
                                id={distributor._id}
                                style={{ cursor: editMode ? 'auto' : 'pointer' }}
                                onClick={() => handleTypeClick(distributor)}
                            >
                                <img src={distributor.img} />
                                <span>{distributor.name}</span>

                                {editMode && <i className={`fa-solid fa-circle-xmark ${styleModule.deleteType}`} onClick={(e) => handleDeleteType(e,distributor)}></i>}

                            </div>
                        ))}
                    </div>) : (
                        <div className={styleModule.noData}><i className="fa-solid fa-file"></i><h2>Không có dữ liệu</h2></div>
                    )}
                </div>
                <div className={styleModule.footer}>
                    <span style={editMode ? { backgroundColor: '#ffb900' } : { backgroundColor: '#ccc' }} className={styleModule.editBtn} onClick={() => setEditmode(s => !s)}><i className="fa-solid fa-pen-to-square"></i></span>
                    <span className={styleModule.addBtn} onClick={handleAddDistributor}><i className="fa-solid fa-circle-plus"></i></span>
                    {openModalEdit && <ModalAddDistributorComponent onClose={closeAddModal} onSubmit={handleGetData} distributor={idEdit} />}
                    {openModalAdd && <ModalAddDistributorComponent onClose={closeAddModal} onSubmit={handleGetData}/>}
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
                        onClick={handleSubmit}
                    />
                </div>
            </div>
            {isLoading && <LoadingComponent />}
        </div>
    );
}


export default ModalSelectDistributorComponent;
