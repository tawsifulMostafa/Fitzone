import { NextResponse } from 'next/server'
import { sessionCheck } from './lib/core/session'

export async function proxy(request) {
  const session = await sessionCheck()

  if (!session) {
    const signInUrl = new URL('/signIn', request.url)

    signInUrl.searchParams.set(
      'callbackURL',
      request.nextUrl.pathname + request.nextUrl.search
    )

    signInUrl.searchParams.set('message', 'login-required')

    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/all-classes/:id",
    "/community-forum/:id",
  ],
}