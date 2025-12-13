import styleModule from './index.module.scss'
import emailIcon from '../../assets/images/email_icon.png'
import mesengerIcon from '../../assets/images/messenger_icon.png'
import zaloIcon from '../../assets/images/zalo_icon.png'
import phoneIcon from '../../assets/images/phone_icon.png'

const ContactPage = () => {
  return (
    <div className={`${styleModule.about_page} grid wide`}>
      <h3 className={`${styleModule.title}`}>Liên hệ với chúng tôi</h3>

      


      <ul className={`${styleModule.footer_contact_list}`}>
        <div className={`${styleModule.footer_contact_item}`} id="item_email" style={{ backgroundImage: `url(${emailIcon})` }}></div>

        <a className={`${styleModule.footer_contact_item}`} id="item_messenger" href="https://m.me/104988175154682" target="_blank" style={{ backgroundImage: `url(${mesengerIcon})` }}></a>

        <a className={`${styleModule.footer_contact_item}`} id="item_zalo" href="https://zalo.me/0971833093" target="_blank" style={{ backgroundImage: `url(${zaloIcon})` }}></a>

        <a className={`${styleModule.footer_contact_item}`} id="item_phone" href="tel: +0971833093" style={{ backgroundImage: `url(${phoneIcon})` }}></a>
      </ul>
    </div>

  )
}

export default ContactPage