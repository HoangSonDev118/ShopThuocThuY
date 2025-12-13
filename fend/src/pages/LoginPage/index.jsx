import { useEffect, useState } from "react"
import { jwtDecode } from 'jwt-decode'
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import styleModule from './index.module.scss'
import * as userService from '../../services/userService'
import { useMutationHook } from "../../hooks/useMutation"
import { updateUser } from "../../redux/Slices/userSlice"

import Input from "../../components/InputComponent"
import InputCheckBox from "../../components/InputCheckboxComponent"
import Button from "../../components/ButtonComponent"
import LoadingComponent from "../../components/LoadingComponent"

const LoginPage = () => {
    //ĐỊNH NGHĨA CÁC STATE
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    //ĐỊNH NGHĨA MUTATION ĐĂNG NHẬP
    const mutation = useMutationHook(
        data => userService.loginUserApi(data)
    )
    const { data, isLoading, isSuccess } = mutation

    //CLEAR INPUT BẮT NGƯỜI DÙNG NHẬP LẠI
    const clearInput = () => {
        setEmail('')
        setPassword('')
    }

    //SỬ LÝ PHẢN HỒI SAU KHI ẤN ĐĂNG NHẬP
    useEffect(() => {
        if (data?.status === 404) {
            const notifyWarning = () => toast.warning("Email hoặc mật khẩu không đúng");
            notifyWarning()
            clearInput()
        }
        if (data?.status === 200) {
            localStorage.setItem('token', data?.access_token)
            if (data?.access_token) {
                const decoded = jwtDecode(data?.access_token);
                handleGetDetailUser(decoded?.id, data?.access_token)
            }
            navigate('/')
        }
    }, [isSuccess])

    //CUSTOM TOAST
    const LoginSuccessMsg = (infor) => (
        <div>
            <span>Đăng nhập thành công, Xin chào </span>
            <span style={{ fontWeight: 800, color:'#525252' }}>{infor.userName}</span>
            <span>!</span>
        </div>
    );
    const InputReqWarningMsg = () => (
        <div>
            <span>Vui lòng nhập đủ các trường (</span>
            <span style={{ fontWeight: 600, color: 'red' }}>*</span>
            <span>)</span>
        </div>
    );

    //SAU KHI ĐĂNG NHẬP THANH CÔNG SẼ LẤY DETAIL USER VÀ LƯU VÀO REDUX
    const handleGetDetailUser = async (id, access_token) => {
        const res = await userService.getDetailUserApi({ id, access_token })
        const notifySuccess = () => toast.success(<LoginSuccessMsg userName={res?.user.user_name} />);
        notifySuccess()
        dispatch(updateUser({
            userName: res?.user.user_name || '',
            userAvatar: res?.user.user_avatar || '',
            fullName: res?.user.full_name || '',
            email: res?.user.email || '',
            phone: res?.user.phone_number || '',
            gender: res?.user.gender || '',
            birthday: res?.user.birthday || '',
            address: res?.user.address || '',
            addressDetail: res?.user.address_detail || '',
            userId: res?.user._id || '',
            isAdmin: res?.user.is_admin || '',

        }))
        return res
    }

    //CHECK INPUT CÓ HỢP LỆ KHÔNG
    const checkValidInput = () => {
        if (!email || !password) {
            const notifyWarning = () => toast.warning(<InputReqWarningMsg />);
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
        return true
    }

    //XỬ LÝ ẤN ĐĂNG NHẬP
    const handleOnSubmit = async (e) => {
        e.preventDefault()
        if (checkValidInput()) {
            mutation.mutate({
                email: email.trim(),
                password: password.trim()
            })
        }

    }
    return (
        <div className={`${styleModule.login_page} grid wide`}>
            <h3 className={`${styleModule.login_title}`}>Đăng nhập tài khoản</h3>
            <form className={`${styleModule.login_form}`}>
                <div className={`${styleModule.login_email} l-6 m-10 c-12`}>
                    <label className={`${styleModule.login_email_label}`}>Email {!email && (<span>*</span>)}</label>
                    <Input
                        className={`${styleModule.login_password_input}`}
                        placeholder='Nhập email của bạn'
                        // w='550px'
                        handleOnChange={e => setEmail(e.target.value)}
                        inputValue={email}
                    />
                </div>
                <div className={`${styleModule.login_password} l-6 m-10 c-12`}>
                    <label className={`${styleModule.login_password_label}`}>Mật khẩu {!password && (<span>*</span>)}</label>
                    <Input
                        className={`${styleModule.login_password_input}`}
                        placeholder='Nhập mật khẩu của bạn'
                        // w='550px'
                        p='10px 50px 10px 15px'
                        type={showPassword ? 'text' : 'password'}
                        handleOnChange={e => setPassword(e.target.value)}
                        inputValue={password}
                    />
                    <i className={`${styleModule.eyeIcon} ${showPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}`} onClick={() => setShowPassword(!showPassword)}></i>
                </div>
                <div className={`${styleModule.login_option} l-6 m-10 c-12`}>
                    <div className={`${styleModule.rememberMe}`}>
                        <InputCheckBox id='rememberMe' />
                        <label htmlFor='rememberMe'>Nhớ lấy tôi ?</label>
                    </div>
                    <div className={`${styleModule.forgotPassword}`}>
                        <a href='/'>Bạn quên mật khẩu ?</a>
                    </div>
                </div>
                <div className={`${styleModule.login_footer}`}>
                    <Button
                        className={`${styleModule.login_submit}`}
                        content='Đăng nhập'
                        m='0 80px 0 0'
                        onClick={handleOnSubmit}
                    />
                    <p className={`${styleModule.noAccount}`}>Hoặc bạn chưa có tài khoản?</p><Link to='/register' className={`${styleModule.register_link}`}>Đăng ký</Link>
                </div>
            </form>
            {isLoading && (<LoadingComponent />)}
        </div>
    )
}

export default LoginPage