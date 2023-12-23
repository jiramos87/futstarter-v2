import Link from "next/link"
import { LOGOUT_USER } from "../../src/constants/resources"

const LoggedInNav = () => {
  return (
    <Link
      key={LOGOUT_USER.name}
      href={LOGOUT_USER.href}
      className="flex h-[30px] items-center hover:bg-gray-700 hover:bg-opacity-50 px-3 text-sm font-medium"
    >
      <p className="text-yellow-50">{LOGOUT_USER.name}</p>
    </Link>
  )
}

export default LoggedInNav
