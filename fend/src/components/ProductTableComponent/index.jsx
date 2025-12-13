import React from 'react'
import styleModule from '../UserTableComponent/index.module.scss'
import nodataIcon from '../../assets/images/no-data-6-128.png'
const ProductTableComponent = (props) => {
    const { products, onClickEdit, onClickDelete } = props
    // console.log(products)
    const handleOnClickEditBtn = (id) => {
        onClickEdit(id)
    }
    const handleOnClickDeleteBtn = (id) => {
        onClickDelete(id)
    }
    return (
        <table className={styleModule.user_table}>
            <tbody>
                <tr>
                    <th className={styleModule.table_img}>Ảnh</th>
                    <th className={styleModule.table_product_name}>Tên sản phẩm</th>
                    <th className={styleModule.table_product_discount}>Giảm giá</th>

                    <th className={styleModule.table_action}>action</th>
                </tr>
                {products?.length === 0 ? (<tr className={styleModule.rowNodata}><td><img src={nodataIcon} alt="" /><p>Không có dữ liệu</p></td></tr>)
                    :
                    products?.map((product, i) => {
                        return (
                            <tr style={{ animationDelay: `${i * 0.05}s`, }} key={i}>
                                <td className={styleModule.table_img}><img src={product?.product_imgs[0]} /></td>
                                <td className={styleModule.table_product_name}>{product?.product_name}</td>
                                <td className={styleModule.table_product_discount}>{product?.product_discount}</td>
                                <td className={styleModule.table_action}>
                                    <i onClick={() => handleOnClickEditBtn(product?._id)} className="fa-solid fa-pen-to-square"></i>
                                    <i onClick={() => handleOnClickDeleteBtn(product?._id)} className="fa-regular fa-trash-can"></i>
                                </td>

                            </tr>
                        )
                    })
                }
            </tbody>

        </table>
    )
}

export default ProductTableComponent