import styleModule from './index.module.scss'
import emailIcon from '../../assets/images/email_icon.png'
import mesengerIcon from '../../assets/images/messenger_icon.png'
import zaloIcon from '../../assets/images/zalo_icon.png'
import phoneIcon from '../../assets/images/phone_icon.png'

const contactList = [
  {
    icon: emailIcon,
    label: 'Email',
    value: 'support@thuocthuy247.vn',
    href: 'mailto:support@thuocthuy247.vn'
  },
  {
    icon: mesengerIcon,
    label: 'Messenger',
    value: 'Facebook Messenger',
    href: 'https://m.me/104988175154682',
    target: '_blank'
  },
  {
    icon: zaloIcon,
    label: 'Zalo',
    value: '0971 833 093',
    href: 'https://zalo.me/0971833093',
    target: '_blank'
  },
  {
    icon: phoneIcon,
    label: 'Hotline',
    value: '+84 971 833 093',
    href: 'tel:+84971833093'
  }
]

const ContactPage = () => {
  return (
    <div className={`${styleModule.about_page} grid wide`}>
      <div className={styleModule.pageHeader}>
        <span className={styleModule.kicker}>Liên hệ</span>
        <h3 className={styleModule.title}>Liên hệ với chúng tôi</h3>
      </div>

      <div className={styleModule.contactGrid}>
        {contactList.map((item, index) => (
          <a
            key={index}
            className={styleModule.contactCard}
            href={item.href}
            target={item.target || undefined}
            rel={item.target ? 'noreferrer' : undefined}
          >
            <div className={styleModule.iconWrap} style={{ backgroundImage: `url(${item.icon})` }} />
            <div className={styleModule.info}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default ContactPage