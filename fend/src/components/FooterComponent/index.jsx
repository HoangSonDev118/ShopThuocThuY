import React, { memo } from 'react'
import styleModule from './index.module.scss'
import emailIcon from '../../assets/images/email_icon.png'
import phoneIcon from '../../assets/images/phone_icon.png'
import zaloIcon from '../../assets/images/zalo_icon.png'
import mesengerIcon from '../../assets/images/messenger_icon.png'

// import '../../style/myGrid.css'

const FooterPage = () => {
    return (
        <div className={`${styleModule.footer}`}>
            <div className={`${styleModule.footer_top}`}>
                <div className={`grid wide`}>
                    <div className={`row`}>
                        <div className={`col l-6 c-12 m-12`}>
                            <div className={`${styleModule.footer_left}`}>
                                <div className={`${styleModule.footer_infor_contact}`}>Thông tin liên hệ
                                    <ul className={`${styleModule.footer_infor_contact_list}`}>
                                        <li>Địa chỉ: Khu tập thể H10, Đường Trường Chinh, Phường Đình, Đống Đa, Hà Nội</li>
                                        <li>Số điện thoại: 0383346631, 0971833093</li>
                                        <li>Email: thutrang1105@gmail.com</li>
                                    </ul>
                                    <div className={`${styleModule.footer_category_and_contact}`}>
                                        <div className={`${styleModule.footer_category}`}>Danh mục
                                            <ul className={`${styleModule.footer_category_list}`}>
                                                <li><a href="">Trang chủ</a></li>
                                                <li><a href="">Tin tức</a></li>
                                                <li><a href="">Sản phẩm</a></li>
                                                <li><a href="">Giới thiệu</a></li>
                                            </ul>
                                        </div>

                                        <div className={`${styleModule.footer_contact}`}>Liện hệ với chúng tôi
                                            <ul className={`${styleModule.footer_contact_list}`}>
                                                <div className={`${styleModule.footer_contact_item}`} id="item_email" style={{ backgroundImage: `url(${emailIcon})` }}></div>

                                                <a className={`${styleModule.footer_contact_item}`} id="item_messenger" href="https://m.me/104988175154682" target="_blank" style={{ backgroundImage: `url(${mesengerIcon})` }}></a>

                                                <a className={`${styleModule.footer_contact_item}`} id="item_zalo" href="https://zalo.me/0971833093" target="_blank" style={{ backgroundImage: `url(${zaloIcon})` }}></a>

                                                <a className={`${styleModule.footer_contact_item}`} id="item_phone" href="tel: +0971833093" style={{ backgroundImage: `url(${phoneIcon})` }}></a>
                                            </ul>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`col l-6 c-12 m-12`}>
                            <div className={`${styleModule.footer_right}`}>
                                <div className={`${styleModule.footer_search}`}>Bạn muốn tìm gì ?
                                    <div className={`${styleModule.footer_search_wrap}`}>
                                        <input className={`${styleModule.footer_search_input}`} type="text" name="search" id=""
                                            placeholder="Tìm kiếm ..." />
                                        <button className={`${styleModule.footer_search_submit}`}><i
                                            className="fa-solid fa-magnifying-glass"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${styleModule.footer_bottom}`}>
                Copyright 2023 © Shop Thu Y 247
            </div>
        </div>
    )
}

export default memo(FooterPage)