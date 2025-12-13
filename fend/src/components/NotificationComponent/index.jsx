import React, { useEffect } from 'react'
import styleModule from './index.module.scss'
import { timeDifferenceInHours } from '../../utils/timeDifferenceInHours'
import axios from 'axios'

const NotificationComponent = (props) => {
  const { notifications = [], queryNotifications } = props


  console.log(notifications)

  const hanleDelete = (e, id) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa thông báo này không ?')
    if (confirmDelete) {
      handleSubmitDelete(id)
    }
    e.stopPropagation()
  }



  const handleSubmitDelete = async (id) => {
    const access_token = localStorage.getItem('token')
    await axios.delete(`http://localhost:3001/api/notification/delete-notification/${id}`)
      .then(() => {
        queryNotifications.refetch()
      })
  }

  useEffect(() => {
    queryNotifications.refetch()
  }, [])


  const handleClick = async(id) => {
    await axios.put(`http://localhost:3001/api/notification/checked/${id}`)
      .then(() => {
        queryNotifications.refetch()
      })

  }

  // var check = false


  return (
    <div className={styleModule.notifications}>
      {notifications.notification?.map((notification, i) => {
        var icon
        var title
        var bgc
        switch (notification.type) {
          case 1:
            icon = 'fa-solid fa-file';
            title = 'Bạn có đơn hàng mới'
            bgc = '#fff1c0'
            break;
          case 2:
            icon = 'fa-solid fa-box';
            title = 'Bạn đã tạo sản phẩm thành công'
            bgc = '#e1faff'
            break;
          case 2.5:
            icon = 'fa-solid fa-box';
            title = 'Bạn đã xóa sản phẩm thành công'
            bgc = '#ffe1e1'
            break;
          default:
            icon = 'fa-solid fa-bell';
            title = 'Bạn có thông báo mới'
        }
        return (
          <div key={i} className={styleModule.notification} onClick={() => handleClick(notification._id)} style={{ animationDelay: `${i * 0.05}s`, backgroundColor: bgc }}>
            <i className={icon}></i>
            <div className={styleModule.content}>
              <h3>{title}</h3>
              {notification.content.map((nd, i) => (
                <p key={i}>{nd}</p>
              ))}
            </div>
            <span className={styleModule.time}>{timeDifferenceInHours(notification.createdAt)}</span>
            <span className={styleModule.delete} onClick={(e) => hanleDelete(e, notification._id)}>

              {notification.check ?
                <>
                  <span className={styleModule.check}></span>
                  <i className={`fa-solid fa-xmark ${styleModule.deleteIcon}`}></i>
                </> :
                <i style={{ fontSize: 14 }} className="fa-solid fa-xmark">
                </i>}
            </span>
          </div>
        )
      })}

    </div>
  )
}

export default NotificationComponent