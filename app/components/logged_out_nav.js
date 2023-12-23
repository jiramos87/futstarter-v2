import Link from "next/link"
import { LOGIN_USER, SIGNUP_USER } from "../../src/constants/resources"

const LoggedOutNav = () => {
  return (
    <div className="flex flex-row gap-4">
      <Link
        key={LOGIN_USER.name}
        href={LOGIN_USER.href}
        className="flex h-[30px] items-center hover:bg-gray-700 hover:bg-opacity-50 px-3 text-sm font-medium"
        >
        <p className="text-yellow-50">{LOGIN_USER.name}</p>
      </Link>
      <Link
        key={SIGNUP_USER.name}
        href={SIGNUP_USER.href}
        className="flex h-[30px] items-center hover:bg-gray-700 hover:bg-opacity-50 px-3 text-sm font-medium"
        >
        <p className="text-yellow-50">{SIGNUP_USER.name}</p>
      </Link>
    </div>
  )
}

export default LoggedOutNav
