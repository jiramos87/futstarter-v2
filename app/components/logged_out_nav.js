import Link from "next/link"
import { LOGIN_USER, SIGNUP_USER } from "../../src/constants/resources"

const LoggedOutNav = () => {
  return (
    <div className="flex flex-row gap-4">
      <Link
        key={LOGIN_USER.name}
        href={LOGIN_USER.href}
        className="horizontal-nav-link"
        >
        <p className="horizontal-nav-link-text">{LOGIN_USER.name}</p>
      </Link>
      <Link
        key={SIGNUP_USER.name}
        href={SIGNUP_USER.href}
        className="horizontal-nav-link"
        >
        <p className="horizontal-nav-link-text">{SIGNUP_USER.name}</p>
      </Link>
    </div>
  )
}

export default LoggedOutNav
