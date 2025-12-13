import React from 'react'
import './index.module.scss'

const InputCheckBox = (props) => {
    const { id, isChecked, handleCheckboxChange } = props
    return (
        <input type='checkbox'
            id={id}
            checked={isChecked} // Giá trị của checkbox được liên kết với state
            onChange={handleCheckboxChange} // Hàm xử lý sự kiện thay đổi
        />
    )
}

export default InputCheckBox