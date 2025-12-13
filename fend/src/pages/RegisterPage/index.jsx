import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

import { useMutationHook } from '../../hooks/useMutation'

import styleModule from './index.module.scss'
import * as userService from '../../services/userService'

import Input from '../../components/InputComponent'
import Button from '../../components/ButtonComponent'
import LoadingComponent from '../../components/LoadingComponent'


const RegisterPage = () => {

    //ĐỊNH NGHĨA CÁC STATE
    const navigate = useNavigate()
    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)


    //CUSTOM TOAST
    const InputReqWarningMsg = () => (
        <div>
            <span>Vui lòng nhập đủ các trường (</span>
            <span style={{ fontWeight: 600, color: 'red' }}>*</span>
            <span>)</span>
        </div>
    );


    //ĐỊNH NGHĨA MUTATION ĐĂNG KÝ
    const mutation = useMutationHook(
        data => userService.registerUserApi(data)
    )
    const { data, isLoading, isSuccess } = mutation


    //CLEAR CÁC INPUT BẮT NGƯỜI DÙNG NHẬP LẠI
    const clearInput = () => {
        setLastName('')
        setFirstName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
    }

    //PHẢN HỒI SAU KHI XỬ LÝ ĐĂNG KÝ
    useEffect(() => {
        if (data?.status === 409) {
            const notifyWarning = () => toast.warning("Email nhập vào đã được dùng");
            notifyWarning()
            clearInput()
        }
        if (data?.status === 200) {
            const notifySuccess = () => toast.success(`Tạo tài khoản thành công`);
            notifySuccess()
            navigate('/login')
        }
    }, [isSuccess])



    //CHECK INPUT XEM CÓ HỢP LỆ KHÔNG
    const checkValidInput = () => {
        if (!lastName || !firstName || !email || !password || !confirmPassword) {
            const notifyWarning = () => toast.warning(<InputReqWarningMsg />);
            notifyWarning()
            clearInput()
            return false
        }
        if (lastName.length >= 30 || firstName.length >= 30) {
            const notifyWarning = () => toast.warning("Giá trị nhập vào không hợp lệ");
            notifyWarning()
            clearInput()
            return false
        }
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            const notifyWarning = () => toast.warning("Email nhập vào không hợp lệ");
            notifyWarning()
            clearInput()
            return false
        }
        if (password.length < 6 || password.length >= 30) {
            const notifyWarning = () => toast.warning("Mật khẩu nhập vào không hợp lệ");
            notifyWarning()
            clearInput()
            return false
        }
        if (password !== confirmPassword) {
            const notifyWarning = () => toast.warning("Mật khẩu nhập lại không đúng");
            notifyWarning()
            clearInput()
            return false
        }
        return true
    }

    //XỬ LÝ ẤN ĐĂNG KÝ
    const handleOnSubmit = async (e) => {
        e.preventDefault()
        if (checkValidInput()) {
            mutation.mutate({
                last_name: lastName.trim(),
                first_name: firstName.trim(),
                email: email.trim(),
                password: password.trim(),
                confirm_password: confirmPassword.trim()
            })
        }
    }

    return (

        <div className={`${styleModule.rigister_page} grid wide`}>
            <h3 className={`${styleModule.rigister_title}`}>Đăng ký tài khoản</h3>
            <form className={`${styleModule.rigister_form}`}>

                <div className={`${styleModule.rigister_username} l-6 m-10 c-12`}>
                    <div className={`${styleModule.rigister_lastname}`}>
                        <label className={`${styleModule.rigister_lastname_label}`}>Họ {!lastName && (<span>*</span>)}</label>
                        <Input
                            placeholder='Nhập họ của bạn'
                            handleOnChange={e => setLastName(e.target.value)}
                            inputValue={lastName}
                        />
                    </div>
                    <div className={`${styleModule.rigister_firstname}`}>
                        <label className={`${styleModule.rigister_firstname_label}`}>Tên {!firstName && (<span>*</span>)}</label>
                        <Input
                            placeholder='Nhập tên của bạn'
                            handleOnChange={e => setFirstName(e.target.value)}
                            inputValue={firstName}
                        />
                    </div>
                </div>
                <div className={`${styleModule.rigister_email} l-6 m-10 c-12`}>
                    <label className={`${styleModule.rigister_email_label}`}>Email {!email && (<span>*</span>)}</label>
                    <Input
                        placeholder='Nhập email của bạn'
                        handleOnChange={e => setEmail(e.target.value)}
                        inputValue={email}
                    />
                </div>
                <div className={`${styleModule.rigister_password} l-6 m-10 c-12`}>
                    <label className={`${styleModule.rigister_password_label}`}>Mật khẩu {!password && (<span>*</span>)}</label>
                    <Input
                        placeholder='Nhập mật khẩu của bạn'
                        p='10px 50px 10px 15px'
                        type={showPassword ? 'text' : 'password'}
                        handleOnChange={e => setPassword(e.target.value)}
                        inputValue={password}
                    />
                    <i className={`${styleModule.eyeIcon} ${showPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}`} onClick={() => setShowPassword(!showPassword)}></i>
                </div>
                <div className={`${styleModule.rigister_confirmpassword} l-6 m-10 c-12`}>
                    <label className={`${styleModule.rigister_confirmpassword_label}`}>Nhập lại mật khẩu {!confirmPassword && (<span>*</span>)}</label>
                    <Input
                        placeholder='Xác nhận lại mật khẩu của bạn'
                        p='10px 50px 10px 15px'
                        type={showConfirmPassword ? 'text' : 'password'}
                        handleOnChange={e => setConfirmPassword(e.target.value)}
                        inputValue={confirmPassword}
                    />
                    <i className={`${styleModule.eyeIcon} ${showConfirmPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}`} onClick={() => setShowConfirmPassword(!showConfirmPassword)}></i>
                </div>

                <div className={`${styleModule.rigister_footer}`}>
                    <Button
                        className={`${styleModule.rigister_submit}`}
                        m='0 80px 0 0'
                        content='Đăng ký'
                        onClick={handleOnSubmit}
                    />
                    <p className={`${styleModule.already_registered}`}>Hoặc bạn đã có tài khoản?</p><Link to='/login' className={`${styleModule.login_link}`}>Đăng nhập</Link>
                </div>
            </form>
            {isLoading && (<LoadingComponent />)}
        </div>
    )
}

export default RegisterPage