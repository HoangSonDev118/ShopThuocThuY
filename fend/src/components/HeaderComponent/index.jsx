import React, { memo, useEffect, useRef, useState } from 'react'
import styleModule from './index.module.scss'
import Input from '../InputComponent'
import Button from '../ButtonComponent'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { useMutationHook } from '../../hooks/useMutation'
import * as userService from '../../services/userService'
import { resetUser } from '../../redux/Slices/userSlice'


import logo from '../../assets/images/Logo3.png'
import logoMobile from '../../assets/images/Logo2.png'
import NavMobileComponent from '../NavMobileComponent'
import { toast } from 'react-toastify'
import PopoverComponent from '../PopoverComponent'
import SearchComponent from '../SearchComponent'

import logoUser from '../../assets/images/user.png'

const HeaderComponent = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userInfor = useSelector((state) => state.userInfor)
    const cart = useSelector((state) => state.cart)
    const [search, setSearch] = useState('')
    const [showMenuMobile, setShowMenuMobile] = useState(false)
    const [showUserMobile, setShowUserMobile] = useState(false)
    const [headerFixed, setHeaderFixed] = useState(false)
    const [isShowPopoverUser, setIsShowPopoverUser] = useState(false)
    const [showCategoryProduct, setShowCategoryProduct] = useState(false)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);




    // XỬ LÝ CALL API VÀ LOGOUT USER
    const mutation = useMutationHook(
        () => userService.logoutUserApi()
    )
    const { data, isLoading, isSuccess } = mutation
    const handleLogout = async () => {
        mutation.mutate()
    }
    useEffect(() => {
        if (data?.status === 200) {
            dispatch(resetUser())
            const notifyLogoutSuccess = () => toast.success("Đăng xuất thành công !");
            notifyLogoutSuccess()
            navigate('/')
        }
    }, [isSuccess])



    //HIỆN MENU TRƯỢT Ở MÀN HÌNH M VÀ C
    const onClickShowMenu = () => {
        setShowMenuMobile(true)
    }
    const closeMenu = () => {
        setShowCategoryProduct(false)
        setShowMenuMobile(false)
    }

    const onClickShowUser = () => {
        if (userInfor?.userName) {
            setShowUserMobile(true)
        } else {
            navigate('/login')
        }
    }
    const closeUserMobile = () => {
        setShowUserMobile(false)
    }


    //ĐỊNH NGHĨA CÁC COMPONENT CON ĐỂ TÁI SỬ DỤNG
    const NavComponent = ({ children }) => {
        return (
            <ul className={`${styleModule.navList}`}>
                {children.map((child, i) => {
                    return (<li key={i}><Link to={child.props.to}>{child.props.children}</Link></li>)
                })}
            </ul>
        )
    }

    const LogoComponent = ({ type }) => {
        switch (type) {
            case 1:
                return (
                    <Link to='/' className={`${styleModule.haeder_logo}`}>
                        <img className={`${styleModule.haeder_logo_img}`} src={logo} />
                        <p className={`${styleModule.haeder_logo_title}`}>THUỐC THÚ Y 24/7</p>
                    </Link>
                )
            case 2:
                return (
                    <Link to='/' className={`${styleModule.haeder_logo}`}>
                        <img className={`${styleModule.haeder_logo_img}`} src={logoMobile} />
                    </Link>
                )
            case 3:
                return (
                    <Link to='/' className={`${styleModule.haeder_logo}`}>
                        <img className={`${styleModule.haeder_logo_img}`} src={logo} />
                    </Link>
                )
        }
    }


    //XỬ LÝ HIỆN MÀN HÌNH NÀO VỚI KÍCH THƯỚC WINDOW
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    //THÊM SỰ KIỆN CUỘN ĐỂ XỬ LÝ HIỆN HEADER DẠNG FIXED
    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > 550) {
            setHeaderFixed(true)
        } else {
            setHeaderFixed(false)
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    //XỬ LÝ LẤY TỌA ĐỘ ĐỂ SET CHO POPOVER
    const [componentPosition, setComponentPosition] = useState({ top: 0, left: 0 });
    useEffect(() => {
        if (!isShowPopoverUser) return
        if (windowWidth <= 1024) {
            setIsShowPopoverUser(false)
            return
        }
        if (!headerFixed) {
            const coords1 = document.querySelector('.header_user_infor-root').getBoundingClientRect();
            setComponentPosition({ top: coords1.top + window.scrollY + 50, left: coords1.left });
        }
        else {
            const coords2 = document.querySelector('.header_user_infor-root-fixed').getBoundingClientRect();
            setComponentPosition({ top: coords2.top + 50, left: coords2.left });
        }
    }, [headerFixed, windowWidth, isShowPopoverUser]);

    //XỬ LÝ HIỆN, ẨN POPOVER
    const userRef = useRef(null)
    const userFixedRef = useRef(null)
    useEffect(() => {
        const handleClickOutPopover = (e) => {
            if (!userRef.current) return
            if (!userFixedRef.current) {
                if ((userRef.current && !userRef.current.contains(e.target))) {
                    setIsShowPopoverUser(false)
                }
                else {
                    setIsShowPopoverUser(s => !s)
                }
            }
            else {
                if ((userFixedRef.current && !userFixedRef.current.contains(e.target))) {
                    setIsShowPopoverUser(false)
                }
                else {
                    setIsShowPopoverUser(prev => !prev)
                }
            }
        }
        document.addEventListener('click', handleClickOutPopover)
        return () => {
            document.removeEventListener('click', handleClickOutPopover)
        }
    }, [])

    //XỬ LÝ HIỆN, ẨN CATEGORY PRODUCT
    const categoryProduct = useRef(null)
    useEffect(() => {
        if (!categoryProduct.current || windowWidth <= 1024) {
            setShowCategoryProduct(false)
            return
        }
        const handleClickOutCategory = (e) => {
            if (categoryProduct.current.contains(e.target)) {
                setShowCategoryProduct(s => !s)
            }
            else if (categoryProduct.current.parentElement.contains(e.target)) return
            else if (!(categoryProduct.current === e.target.parentElement)) {
                setShowCategoryProduct(false)
            }
        }
        document.addEventListener('click', handleClickOutCategory)
        return () => {
            document.removeEventListener('click', handleClickOutCategory)
        }
    }, [windowWidth])






    return (
        <div className={styleModule.header}>
            <div className={`${styleModule.header_wrapper} grid wide`}>

                {windowWidth > 1024 && <div className={styleModule.header_l}>
                    <div className={`${styleModule.header_top}`}>
                        <LogoComponent type={1} />
                        <SearchComponent value={search} setSearch={setSearch} />
                        <div className={`${styleModule.header_user}`}>
                            {!userInfor.userName ? (<div className={`${styleModule.header_user_auth}`}>
                                <Link to='/login' className={`${styleModule.header_user_auth_btn}`}>Đăng nhập</Link>
                                <Link to='/register' className={`${styleModule.header_user_auth_btn}`}>Đăng ký</Link>
                            </div>)
                                : (
                                    <div className={`${styleModule.header_user_infor} header_user_infor-root`} ref={userRef}>
                                        <div className={`${styleModule.header_user_avater}`}>
                                            <img src={logoUser} />
                                        </div>
                                        <div className={`${styleModule.header_user_name}`}>{userInfor.userName}</div>
                                    </div>
                                )}
                            <div className={`${styleModule.header_user_cart}`} onClick={() => { navigate('/cart') }}><i className="fa-solid fa-cart-shopping" >{cart.count != 0 && (<span>{cart.count}</span>)}</i></div>
                            {/* <div className={styleModule.header_cart} onClick={handleClickCart}><i className="fa-solid fa-cart-shopping" >{cart.count!=0 && (<span>{cart.count}</span>)}</i></div> */}
                        </div>
                    </div>

                    <div className={`${styleModule.header_bottom}`}>
                        <div style={{ position: 'relative' }}>
                            <div className={`${styleModule.all_product_btn}`} ref={categoryProduct}>
                                <i className="fa-solid fa-bars"></i>  <span>Danh mục sản phẩm</span>
                            </div>
                            {!headerFixed && showCategoryProduct && <NavMobileComponent close={closeMenu} type={1}>
                                <a href='/' >Trang chủ</a>
                                <div>
                                    Thông tin
                                    <ul>
                                        <a to="/login">Tất cả sản phẩm</a>
                                        <a to="/register">Men tiêu hóa & chế phẩm sinh học</a>
                                        <a to="/cart">Vacin cho chó</a>
                                    </ul>
                                </div>
                                <a href='/login' >Tin tức</a>
                                <a href='/about' >Giới thiệu</a>

                                <div>
                                    Sản phẩm
                                    <ul>
                                        <a to="/login">Tất cả sản phẩm</a>
                                        <a to="/register">Men tiêu hóa & chế phẩm sinh học</a>
                                        <a to="/cart">Vacin cho chó</a>
                                    </ul>
                                </div>
                                <a href='/payment' >Liên hệ</a>
                            </NavMobileComponent>}
                        </div>
                        <NavComponent>
                            <a to='/'>Trang chủ</a>
                            <a to='/news'>Tin tức</a>
                            <a to='/distributor'>Nhà phân phối</a>
                            <a to='/payment'>Sản phẩm</a>
                            <a to='/about'>Giới thiệu</a>
                            <a to='/contact'>Liên hệ</a>
                        </NavComponent>
                        <div className={`${styleModule.header_phone}`}>
                            <i className="fa-solid fa-phone"></i>
                            <p className={`${styleModule.header_phone_title}`}>Hotline: </p>
                            <p>+84356322298</p>
                        </div>
                    </div>
                </div>}
                {(windowWidth <= 1024 && windowWidth > 740) && <div className={styleModule.header_m}>
                    <div className={`${styleModule.header_top}`}>
                        <LogoComponent type={1} />
                        <div className={`${styleModule.header_user}`}>
                            {!userInfor.userId ? (<div className={`${styleModule.header_user_auth}`}>
                                <Link to='/login' className={`${styleModule.header_user_auth_btn}`}>Đăng nhập</Link>
                                <Link to='/register' className={`${styleModule.header_user_auth_btn}`}>Đăng ký</Link>
                            </div>)
                                : (
                                    <div className={`${styleModule.header_user_infor} header_user_infor-root`} onClick={onClickShowUser} >
                                        <div className={`${styleModule.header_user_avater}`}>
                                            <img src={logoUser} />
                                        </div>
                                        <div className={`${styleModule.header_user_name}`}>{userInfor.userName}</div>
                                    </div>
                                )}
                            <div className={`${styleModule.header_user_cart}`} onClick={() => { navigate('/cart') }}><i className="fa-solid fa-cart-shopping" >{cart.count != 0 && (<span>{cart.count}</span>)}</i></div>
                        </div>
                    </div>

                    <div className={`${styleModule.header_bottom}`}>
                        <div className={`${styleModule.all_product_btn}`} onClick={onClickShowMenu}>
                            <i className="fa-solid fa-bars" ></i>
                        </div>
                        <NavComponent>
                            <a to='/'>Trang chủ</a>
                            <a to='/news'>Tin tức</a>
                            <a to='/distributor'>Nhà phân phối</a>
                            <a to='/payment'>Sản phẩm</a>
                            <a to='/about'>Giới thiệu</a>
                            <a to='/contact'>Liên hệ</a>
                        </NavComponent>
                        <div className={`${styleModule.header_phone}`}>
                            <i className="fa-solid fa-phone"></i>
                            <p className={`${styleModule.header_phone_title}`}>Hotline: </p>
                            <p>+84356322298</p>
                        </div>
                    </div>
                    <SearchComponent value={search} setSearch={setSearch} />
                </div>
                }
                {windowWidth <= 740 && <div className={styleModule.header_c}>
                    <div className={`${styleModule.header_top}`}>
                        <i className='fa-solid fa-bars' onClick={onClickShowMenu}></i>
                        <LogoComponent type={2} />
                        <div className={`${styleModule.header_user}`}>
                            <div className={`${styleModule.header_user_cart}`} style={{ fontSize: 23 }} onClick={() => { navigate('/cart') }}><i className="fa-solid fa-cart-shopping" >{cart.count != 0 && (<span>{cart.count}</span>)}</i></div>
                            <div ><i onClick={onClickShowUser} className="fa-solid fa-user"></i></div>
                        </div>
                    </div>

                    <div className={`${styleModule.header_bottom}`}>
                        <div className={`${styleModule.all_product_btn}`}>
                            <i className="fa-solid fa-house" onClick={() => { navigate('/') }}></i>
                        </div>
                        <NavComponent>
                            <a to='/'>Trang chủ</a>
                            <a to='/news'>Tin tức</a>
                            <a to='/distributor'>Nhà phân phối</a>
                            <a to='/payment'>Sản phẩm</a>
                            <a to='/about'>Giới thiệu</a>
                            <a to='/contact'>Liên hệ</a>
                        </NavComponent>
                        <div className={`${styleModule.header_phone}`}>
                            <i className="fa-solid fa-phone"></i>
                            <p className={`${styleModule.header_phone_title}`}>Hotline: </p>
                            <p>+84356322298</p>
                        </div>
                    </div>
                    <SearchComponent value={search} setSearch={setSearch} />
                </div>
                }

                {headerFixed && <div className={`${styleModule.header_fixed}`}>
                    <div className={`${styleModule.heade_fixedr_wrapper} grid wide`}>

                        <div className={`${styleModule.header_top}`}>
                            <LogoComponent type={1} />
                            <SearchComponent value={search} setSearch={setSearch} />
                            <div className={`${styleModule.header_user}`}>
                                {!userInfor.userName ? (<div className={`${styleModule.header_user_auth}`}>
                                    <Link to='/login' className={`${styleModule.header_user_auth_btn}`}>Đăng nhập</Link>
                                    <Link to='/register' className={`${styleModule.header_user_auth_btn}`}>Đăng ký</Link>
                                </div>)
                                    : (
                                        <div className={`${styleModule.header_user_infor} header_user_infor-root-fixed`} ref={userFixedRef}>
                                            <div className={`${styleModule.header_user_avater}`}>
                                                <img src={logoUser} />
                                            </div>
                                            <div className={`${styleModule.header_user_name}`}>{userInfor.userName}</div>
                                        </div>
                                    )}

                                <div className={`${styleModule.header_user_cart}`} onClick={() => { navigate('/cart') }}><i className="fa-solid fa-cart-shopping" >{cart.count != 0 && (<span>{cart.count}</span>)}</i></div>
                            </div>
                        </div>


                        <div className={`${styleModule.header_top_mobile_fixed}`}>
                            <i className='fa-solid fa-bars' onClick={onClickShowMenu}></i>

                            <LogoComponent type={3} />
                            <SearchComponent value={search} setSearch={setSearch} />
                            <div className={`${styleModule.header_user}`}>
                                <div onClick={() => { navigate('/cart') }} style={{ fontSize: 23 }} className={`${styleModule.header_user_cart}`}><i className="fa-solid fa-cart-shopping" >{cart.count != 0 && (<span>{cart.count}</span>)}</i></div>
                                <div ><i onClick={onClickShowUser} className="fa-solid fa-user"></i></div>
                            </div>
                        </div>
                    </div>
                </div>}



                <div className={styleModule.navMobile}>
                    {showMenuMobile && <NavMobileComponent close={closeMenu} type={0}>
                        <a href='/' >Trang chủ</a>
                        <div>
                            Thông tin
                            <ul>
                                <a to="/login">Tất cả sản phẩm</a>
                                <a to="/register">Men tiêu hóa & chế phẩm sinh học</a>
                                <a to="/login">Vacin cho mèo</a>
                            </ul>
                        </div>
                        <a href='/news' >Tin tức</a>
                        <a href='/about' >Giới thiệu</a>

                        <div>
                            Sản phẩm
                            <ul>
                                <a to="/login">Tất cả sản phẩm</a>
                                <a to="/register">Men tiêu hóa & chế phẩm sinh học</a>
                                <a to="/cart">Vacin cho chó</a>
                            </ul>
                        </div>

                        <a href='/payment' >Liên hệ</a>
                    </NavMobileComponent>}
                    {showUserMobile && <NavMobileComponent close={closeUserMobile} type={0}>
                        {userInfor.isAdmin ? (<a href='/system/admin' >Quản lý hệ thống</a>)
                            : (<a href='/user-profile' >Thông tin tài khoản</a>
                            )}
                        <a href='/user-profile' >Đơn hàng</a>
                        <button onClick={handleLogout}>Đăng xuất</button>
                    </NavMobileComponent>}
                </div>

                <div style={{ position: headerFixed ? 'fixed' : 'absolute', top: componentPosition.top, left: componentPosition.left, zIndex: 15 }}>
                    {isShowPopoverUser && <PopoverComponent logOutClick={handleLogout} />}
                </div>

            </div>
        </div>
    )
}

export default memo(HeaderComponent)