import Link from "next/link"
import { LOGOUT_USER } from "../../src/constants/resources"

const LoggedInNav = () => {
  return (
    <Link
      key={LOGOUT_USER.name}
      href={LOGOUT_USER.href}
      className="flex h-[48px] grow justify-center gap-2 rounded-md bg-gradient-to-r from-yellow-400 to-green-400 p-3 text-sm font-medium hover:bg-gradient-to-r hover:from-yellow-300 hover:to-green-300 md:flex-none md:justify-start md:p-2 md:px-3 shadow-md mb-3"
    >
      <p className="text-yellow-50">{LOGOUT_USER.name}</p>
    </Link>
  )
}

export default LoggedInNav
