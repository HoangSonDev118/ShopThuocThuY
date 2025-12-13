import React, { useEffect, useState } from 'react'

import * as userService from '../../services/userService'
import { useMutationHook } from '../../hooks/useMutation'
import { toast } from 'react-toastify'
import Button from '../ButtonComponent'
import UserTableComponent from '../UserTableComponent'
import UserInforModal from '../UserInforModal'

const UserComponent = (props) => {
    const { users = [], queryUsers } = props
    const [isShowModalUser, setIsShowModalUser] = useState(false)
    const [user, setUser] = useState()

    const handleHideModalUser = (e) => {
        setIsShowModalUser(false)
    }
    const handleShowModalUser = (index) => {
        setUser(users[index])
        setIsShowModalUser(true)
    }


    const hanleDeleteUser = (id) => {
        const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa người dùng này không ?')
        if (confirmDelete) {
            handleSubmitDeleteUser(id)
        }
    }

    const mutation = useMutationHook(
        (dataReq) => userService.deleteUserApi(dataReq)
    )
    const { data, isSuccess } = mutation

    useEffect(() => {
        if (data?.status === 200) {
            const notifySuccess = () => toast.success("Xóa người dùng thành công");
            notifySuccess()
        }
    }, [isSuccess])
    const handleSubmitDeleteUser = async (id) => {
        const access_token = localStorage.getItem('token')
        mutation.mutate(
            {
                id: id,
                access_token: access_token,
            },
            {
                onSettled: () => {
                    queryUsers.refetch()
                }
            }
        )
    }

    return (
        <div>
            {/* <Button
                onClick={createUser}
                content='Thêm tài khoản'
                icon='fa-solid fa-user-plus'
                bgc='#9ce0ff'
                m='30px'
            /> */}
            <UserTableComponent users={users} onClickEditUser={handleShowModalUser} onClickDeleteUser={hanleDeleteUser} />
            {/* {isShowModalUser && (<UserInforModal modalState={handleHideModalUser} userInfor={user} queryUsers={queryUsers} />)} */}
        </div>
    )
}

export default UserComponent