"use client"

import { signOut } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import NavLink from "../Navlink/Navlink";
import ThemeToggle from "@/Components/ThemeToggle";
const NavDetail = ({ user }) => {
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter()
    const handleSignOut = async () => {
        try {
            setLoading(true)
            await signOut();
            router.refresh()

        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    return (<nav className="border-b border-purple-100 	bg-background shadow-sm">
        <div className="flex items-center justify-between px-5 py-4 md:px-8">
            {/* Logo */}
            <Link href="/">
                <h2 className="text-3xl font-extrabold text-purple-600">
                    Fit
                    <span className="text-purple-900">
                        Zone
                    </span>
                </h2>
            </Link>
            {/* Desktop Navigation */}

            <div className="hidden items-center gap-7 font-medium text-gray-600  dark:text-gray-400 lg:flex">
                <NavLink className="transition hover:text-purple-600" href="/" >
                    Home </NavLink>
                <NavLink className="transition hover:text-purple-600" href="/all-classes" >
                    All Classes </NavLink>
                <NavLink className="transition hover:text-purple-600" href="/community-forum" >
                    Community Forum </NavLink>
                {
                    user ? <NavLink className="transition hover:text-purple-600" href={`/dashboard/${user?.role}`} >
                        Dashboard
                    </NavLink> : null
                }
            </div>
            {/* Desktop User */}
            <div className="hidden lg:block">
                {!user ? (<div className="flex items-center gap-3">
                    <ThemeToggle />
                    <Link href="/signIn" className="rounded-lg px-4 py-2 font-medium text-purple-600 transition hover:bg-purple-50" >
                        Sign In
                    </Link>
                    <Link href="/signUp" className="rounded-lg bg-purple-600 px-5 py-2 font-medium text-white transition hover:bg-purple-700" >
                        Sign Up
                    </Link>
                </div>) :
                    (<div className="flex items-center gap-3">

                        {/* Avatar */}

                        <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-purple-500">
                            <Image width={200} height={200} src={user?.image ? user.image : null} alt={user?.name} className="h-full w-full object-cover" />
                        </div>
                        {/* Name */}

                        <div className="text-right">
                            <p className="text-xs text-gray-500">
                                Welcome </p>
                            <p className="font-semibold text-purple-700"> {user?.name} </p>
                        </div>

                        {/* Sign Out */}
                        <ThemeToggle />
                        <Button onClick={handleSignOut} className="bg-purple-600 text-white hover:bg-purple-700" >
                            {loading ? "Signing out...." : "Sign Out"} </Button>
                    </div>)}
            </div>

            {/* Mobile Hamburger */}

            <Button isIconOnly variant="light" className="text-purple-600 lg:hidden" onPress={() => setIsOpen(!isOpen)} >
                {isOpen ? <X size={25} />
                    :
                    <Menu size={25} />} </Button>
        </div>
        {/* Mobile Menu */}
        {/* rounded border for all navlinks */}
        {
            isOpen && (<div className="border-t border-purple-100 bg-default px-5 py-5 lg:hidden">
                <div >
                    <div className="grid grid-cols-2 gap-4 font-medium text-gray-700 dark:text-gray-400">
                        <NavLink href="/" onClick={() => setIsOpen(false)} className="transition hover:text-purple-600 border border-gray-600 border-r" > Home </NavLink>
                        <NavLink href="/all-classes" onClick={() => setIsOpen(false)} className="transition hover:text-purple-600" > All Classes </NavLink>
                        <NavLink href="/community-forum" onClick={() => setIsOpen(false)} className="transition hover:text-purple-600" > Community Forum </NavLink>
                        {
                            user && <NavLink href={`/dashboard/${user.role}`} onClick={() => setIsOpen(false)} className="transition hover:text-purple-600 " > Dashboard </NavLink>
                        }
                    </div>

                    {/* Mobile User */}
                    <div className="mt-2 border-t border-purple-200 pt-4">
                        {
                            !user ? (<div className="flex gap-3">

                                <Link href="/signIn" onClick={() => setIsOpen(false)} className="button rounded-lg border border-purple-600 px-4 py-2 font-medium text-purple-600" > Sign In </Link>
                                <Link href="/signUp" onClick={() => setIsOpen(false)} className="button rounded-lg bg-purple-600 px-5 py-2 text-white" > Sign Up </Link>
                                <ThemeToggle />
                            </div>) :
                                (<div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-purple-500"> <Image width={200} height={200} src={user?.image} alt={user?.name} className="h-full w-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500"> Welcome </p>
                                            <p className="font-semibold text-purple-700"> {user?.name} </p>
                                        </div>
                                    </div>
                                    <ThemeToggle />

                                    <Button onPress={handleSignOut} className="bg-purple-600 text-white" >  {loading ? "Signing out...." : "Sign Out"}  </Button>
                                </div>)}
                    </div>
                </div>
            </div>
            )}
    </nav>);
}; export default NavDetail;