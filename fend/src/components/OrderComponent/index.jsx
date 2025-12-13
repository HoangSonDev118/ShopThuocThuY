import React, { useState } from 'react'
import styleModule from './index.module.scss'
import OrderCardConponent from '../OrderCardConponent'
import PaginationComponent from '../PaginationComponent'

const OrderComponent = ({ orders, queryOrders }) => {

  const [active, setActive] = useState(0)

  // const order = {
  //   order_id: 374158,
  //   order_customer_infor: {
  //     id: "66b4b6835effeb5ba374265d",
  //     name: "Hoàng Văn Thái Sơn",
  //     email: "son2@gmail.com",
  //     phone: "0356322298",
  //     address: "Thành phố Hà Nội_Huyện Đông Anh_Xã Xuân Canh",
  //     address_detail: "Nha 06, xom Nhi Ha"
  //   },
  //   order_products_infor: [
  //     {
  //       id: "66b9ac33313972e777d72abb",
  //       id_type: "66b9ac33313972e777d72abc",
  //       name: "Áo thun Gấu chấm bi viền đỏ cho chó mèo",
  //       type: "Màu hồng",
  //       price: 210000,
  //       count: 2,
  //     },
  //     {
  //       id: "66b9c940f41e57d7163a2e74",
  //       id_type: "66b9ac33313972e777d72abc",
  //       name: "Áo thun Gấu chấm bi viền đỏ cho chó mèo",
  //       type: "Màu hồng",
  //       price: 210000,
  //       count: 2,
  //     }
  //   ],
  //   order_status: {
  //     total_price: 420000,
  //     total_shipping_cost: 20000,
  //     total_discount: 0,
  //     total_final_price: 440000,
  //     payment_method: "COD",
  //     shipping_method: "normal",
  //     delivery_status: 1,
  //     order_status: 1,
  //     payment_status: false
  //   },
  //   createdAt: "2024-08-15T03:18:58.133Z",
  //   updatedAt: "2024-08-15T03:18:58.133Z"
  // }




  return (
    <div>
      <ul className={styleModule.nav_list}>
        <div className={`${active === 0 ? styleModule.active : ''} ${styleModule.nav_item}`} onClick={() => setActive(0)}>
          <span>Chờ xác nhận</span>
          {orders.product_status0 > 0 && <b>{orders.product_status0}</b>}
        </div>
        <div className={`${active === 1 ? styleModule.active : ''} ${styleModule.nav_item}`} onClick={() => setActive(1)}>
          <span>Chờ đóng hàng</span>
          {orders.product_status1 > 0 && <b>{orders.product_status1}</b>}
        </div>
        <div className={`${active === 2 ? styleModule.active : ''} ${styleModule.nav_item}`} onClick={() => setActive(2)}>
          <span>Chờ vận chuyển</span>
          {orders.product_status2 > 0 && <b>{orders.product_status2}</b>}
        </div>
        <div className={`${active === 3 ? styleModule.active : ''} ${styleModule.nav_item}`} onClick={() => setActive(3)}>
          <span>Đã giao thành công</span>
          {orders.product_status3 > 0 && <b>{orders.product_status3}</b>}
        </div>
        <div className={`${active === -1 ? styleModule.active : ''} ${styleModule.nav_item}`} onClick={() => setActive(-1)}>
          <span>Đã hủy</span>
          {orders.product_status_1 > 0 && <b>{orders.product_status_1}</b>}
        </div>

      </ul>

      <div className={styleModule.content}>
        {orders?.orders?.map((order, i) => {
          if (order?.order_status?.order_status !== active) return
          return (
            <OrderCardConponent key={i} order={order} queryOrders={queryOrders} />
          )
        }
        )}
      </div>


    </div>
  )
}

export default OrderComponent