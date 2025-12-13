import React, { useEffect, useState } from 'react'
import styleModule from './test.module.scss'
import { priceDisplay } from '../../utils/priceDisplay'
import Button from '../../components/ButtonComponent'
import boxImg from '../../assets/images/box.png'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../../components/InputComponent'


import payment1 from '../../assets/images/004-delivery-box.png'
import payment2 from '../../assets/images/zaloPay.png'
import payment3 from '../../assets/images/003-atm-card.png'

import transport1 from '../../assets/images/002-delivery-truck.png'
import transport2 from '../../assets/images/001-piggy-bank.png'
import noProductImg from '../../assets/images/noProduct.png'
import { useNavigate } from 'react-router-dom'
import { useMutationHook } from '../../hooks/useMutation'


import * as orderService from '../../services/orderService'
import { toast } from 'react-toastify'
import LoadingComponent from '../../components/LoadingComponent'
import { resetCart } from '../../redux/Slices/cartSlice'
import axios from 'axios'




const PaymentPage = () => {


    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState({
        city: '',
        district: '',
        ward: ''
    })
    const [addressDetail, setAddressDetail] = useState('')
    const [note, setNote] = useState('')



    const [payment, setPayment] = useState('payment1')
    const [transport, setTransport] = useState('transport1')
    const handleOnChangePayment = (e) => {
        setPayment(e.target.value)
    }
    const handleOnChangeTransport = (e) => {
        setTransport(e.target.value)
    }

    const userInfor = useSelector((state) => state.userInfor)
    useEffect(() => {
        const addressList = userInfor?.address.split('_')
        setFullName(userInfor?.fullName)
        setEmail(userInfor?.email)
        setPhone(userInfor?.phone)
        setAddress({
            city: addressList[0],
            district: addressList[1],
            ward: addressList[2]
        })
        setAddressDetail(userInfor?.addressDetail)
    }, [userInfor])
    useEffect(() => {
        if (!cart?.products.length > 0) return
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
        }`
        script2.async = true;
        document.body.appendChild(script1);
        document.body.appendChild(script2);
        return () => {
            document.body.removeChild(script1);
            document.body.removeChild(script2);
        }
    }, [cart?.products.length]);
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




    const mutation = useMutationHook(
        data => orderService.createOrderApi(data)
    )
    const { data, isLoading, isSuccess } = mutation



    const createNotification = async (content) => {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/notification/create-notification`,
            {
                type: 1,
                content: content,

            })
    }



    useEffect(() => {
        // if (data?.status === 409) {
        //     const notifyWarning = () => toast.warning("Email nhập vào đã được dùng");
        //     notifyWarning()
        //     clearInput()
        // }
        if (data?.status === 200) {

            const content = cart.products.map(product => `x${product.count} ${product.name}, phân loại: ${product.product_type.nameType} đến ${address.city}_${address.district}_${address.ward}`)
            createNotification(content)


            navigate(`/order/checkout/${data?.product._id}`, {
                state: { id: data?.product._id }
            });
            dispatch(resetCart())
        }
    }, [isSuccess])

    const checkValidInput = () => {

        ////Check valid


        return true
    }


    const handleOnSubmit = () => {
        var newProducts = cart.products.map(product => ({
            id: product.id, // Cung cấp giá trị cho thuộc tính id
            id_type: product.product_type.idType,
            name: product.name,
            type: product.product_type.nameType,
            price: product.price,
            count: product.count
        }));


        if (checkValidInput()) {
            mutation.mutate({
                order_customer_infor: {
                    id: userInfor?.userId,
                    name: fullName,
                    email,
                    phone,
                    address: `${address.city}_${address.district}_${address.ward}`,
                    address_detail: addressDetail,
                    note
                },
                order_products_infor: newProducts,
                order_status: {
                    total_price: cart.totalPrice,
                    total_shipping_cost: transport === 'transport1' ? 20000 : 50000,
                    total_discount: cart.totalDiscount,
                    total_final_price: cart.totalPrice - cart.totalDiscount + (transport === 'transport1' ? 20000 : 50000),
                    payment_method: payment,
                    shipping_method: transport
                }
            })
        }
    }



    return (
        <div className={`${styleModule.payment_page} grid wide`}>
            {cart?.products.length > 0 ? (
                <div className='row'>

                    <div className={`${styleModule.infor_user} col l-8 m-12 c-12`}>

                        <h3 className={`${styleModule.user_profile_title}`}>Thông tin giao hàng</h3>
                        <span className={`${styleModule.user_profile_sub_title}`}>(vui lòng nhập đủ các trường (<span style={{ color: 'red' }}>*</span>) để chúng tôi có thể giao hàng đến bạn)</span>



                        <div className={styleModule.wrapper}>

                            <div className={`${styleModule.user_profile_top} row`}>
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
                                            <label className={`${styleModule.user_infor_email_label}`}>Email <span style={{ fontSize: 12, fontStyle: 'italic', marginLeft: 3, color: '#4d4949' }}>(để chúng tôi có thể thông báo cho bạn về tình trạng đơn hàng)</span></label>
                                            <Input
                                                // w='450px'
                                                handleOnChange={e => setEmail(e.target.value)}
                                                inputValue={email}
                                            />
                                        </div>
                                        <div className={`${styleModule.user_infor_phone}`}>
                                            <label className={`${styleModule.user_infor_phone_label}`}>Số điện thoạai</label>
                                            <Input
                                                // w='450px'
                                                handleOnChange={e => setPhone(e.target.value)}
                                                inputValue={phone}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col l-4 c-12 m-12">
                                    <div className={`${styleModule.user_profile_avatar_and_username}`}>

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
                                <div className={`${styleModule.user_profile_bottom_detail_address} l-12 c-12 m-12`}>
                                    <label>Ghi chú cho đơn hàng (nếu có)</label>
                                    <textarea onChange={e => setNote(e.target.value)} value={note} />
                                </div>


                            </div>

                        </div>




                    </div>

                    <div className={`${styleModule.total_amount} col l-4 m-12 c-12`}>

                        <div className={`${styleModule.total_top} ${styleModule.product_list}`}>
                            <h3>Danh sách sản phẩm</h3>
                            {cart.products.map((product, i) => {
                                const price = priceDisplay(product.price * product.count)
                                if (product.check) {
                                    return (
                                        <div key={i} className={styleModule.product_buy}>
                                            <span>x{product.count}</span><span>{product.name}</span><span style={{ float: 'right' }}>{price}</span>
                                        </div>
                                    )
                                }
                            })}
                        </div>

                        <div className={styleModule.total_top} style={{ marginTop: 20 }}>
                            <div>
                                <h3>Phương thức thanh toán</h3>
                                <div className={styleModule.payment_list}>

                                    <label htmlFor="thanhtoankhinhanhang" className={payment == 'payment1' ? styleModule.active : ''}>
                                        <input type="radio" id="thanhtoankhinhanhang" name="payment" value="payment1" checked={payment === 'payment1'} onChange={handleOnChangePayment} />
                                        Thanh toán khi nhận hàng<img src={payment1} />
                                    </label>
                                    {/* <label htmlFor="thanhtoanbangzalopay" className={payment == 'payment2' ? styleModule.active : ''}>
                                        <input type="radio" id="thanhtoanbangzalopay" name="payment" value="payment2" checked={payment === 'payment2'} onChange={handleOnChangePayment} />
                                        Thanh toán bằng ZaloPay<img src={payment2} />
                                    </label> */}
                                    <label htmlFor="chuyenkhoannganhang" className={payment == 'payment3' ? styleModule.active : ''}>
                                        <input type="radio" id="chuyenkhoannganhang" name="payment" value="payment3" checked={payment === 'payment3'} onChange={handleOnChangePayment} />
                                        Chuyển khoản ngân hàng<img src={payment3} />
                                    </label>
                                </div>
                            </div>
                            <div style={{ marginTop: 20 }}>
                                <h3>Phương thức vận chuyển</h3>
                                <div className={styleModule.transport_list}>

                                    <label htmlFor="hoatoc" className={transport == 'transport1' ? styleModule.active : ''}>
                                        <input type="radio" id="hoatoc" name="transport" value="transport1" checked={transport === 'transport1'} onChange={handleOnChangeTransport} />
                                        Tiêu chuẩn<img src={transport1} /><span>2 - 5 ngày</span>
                                    </label>
                                    {/* <label htmlFor="tichkiem" className={transport == 'transport2' ? styleModule.active : ''}>
                                        <input type="radio" id="tichkiem" name="transport" value="transport2" checked={transport === 'transport2'} onChange={handleOnChangeTransport} />
                                        Tích kiệm<img src={transport2} style={{ transform: 'translateY(-2px)' }} /><span>5 - 15 ngày</span>
                                    </label> */}

                                </div>
                            </div>

                            <Input
                                bgc='rgb(228 228 228 / 44%)'
                                placeholder="Mã giảm giá (nếu có)"
                            />
                            <Button
                                content="Áp dụng"
                            />
                        </div>
                        <div className={styleModule.total_bottom}>
                            <div className={styleModule.total_bottom_lst}>


                                <div className={styleModule.total_bottom_item}><span className={styleModule.total_bottom_title}>Tạm tính</span><span className={styleModule.total_bottom_value}>{priceDisplay(cart.totalPrice)}</span></div>
                                <div className={styleModule.total_bottom_item}><span className={styleModule.total_bottom_title}>Giảm giá</span><span className={styleModule.total_bottom_value}>- {priceDisplay(cart.totalDiscount)}</span></div>
                                <div className={styleModule.total_bottom_item}><span className={styleModule.total_bottom_title}>Phí vận chuyển</span><span className={styleModule.total_bottom_value}>{priceDisplay(transport === 'transport1' ? 20000 : 50000)}</span></div>
                                <div className={styleModule.total_bottom_item}><span className={styleModule.total_bottom_title}>Thành tiền</span><span className={styleModule.total_bottom_value}>{priceDisplay(cart.totalPrice - cart.totalDiscount + (transport === 'transport1' ? 20000 : 50000))}</span></div>

                            </div>

                            <Button
                                content="Đặt hàng"
                                bgc="rgb(255, 66, 78)"
                                m="20px 0 0 0"
                                p="13px 20px"
                                fw="700"
                                w="100%"
                                onClick={handleOnSubmit}
                            />
                        </div>

                    </div>
                </div>) :
                (<div className={styleModule.noCart}>
                    <img src={noProductImg}></img>
                    <span> Bạn chưa có sản phẩm nào trong giỏ hàng !</span>
                    <Button
                        onClick={() => navigate('/')}
                        className={styleModule.not_found_page_btn}
                        content='Tiếp tục mua sắm'
                        m='50px 0 0 0'
                        bgc='white'
                        color='#d19002'
                        br='10px'
                        border='1px solid #d19002'
                        icon='fa-solid fa-house'
                    />
                </div>)}
            {isLoading && <LoadingComponent />}
        </div>
    )
}

export default PaymentPage