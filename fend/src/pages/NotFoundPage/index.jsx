import React from 'react'
import img404 from '../../assets/images/404.png'
import styleModule from './index.module.scss'
import Button from '../../components/ButtonComponent'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
  const navigate = useNavigate()
  return (
    <div className={styleModule.not_found_page}>
      <div className={styleModule.not_found_page_top}>
          <img className={styleModule.not_found_page_image} src={img404} />
          <h1 className={styleModule.not_found_page_title}>404</h1>
      </div>
      <h4 className={styleModule.not_found_page_desc}>Opps! Không thể tìm thấy trang</h4>
      <h4 className={styleModule.not_found_page_desc}>Trang bạn đang tìm đang bị lỗi hoặc không tồn tại</h4>
      <Button
        onClick={()=>navigate('/')}
        className={styleModule.not_found_page_btn}
        content='Quay lại trang chủ'
        bgc='white'
        color='#d19002'
        br='10px'
        border='1px solid #d19002'
        icon='fa-solid fa-house'
      />
    </div>
  )
}

export default NotFoundPage