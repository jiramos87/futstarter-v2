import { NextResponse } from 'next/server'

export default async function POST(request) {
  removeTokenCookie(NextResponse.nextCookie(request))
  return NextResponse.redirect('/login-user')
}
