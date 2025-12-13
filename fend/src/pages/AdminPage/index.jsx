import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styleModule from './index.module.scss'
import Button from '../../components/ButtonComponent'
import NotificationComponent from '../../components/NotificationComponent'
import UserComponent from '../../components/UserComponent'
import ProductComponent from '../../components/ProductComponent'
import OrderComponent from '../../components/OrderComponent'
import * as userService from '../../services/userService'
import * as productService from '../../services/productService'
import * as notificationService from '../../services/notificationService'
import * as orderService from '../../services/orderService'
import { useQuery } from 'react-query'
import NavMobileComponent from '../../components/NavMobileComponent'
import DisplayComponent from '../../components/DisplayComponent'
const AdminPage = () => {
    const navigate = useNavigate()
    const renderComponent = (componentName) => {
        switch (componentName) {
            case 'notification':
                return <NotificationComponent notifications={notifications} queryNotifications={queryNotifications} />;
            case 'display':
                return <DisplayComponent />;
            case 'user':
                return <UserComponent users={usersData} queryUsers={queryUsers} />;
            case 'product':
                return <ProductComponent productsData={productsData} queryProducts={queryProducts} changePage={handlePageProductChange} queryNotifications={queryNotifications} />;
            case 'order':
                return <OrderComponent orders={orders} queryOrders={queryOrders} />;

            default:
                return <div>Component not found</div>;
        }
    };

    const [pageProduct, setPageProduct] = useState(1)


    const handleGetAllUser = async () => {
        const access_token = localStorage.getItem('token')
        const res = await userService.getAllUserApi(access_token)
        return res.users
    }
    const queryUsers = useQuery({
        queryKey: ['users'],
        queryFn: handleGetAllUser,
    })
    const { data: usersData } = queryUsers




    const handleGetAllProduct = async (page) => {
        const res = await productService.getAllProductApi(page)
        return res
    }
    const queryProducts = useQuery({
        queryKey: ['products'],
        queryFn: () => handleGetAllProduct(pageProduct),
    })
    const { data: productsData, refetch: refetchProductPage } = queryProducts


    const handleGetAllNotification = async (page) => {
        const res = await notificationService.getAllNotificationApi(page)
        return res
    }
    const queryNotifications = useQuery({
        queryKey: ['notifications'],
        queryFn: () => handleGetAllNotification(),
    })
    const { data: notifications } = queryNotifications



    const handleGetAllOrders = async () => {
        const res = await orderService.getAllOrderApi()
        return res
    }
    const queryOrders = useQuery({
        queryKey: ['orders'],
        queryFn: () => handleGetAllOrders(),
    })
    const { data: orders } = queryOrders




    const handlePageProductChange = (newPage) => {
        setPageProduct(newPage); // Cập nhật page
    };


    useEffect(() => {
        refetchProductPage();
    }, [pageProduct])










    const [currentComponent, setCurrentComponent] = useState('notification');
    const [showMenuMobile, setShowMenuMobile] = useState(false)

    const closeMenu = () => {
        setShowMenuMobile(false)
    }




    return (
        <div className={styleModule.admin_page}>
            <div className={styleModule.header}>
                <div>Quản lý hệ thống</div>
                <span>(chỉ dành cho quản trị viên)</span>
                <i className={`fa-solid fa-bars ${styleModule.menuMobile}`} onClick={() => setShowMenuMobile(s => !s)}></i>
                {showMenuMobile && <NavMobileComponent close={closeMenu} type={2}>
                    <div onClick={() => setCurrentComponent('notification')}><i className="fa-regular fa-bell"></i> Thông báo
                        {notifications?.totalNewNotification > 0 && <span>{notifications.totalNewNotification}</span>}</div>
                    <div onClick={() => setCurrentComponent('display')}><i className="fa-solid fa-display"></i> Giao diện</div>
                    <div onClick={() => setCurrentComponent('user')}><i className="fa-regular fa-user"></i> Người dùng</div>
                    <div onClick={() => setCurrentComponent('product')}><i className="fa-solid fa-boxes-stacked"></i> Sản phẩm</div>
                    <div onClick={() => setCurrentComponent('order')}><i className="fa-solid fa-box"></i> Đơn hàng</div>
                    <button style={{ color: '#ff6d6d' }} onClick={() => navigate('/')}><i className="fa-solid fa-right-from-bracket"></i> Thoát</button>
                </NavMobileComponent>}

            </div>


            <div className={styleModule.body}>
                <div className={styleModule.nav}>
                    <div onClick={() => setCurrentComponent('notification')}><i className="fa-regular fa-bell"></i> Thông báo
                        {notifications?.totalNewNotification > 0 && <span className={styleModule.count}>{notifications.totalNewNotification}</span>}
                    </div>
                    <div onClick={() => setCurrentComponent('display')}><i className="fa-solid fa-display"></i> Giao diện</div>
                    <div onClick={() => setCurrentComponent('user')}><i className="fa-regular fa-user"></i> Người dùng</div>
                    <div onClick={() => setCurrentComponent('product')}><i className="fa-solid fa-boxes-stacked"></i> Sản phẩm</div>
                    <div onClick={() => setCurrentComponent('order')}><i className="fa-solid fa-box"></i> Đơn hàng</div>
                    <div style={{ color: '#ff6d6d' }} onClick={() => navigate('/')}><i className="fa-solid fa-right-from-bracket"></i> Thoát</div>
                </div>
                <div className={styleModule.content}>
                    {renderComponent(currentComponent)}
                </div>

            </div>
        </div>
    )
}

export default AdminPage