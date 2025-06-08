"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AlignRightIcon, BellRing, BookOpen, CircleUserIcon, Home, LayoutDashboard, Settings } from "lucide-react"

const navLinks = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/user/courses", icon: BookOpen, label: "Courses" },
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/settings", icon: BellRing, label: "Settings" },
    { href: "/user/profile", icon: CircleUserIcon, label: "Profile" },
]

const Footer = () => {
    const pathname = usePathname()

    return (
        <footer className="fixed left-0 bottom-0 w-full z-50 px-1 pb-1">
            <div className="container py-2  bg-[#343434]/50 backdrop-blur-xl border-t border-white/10 rounded-xl">
                <ul className="flex items-center justify-between gap-2 px-2 py-3 rounded-lg">
                    {navLinks.map(({ href, icon: Icon, label }) => {
                        const isActive = pathname === href

                        return (
                            <li key={href}>
                                <Link
                                    href={href}
                                    aria-label={label}
                                    className={`flex flex-col items-center justify-center text-xs transition-all ${isActive ? "text-green-400" : "text-white"
                                        }`}
                                >
                                    <Icon
                                        size={28}
                                        strokeWidth={1}
                                        stroke={isActive ? "#00FF80" : "#00C835"}
                                        className="mb-1"
                                    />
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </footer>
    )
}

export default Footer
