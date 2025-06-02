"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, CircleUserIcon, Home, LayoutDashboard, Settings } from "lucide-react"

const navLinks = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/user/courses", icon: BookOpen, label: "Courses" },
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/profile", icon: CircleUserIcon, label: "Profile" },
    { href: "/settings", icon: Settings, label: "Settings" },
]

const Footer = () => {
    const pathname = usePathname()

    return (
        <footer className="fixed bottom-0 w-full z-50 bg-[#343434]/90 backdrop-blur-xl border-t border-white/10">
            <div className="max-w-[1440px] mx-auto px-2 py-2">
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
