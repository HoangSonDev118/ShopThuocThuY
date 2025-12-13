import React, { useEffect, useState } from 'react'
import styleModal from './index.module.scss'
import styleModule from '../../pages/UserProfilePage/test.module.scss'
import Button from '../ButtonComponent'
import Input from '../InputComponent'
import { toast } from 'react-toastify'
import * as userService from '../../services/userService'
import { useMutationHook } from '../../hooks/useMutation'
import logoUser from '../../assets/images/user.png'
const UserInforModal = (props) => {
    const { modalState, userInfor, queryUsers } = props
    const addressList = userInfor?.address?.split('_')
    const [fullName, setFullName] = useState(userInfor?.full_name)
    const [email, setEmail] = useState(userInfor?.email)
    const [phone, setPhone] = useState(userInfor?.phone_number)
    const [gender, setGender] = useState(userInfor?.gender)
    const [birthday, setBirthday] = useState(userInfor?.birthday?.split('T')[0])
    const [address, setAddress] = useState({
        city: userInfor?.address ? addressList[0] : '',
        district: userInfor?.address ? addressList[1] : '',
        ward: userInfor?.address ? addressList[2] : ''
    })
    const [addressDetail, setAddressDetail] = useState(userInfor?.address_detail)
    const [userName, setUserName] = useState(userInfor?.user_name)
    const mutation = useMutationHook(
        (dataReq) => userService.updateUserApi(dataReq)
    )
    const { data, isSuccess } = mutation

    useEffect(() => {
        if (data?.status === 200) {
            const notifySuccess = () => toast.success("Cập nhật thông tin thành công");
            notifySuccess()
            modalState()
        }
    }, [isSuccess])

    const handleOnUpdate = async () => {
        const access_token = localStorage.getItem('token')
        mutation.mutate(
            {
                id: userInfor._id,
                access_token: access_token,
                data: {
                    user_name: userName,
                    full_name: fullName,
                    phone_number: phone,
                    gender: gender,
                    birthday: birthday,
                    address: address.city ? `${address.city}_${address.district}_${address.ward}` : '',
                    address_detail: addressDetail
                }
            },
            {
                onSettled: () => {
                    queryUsers.refetch()
                }
            }
        )
    }

    useEffect(() => {

        const script1 = document.createElement('script');
        const script2 = document.createElement('script');

        script1.src = "https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js";
        script1.async = true;
        script2.innerHTML = `
        var citis = document.getElementById("city");
            var districts = document.getElementById("district");
            var wards = document.getElementById("ward");
            fetch("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json")
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Có lỗi khi tải dữ liệu");
                    }
                    return response.json();
                })
                .then(data => {
                    renderCity(data)
                })
                .catch(error => {
                    console.error("Lỗi:", error);
                });
            function renderCity(data) {
                for (const x of data) {
                    citis.options[citis.options.length] = new Option(x.Name, x.Id);
                }
                citis.onchange = function () {
                    district.length = 1;
                    ward.length = 1;
                    if (this.value != "") {
                        const result = data.filter(n => n.Id === this.value);
    
                        for (const k of result[0].Districts) {
                            district.options[district.options.length] = new Option(k.Name, k.Id);
                        }
                    }
                };
                district.onchange = function () {
                    ward.length = 1;
                    const dataCity = data.filter((n) => n.Id === citis.value);
                    if (this.value != "") {
                        const dataWards = dataCity[0].Districts.filter(n => n.Id === this.value)[0].Wards;
    
                        for (const w of dataWards) {
                            wards.options[wards.options.length] = new Option(w.Name, w.Id);
                        }
                    }
                };
            }
        `
        script2.async = true;

        document.body.appendChild(script1);
        document.body.appendChild(script2);

        return () => {
            document.body.removeChild(script1);
            document.body.removeChild(script2);
        }
    }, []);

    const handleOnChangeCity = (e) => {
        setAddress(prev =>
        ({
            city: e.target.options[e.target.selectedIndex].text,
            district: '',
            ward: ''
        })
        )
    }
    const handleOnChangeDistrict = (e) => {
        setAddress(prev =>
        ({
            ...prev,
            district: e.target.options[e.target.selectedIndex].text,
            ward: ''
        }
        ))
    }
    const handleOnChangeWard = (e) => {
        setAddress(prev =>
        ({
            ...prev,
            ward: e.target.options[e.target.selectedIndex].text
        }
        ))
    }

    return (
        <div className={styleModal.overlay} onDoubleClick={modalState}>

            <div className={styleModal.modal} onClick={e => e.stopPropagation()} style={{width: 1000}}>
                <div className={styleModal.modal_top}>
                    <h3 className={`${styleModal.modal_title}`}>Thông tin tài khoản</h3>
                    <i onClick={modalState} className="fa-solid fa-xmark"></i>
                </div>

                <div className={`${styleModule.userProfile_page} grid wide`} style={{ padding: 0 }}>
                    <div className={styleModule.wrapper} style={{margin: '20px 50px'}}>
                        <div className={`${styleModule.user_profile_top} row`}>
                            <div className="col l-4 c-12 m-12">
                                <div className={`${styleModule.user_profile_avatar_and_username}`}>
                                    <div className={styleModule.user_profile_avatar} >
                                        <img src={logoUser} />
                                    </div>
                                    <div className={styleModule.user_profile_username}>
                                        <div className={`${styleModule.user_infor_username}`}>
                                            <label className={`${styleModule.user_infor_username_label}`}>Tên người dùng</label>
                                            <Input
                                                // w='200px'
                                                handleOnChange={e => setUserName(e.target.value)}
                                                inputValue={userName}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=" col l-8 c-12 m-12">
                                <div className={`${styleModule.user_profile_infor}`}>
                                    <div className={`${styleModule.user_infor_fullname}`}>
                                        <label className={`${styleModule.user_infor_fullname_label}`}>Họ và tên</label>
                                        <Input
                                            // w='450px'
                                            handleOnChange={e => setFullName(e.target.value)}
                                            inputValue={fullName}
                                        />
                                    </div>
                                    <div className={`${styleModule.user_infor_email}`}>
                                        <label className={`${styleModule.user_infor_email_label}`}>Email</label>
                                        <Input
                                            readOnly
                                            // w='450px'
                                            handleOnChange={e => setEmail(e.target.value)}
                                            inputValue={email}
                                        />
                                    </div>
                                    <div className={`${styleModule.user_infor_phone}`}>
                                        <label className={`${styleModule.user_infor_phone_label}`}>Số điện thoại</label>
                                        <Input
                                            // w='450px'
                                            handleOnChange={e => setPhone(e.target.value)}
                                            inputValue={phone}
                                        />
                                    </div>
                                    <div className={`${styleModule.user_infor_gender_and_birthday}`}>
                                        <div className={`${styleModule.user_infor_gender}`}>
                                            <label className={`${styleModule.user_infor_gender_label}`}>Giới tính</label>
                                            <div className={`${styleModule.user_infor_gender_wrap}`}>
                                                <select onChange={e => setGender(e.target.value)} value={gender}>
                                                    <option value='Khác'>Khác</option>
                                                    <option value='Nam'>Nam</option>
                                                    <option value='Nữ'>Nữ</option>
                                                </select>
                                                <i className="fa-solid fa-angle-down"></i>
                                            </div>
                                        </div>
                                        <div className={`${styleModule.user_infor_birthday}`}>
                                            <label className={`${styleModule.user_infor_birthday_label}`}>Ngày sinh</label>
                                            <input type='date' onChange={e => setBirthday(e.target.value)} defaultValue={birthday} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className={`${styleModule.user_profile_bottom}`}>
                            <div className={`${styleModule.user_profile_bottom_address} row`}>
                                <div className={`${styleModule.localSelect} col l-4 m-12 c-12`}>
                                    <label>Chọn Tỉnh/Thành phố</label>
                                    <div style={{ position: "relative" }}>
                                        <select id="city"
                                            onChange={e => handleOnChangeCity(e)}
                                        >
                                            {address?.city ? (<option>{address.city}</option>)
                                                : (<option value="" ></option>)}
                                        </select>
                                        <i className="fa-solid fa-angle-down"></i>
                                    </div>
                                </div>

                                <div className={`${styleModule.localSelect} col l-4 m-12 c-12`} >

                                    <label>Chọn Quận/Huyện</label>
                                    <div style={{ position: "relative" }}>
                                        <select id="district"
                                            onChange={e => handleOnChangeDistrict(e)}
                                        >
                                            {address?.district ? (<option>{address.district}</option>)
                                                : (<option value="" ></option>)}
                                        </select>
                                        <i className="fa-solid fa-angle-down"></i>
                                    </div>
                                </div>

                                <div className={`${styleModule.localSelect} col l-4 m-12 c-12`}>

                                    <label>Chọn Phường/Xã</label>
                                    <div style={{ position: "relative" }}>
                                        <select id="ward"
                                            onChange={e => handleOnChangeWard(e)}
                                        >
                                            {address?.ward ? (<option>{address.ward}</option>)
                                                : (<option value="" ></option>)}
                                        </select>
                                        <i className="fa-solid fa-angle-down"></i>
                                    </div>

                                </div>
                            </div>
                            <div className={`${styleModule.user_profile_bottom_detail_address} l-12 c-12 m-12`}>
                                <label>Tên đường/Tòa nhà/Số nhà (Địa chỉ chi tiết)</label>
                                <textarea onChange={e => setAddressDetail(e.target.value)} value={addressDetail} />
                            </div>

                            <div className={`${styleModule.user_profile_bottom_btn_area}`}>
                                <Button
                                    className={`${styleModule.updateBtn}`}
                                    content='Cập nhật'
                                    onClick={handleOnUpdate}
                                />
                            </div>
                        </div>

                    </div>
                </div >


            </div>
        </div>
    )
}

export default UserInforModal