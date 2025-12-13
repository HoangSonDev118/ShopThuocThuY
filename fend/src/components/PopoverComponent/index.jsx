import React, { useEffect, useRef } from 'react'
import styleModule from './index.module.scss'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const PopoverComponent = ({ logOutClick }) => {
    const userInfor = useSelector((state) => state.userInfor)
    return (
        <div className={styleModule.popover}>
            <div><Link to={userInfor.isAdmin ? '/system/admin' : '/user-profile'}>{userInfor.isAdmin ? 'Quản lý hệ thống' : 'Thông tin tài khoản'}</Link></div>
            <div><Link to={'/cart'}>Đơn hàng</Link></div>
            <div onClick={logOutClick}
            >Đăng xuất</div>
        </div>
    )
}

export default PopoverComponent