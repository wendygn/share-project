import Link from "next/link";

export default function NavLink({href, children, isActive = false}) {
     const base = "px-3 py-1 rounded transition";
     const activeClass = "bg-blue-500 text-white";
     const inactiveClass = "text-gray-700 hover:bg-sky-100";

     return (
        <Link href={href} className={`${base} ${isActive ? activeClass : inactiveClass}`}
        aria-current={isActive ? "page" : undefined}
        >
            {children}
        </Link>
     )
}