import React from 'react'
import styleModule from './index.module.scss'
import nodataIcon from '../../assets/images/no-data-6-128.png'
const UserTableComponent = (props) => {
    const { users, onClickEditUser, onClickDeleteUser } = props
    const handleOnClickEditBtn = (i) => {
        onClickEditUser(i)
    }
    const handleOnClickDeleteBtn = (id) => {
        onClickDeleteUser(id)
    }
    return (
        <table className={styleModule.user_table}>
            <tbody>
                <tr>
                    <th className={styleModule.table_full_name}>Họ và tên</th>
                    <th className={styleModule.table_user_name}>Tên tài khoản</th>
                    <th className={styleModule.table_email}>email</th>
                    <th className={styleModule.table_phone}>SĐT</th>
                    <th className={styleModule.table_birthday}>Năm sinh</th>
                    <th className={styleModule.table_gender}>Giới tính</th>
                    <th className={styleModule.table_address}>Địa chỉ</th>
                    <th className={styleModule.table_action}>action</th>
                </tr>
                {users.length === 0 ? (<tr className={styleModule.rowNodata}><td><img src={nodataIcon} alt="" /><p>Không có dữ liệu</p></td></tr>)
                    :
                    users.map((user, i) => {
                        const address = (user.address) ? `${user.address?.replaceAll('_', ', ')}` : null
                        const birthday = user.birthday?.split('T')[0]
                        return (
                            <tr style={{ animationDelay: `${i * 0.05}s`, }} key={i}>
                                <td className={styleModule.table_full_name}>{user.full_name}</td>
                                <td className={styleModule.table_user_name}>{user.user_name}</td>
                                <td className={styleModule.table_email}>{user.email}</td>
                                <td className={styleModule.table_phone}>{user.phone_number}</td>
                                <td className={styleModule.table_birthday}>{birthday}</td>
                                <td className={styleModule.table_gender}>{user.gender}</td>
                                <td className={styleModule.table_address}>{address}</td>
                                <td className={styleModule.table_action}>
                                    <i onClick={() => handleOnClickDeleteBtn(user._id)} className="fa-regular fa-trash-can"></i>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>

        </table>
    )
}

export default UserTableComponent