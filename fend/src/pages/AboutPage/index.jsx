import styleModule from './index.module.scss'
import tencongty from '../../assets/images/002-business-and-trade.png'
import diachi from '../../assets/images/003-pin.png'
import sdt from '../../assets/images/004-telephone.png'
import email from '../../assets/images/001-envelope.png'
import website from '../../assets/images/005-internet.png'

const AboutPage = () => {
    return (
        <div className={`${styleModule.about_page} grid wide`}>
            <h3 className={`${styleModule.title}`}>Giới thiệu về chúng tôi</h3>
            <div className={styleModule.inforText}>
                <ul className={styleModule.inforList}>
                    <div className={styleModule.infor}>
                        <div>
                            <img src={tencongty} />
                        </div>
                        <p>
                            <b>Tên cửa hàng: </b>
                            <span>SHOP THUỐC THÚ Y 24/7</span>
                        </p>
                    </div>

                    <div className={styleModule.infor}>
                        <div>
                            <img src={diachi} />
                        </div>
                        <p>
                            <b>Địa chỉ: </b>
                            <span>Khu tập thể H10, Đường Trường Chinh, Phường Đình, Đống Đa, Hà Nội</span>
                        </p>
                    </div>

                    <div className={styleModule.infor}>
                        <div>
                            <img src={sdt} />
                        </div>
                        <p>
                            <b>Số điện thoại: </b>
                            <span>0383346631, 0971833093</span>
                        </p>
                    </div>

                    <div className={styleModule.infor}>
                        <div>
                            <img src={email} />
                        </div>
                        <p>
                            <b>Email: </b>
                            <span>thutrang1105@gmail.com</span>
                        </p>
                    </div>

                    <div className={styleModule.infor}>
                        <div>
                            <img src={website} />
                        </div>
                        <p>
                            <b>Website: </b>
                            <span>http://localhost:3001/</span>
                        </p>
                    </div>
                </ul>
            </div>

        </div>
    )
}

export default AboutPage