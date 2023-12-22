import Link from "next/link"
import { LOGOUT_USER } from "../../src/constants/resources"

const LoggedInNav = () => {
  return (
    <Link
      key={LOGOUT_USER.name}
      href={LOGOUT_USER.href}
      className="flex h-[30px] grow justify-center rounded-md p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3 shadow-md"
    >
      <p className="text-yellow-50">{LOGOUT_USER.name}</p>
    </Link>
  )
}

export default LoggedInNav
