import { FaFacebook, FaInstagram, FaWhatsapp, FaLinkedin, FaGithub } from 'react-icons/fa'
import './SocialLinks.css'

const LINKS = [
  { Icon: FaFacebook, href: 'https://www.facebook.com/lieth.khaldoun', label: 'Facebook' },
  { Icon: FaInstagram, href: 'https://www.instagram.com/itslieth/', label: 'Instagram' },
  { Icon: FaWhatsapp, href: 'https://wa.me/972569376251', label: 'WhatsApp' },
  { Icon: FaLinkedin, href: 'https://www.linkedin.com/in/laith-abu-arrah/', label: 'LinkedIn' },
  { Icon: FaGithub, href: 'https://github.com/ITsLieTH', label: 'GitHub' },
]

function SocialLinks() {
  return (
    <div className="social-links">
      {LINKS.map(({ Icon, href, label }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label={label}>
          <Icon size={26} />
        </a>
      ))}
    </div>
  )
}

export default SocialLinks