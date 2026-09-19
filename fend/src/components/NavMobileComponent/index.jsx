import React, { useRef, useState } from 'react'
import styleModule from './index.module.scss'
import { Link } from 'react-router-dom'

import logo from '../../assets/images/Logo3.png'

const NavMobileComponent = (props) => {
    const { children, close, type } = props
    const closeRef = useRef()
    const overlayRef = useRef()
    const menuRef = useRef()
    const onClickClose = (e) => {
        if (!closeRef || !overlayRef || !menuRef || type === 1) return
        e.stopPropagation()
        closeRef.current.classList.add(styleModule.hideCloseAnimation);
        overlayRef.current.classList.add(styleModule.hideOverlayAnimation);
        menuRef.current.classList.add(styleModule.hideMenuAnimation);
        setTimeout(() => {
            close()
        }, 200)
    }
    let setDisplay
    const handleShowSubList = (e) => {
        const ulElement = e.currentTarget.querySelector('ul')
        const iconElement = e.currentTarget.querySelector('i')
        if (ulElement.classList.contains(styleModule.nav_product_list_mobile_active)) {
            ulElement.classList.remove(styleModule.nav_product_list_mobile_active)
            ulElement.classList.add(styleModule.nav_product_list_mobile_hide)
            iconElement.style.transform = 'scaleY(1)'
            setDisplay = setTimeout(() => {
                ulElement.style.display = 'none'
            }, 200)
        }
        else {
            if (setDisplay) {
                clearTimeout(setDisplay)
            }
            iconElement.style.transform = 'scaleY(-1)'
            ulElement.style.display = 'block'
            ulElement.classList.remove(styleModule.nav_product_list_mobile_hide)
            ulElement.classList.add(styleModule.nav_product_list_mobile_active)
        }
    }
    if (type === 0) {
        return (
            <div className={styleModule.overlay_menu} onClick={(e) => onClickClose(e)} ref={overlayRef}>
                <div className={styleModule.close_menu_mobile} onClick={(e) => onClickClose(e)} ref={closeRef}><i className={`fa-solid fa-xmark ${styleModule.close_menu_mobile_icon}`}></i></div>
                <nav className={styleModule.header_navbar_mobile} onClick={e => e.stopPropagation()} ref={menuRef}>
                    <Link to="/" className={styleModule.logo_menu_mobile}><img src={logo} /></Link>
                    <ul className={styleModule.nav_list_mobile}>
                        {children?.map((child, i) => {
                            if (child.type === 'a') {
                                return (
                                    <Link key={i} to={child.props.href} className={`${styleModule.nav_item_mobile} ${styleModule.item}`} onClick={onClickClose}>{child.props.children}</Link>
                                )
                            } else if (child.type === 'button') {
                                return (
                                    <div key={i} style={{ color: '#ff8c8c' }}
                                        onClick={
                                            (e) => {
                                                child.props.onClick()
                                                onClickClose(e)
                                            }
                                        }
                                        className={`${styleModule.nav_item_mobile} ${styleModule.item}`}>
                                        {child.props.children}
                                    </div>
                                )
                            }
                            else {
                                return (
                                    (
                                        <div key={i} onClick={e => handleShowSubList(e)} className={`${styleModule.item}`}>
                                            <div className={`${styleModule.product_btn_mobile} ${styleModule.nav_item_mobile}`}>
                                                {child.props.children[0]}<i className={`fa-solid fa-angle-down ${styleModule.dropDown_icon_mobile}`}></i>
                                            </div>
                                            <ul className={`${styleModule.nav_product_list_mobile}`}>
                                                {child.props.children[1].props.children.map((subChild, index) =>
                                                    <Link key={index} to={subChild.props.to} className={`${styleModule.nav_product_item_mobile}`} onClick={onClickClose}>{subChild.props.children}</Link>
                                                )}
                                            </ul>
                                        </div>
                                    )
                                )
                            }
                        }
                        )}
                    </ul>
                </nav>
            </div>
        )
    }
    else if (type === 1) {
        return (
            <div className={styleModule.categoryProduct}>
                <ul className={styleModule.nav_list_mobile} style={{ position: 'absolute' }}>
                    {children?.map((child, i) => {
                        // console.log('childdasdasd', child)
                        if (child.type === 'a') {
                            return (
                                <Link key={i} to={child.props.href} className={`${styleModule.nav_item_mobile} ${styleModule.item}`} onClick={close}>{child.props.children}</Link>
                            )
                        } else if (child.type === 'button') {
                            return (
                                <div key={i} style={{ color: '#ff8c8c' }}
                                    onClick={
                                        (e) => {
                                            child.props.onClick()
                                            close()
                                            console.log('call')
                                        }
                                    }
                                    className={`${styleModule.nav_item_mobile} ${styleModule.item}`}>
                                    {child.props.children}
                                </div>
                            )
                        }
                        else {
                            return (
                                (
                                    <div key={i} onClick={e => handleShowSubList(e)} className={`${styleModule.item}`}>
                                        <div className={`${styleModule.product_btn_mobile} ${styleModule.nav_item_mobile}`}>
                                            {child.props.children[0]}<i className={`fa-solid fa-angle-down ${styleModule.dropDown_icon_mobile}`}></i>
                                        </div>
                                        <ul className={`${styleModule.nav_product_list_mobile}`}>
                                            {child.props.children[1].props.children.map((subChild, index) =>
                                                <Link key={index} to='/products' className={`${styleModule.nav_product_item_mobile}`} onClick={close}>{subChild.props.children}</Link>
                                            )}
                                        </ul>
                                    </div>
                                )
                            )
                        }
                    }
                    )}
                </ul>
            </div>
        )
    }
    else if (type === 2) {
        return (
            <div className={styleModule.overlay_menu} onClick={(e) => onClickClose(e)} ref={overlayRef}>
                <div className={styleModule.close_menu_mobile} onClick={(e) => onClickClose(e)} ref={closeRef}><i className={`fa-solid fa-xmark ${styleModule.close_menu_mobile_icon}`}></i></div>
                <nav className={styleModule.header_navbar_mobile} onClick={e => e.stopPropagation()} ref={menuRef}>
                    <Link to="/" className={styleModule.logo_menu_mobile}><img src={logo} /></Link>

                    <ul className={styleModule.nav_list_mobile}>
                        {children?.map((child, i) => {
                            if (child.type === 'div') {
                                return (
                                    <div key={i} className={`${styleModule.nav_item_mobile} ${styleModule.item}`} onClick={() => {
                                        close()
                                        child.props.onClick()
                                    }}>{child.props.children}</div>
                                )
                            }
                            else if (child.type === 'button') {
                                return (
                                    <div key={i} style={{ color: '#ff8c8c' }}
                                        onClick={
                                            (e) => {
                                                child.props.onClick()
                                                onClickClose(e)
                                            }
                                        }
                                        className={`${styleModule.nav_item_mobile} ${styleModule.item}`}>
                                        {child.props.children}
                                    </div>
                                )
                            }
                        }
                        )}
                    </ul>
                </nav>
            </div>
        )
    }
}

export default NavMobileComponent