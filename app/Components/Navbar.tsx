import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { auth, signOut , signIn } from '@/Auth'

const Navbar = async () => {

  const session = await auth()


  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>

        <div className="flex gap-4 items-center text-sm text-gray-500 ">
          {session?.user ? (
            <>
            <Link href="/startup/create">Create</Link>
            <form action={async () => {
              "use server"; 
              await signOut({redirectTo: '/'})
            }}>
              <button type="submit">Logout</button>
            </form>
            <Link href={`/user/${session?.id}`}>{session?.user.name}</Link>
            </>
          ) : (
            <form action={async () => {
              "use server"; 


              await signIn('github')
              }}>
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar