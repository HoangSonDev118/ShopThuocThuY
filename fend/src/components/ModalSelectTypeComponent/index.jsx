import React, { useEffect, useState } from 'react';
import styleModule from '../ModalSelectDistributorComponent/index.module.scss'
import Button from '../ButtonComponent';
import axios from 'axios';
import LoadingComponent from '../LoadingComponent';
import { toast } from 'react-toastify';


function ModalSelectTypeComponent({ onClose, onSubmit, selectedTypes, setSelectedTypes }) {

    const [dataTypes, setDataTypes] = useState([]);

    const [isLoading, setIsLoading] = useState(false)

    //CALL API DATATYPE
    const handleGetData = async () => {
        setIsLoading(true)
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/type-product/get-all-type-product-name`)
        setDataTypes(response.data.types)
        setIsLoading(false)
    }
    useEffect(() => {
        handleGetData()
    }, [])


    // const [dataTypes, setDataTypes] = useState([
    //     'Thức ăn cho chó', 'vacin', 'đồ chơi cho mèo', 'Sản phẩm cho chó'
    // ])


    // const [selectedTypes, setSelectedTypes] = useState(selectedTypesProp);


    const handleTypeClick = (type) => {
        if (editMode) return
        console.log('compare')
        if (selectedTypes.some(item => item._id === type._id)) {
            setSelectedTypes(selectedTypes.filter((selected) => selected._id !== type._id));
        } else {
            setSelectedTypes([...selectedTypes, type]);
        }
    };


    const [editMode, setEditmode] = useState(false)

    const handleSubmit = () => {
        onSubmit(selectedTypes);
        onClose();
    };

    const handleAddType = async () => {
        const newType = prompt('Nhập tên loại sản phẩm mới: ')
        if (newType) {
            setIsLoading(true)
            await axios.post(`${process.env.REACT_APP_BASE_URL}/type-product/create-new-type-product`, { name: newType })
                .then((response) => {
                    if (response.data.status === 409) {
                        const notifyWarning = () => toast.warning("Tên loại sản phẩm đã tồn tại");
                        notifyWarning()
                    }
                    setIsLoading(false)
                })
            handleGetData()
        }
    }
    const handleDeleteType = async (id) => {
        const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa loại sản phẩm này ?')
        if (confirmDelete) {
            setIsLoading(true)
            if (selectedTypes.some(item => item._id === id)) {
                setSelectedTypes(selectedTypes.filter((selected) => selected._id !== id));
            }
            await axios.delete(`${process.env.REACT_APP_BASE_URL}/type-product/delete-type-product/${id}`)
                .then(() => {
                    setIsLoading(false)
                })
            handleGetData()
        }
    }
    const handleFocus = (e) => {
        e.target.parentNode.style = 'border: 2px solid #ffb900'
    };
    const handleBlur = async (e, type) => {
        e.target.parentNode.style = 'border: 2px solid transparent'
        const newType = document.getElementById(type._id).innerText
        if (type.name === newType) return
        setIsLoading(true)

        if (selectedTypes.some(item => item._id === type._id)) {
            const newNameType = selectedTypes.find(item => item._id === type._id)
            newNameType.name = newType
        }
        await axios.put(`${process.env.REACT_APP_BASE_URL}/type-product/update-type-product/${type._id}`, { name: newType })
            .then(() => {
                setIsLoading(false)
            })
        handleGetData()
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();  // Ngăn việc thêm ký tự xuống dòng
            event.target.blur();     // Bỏ focus khỏi span
        }
    };

    useEffect(() => {

        console.log(selectedTypes)

        // const newTypes = Array.from(document.querySelectorAll('.typeSpanBox')).map(element => element.innerText);
        // console.log('first', newTypes)
        // if (!dataTypes.some((type, i) => type != newTypes[i])) return
        // console.log('change')
        // setDataTypes(newTypes)
    }, [editMode])


    return (
        <div className={styleModule.overlay}>
            <div className={styleModule.form} style={{ width: 500 }}>
                <div className={styleModule.header}>
                    <h1>Chọn loại sản phẩm</h1>
                    <div className={styleModule.closeForm} onClick={onClose}>
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                </div>

                <div className={styleModule.body}>
                    {dataTypes.length ? (<div className={styleModule.types}>
                        <div className={styleModule.types_list}>
                        {dataTypes.map((type, index) => {
                            if (!type.important || type.type_animal) return
                            return (
                                <div
                                    key={index}
                                    // className={`${styleModule.type} `}

                                    className={`${styleModule.type} ${!editMode && (selectedTypes.some(item => item._id === type._id)) ? styleModule.active : ''}`}
                                    id={type._id}
                                    style={{ cursor: editMode ? 'auto' : 'pointer' }}
                                    onClick={() => handleTypeClick(type)}
                                >
                                    <span 
                                        onKeyDown={handleKeyDown}

                                    // onInput={(e) => handleInput(e, index)}
                                    >
                                        {type.name}
                                    </span>
                                </div>
                            )
                        })}
                        </div>
                        <div style={{borderBottom: '2px solid #ccc', display: 'block', margin: 10}}></div>
                        <div className={styleModule.types_list}>
                        {dataTypes.map((type, index) => {
                            if (type.important || !type.type_animal) return
                            return (
                                <div
                                    key={index}
                                    // className={`${styleModule.type} `}

                                    className={`${styleModule.type} ${!editMode && (selectedTypes.some(item => item._id === type._id)) ? styleModule.active : ''}`}
                                    id={type._id}
                                    style={{ cursor: editMode ? 'auto' : 'pointer' }}
                                    onClick={() => handleTypeClick(type)}
                                >
                                    <span
                                        onKeyDown={handleKeyDown}

                                    // onInput={(e) => handleInput(e, index)}
                                    >
                                        {type.name}
                                    </span>
                                </div>
                            )
                        })}
                        </div>
                        <div style={{borderBottom: '2px solid #ccc', display: 'block', margin: 10}}></div>
                        <div className={styleModule.types_list}>
                        {dataTypes.map((type, index) => {
                            if (type.important || type.type_animal) return
                            return (
                                <div
                                    key={index}
                                    // className={`${styleModule.type} `}

                                    className={`${styleModule.type} ${!editMode && (selectedTypes.some(item => item._id === type._id)) ? styleModule.active : ''}`}
                                    id={type._id}
                                    style={{ cursor: editMode ? 'auto' : 'pointer' }}
                                    onClick={() => handleTypeClick(type)}
                                >
                                    <span role="textbox"
                                        className='typeSpanBox'
                                        suppressContentEditableWarning={true}
                                        contentEditable={editMode}
                                        onFocus={(e) => handleFocus(e)}
                                        onBlur={(e) => handleBlur(e, type)}
                                        onKeyDown={handleKeyDown}

                                    // onInput={(e) => handleInput(e, index)}
                                    >
                                        {type.name}
                                    </span>
                                    {editMode && <i className={`fa-solid fa-circle-xmark ${styleModule.deleteType}`} onClick={() => handleDeleteType(type._id)}></i>}
                                </div>
                            )
                        })}
                        </div>
                    </div>) : (
                        <div className={styleModule.noData}><i className="fa-solid fa-file"></i><h2>Không có dữ liệu</h2></div>
                    )}
                </div>

                <div className={styleModule.footer}>
                    <span style={editMode ? { backgroundColor: '#ffb900' } : { backgroundColor: '#ccc' }} className={styleModule.editBtn} onClick={() => setEditmode(s => !s)}><i className="fa-solid fa-pen-to-square"></i></span>
                    <span className={styleModule.addBtn} onClick={handleAddType}><i className="fa-solid fa-circle-plus"></i></span>

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


                    {/* <button style={{ backgroundColor: '#ccc' }} onClick={handleSubmit}>Submit</button>
                    <button style={{ backgroundColor: 'red' }} onClick={onClose}>Close</button> */}
                </div>
            </div>
            {isLoading && <LoadingComponent />}
        </div>
    );
}


export default ModalSelectTypeComponent;
