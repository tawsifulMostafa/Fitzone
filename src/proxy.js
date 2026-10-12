import { NextResponse } from 'next/server'
import { sessionCheck } from './lib/core/session'
 
export async function proxy(request) {
  const session = await sessionCheck()
  if(!session){

      return NextResponse.redirect(new URL('/signIn', request.url))
  }
        

}
 
export const config = {
  matcher: [
    "/all-classes/:id",
  ],
}