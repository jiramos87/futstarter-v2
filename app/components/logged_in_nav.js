import Link from "next/link"
import { LOGOUT_USER } from "../../src/constants/resources"

const LoggedInNav = () => {
  return (
    <Link
      key={LOGOUT_USER.name}
      href={LOGOUT_USER.href}
      className="horizontal-nav-link"
    >
      <p className="horizontal-nav-link-text">{LOGOUT_USER.name}</p>
    </Link>
  )
}

export default LoggedInNav
