import Link from "next/link";

export function Footer() {
    return(
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t mt-auto">
            <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 RateMyClasses. All rights reserved.</p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link href="/terms" className="text-xs hover:underline underline-offset-4">
                Terms of Service
            </Link>
            <Link href="/privacy" className="text-xs hover:underline underline-offset-4">
                Privacy
            </Link>
            </nav>
        </footer>
    );
}

export function Header() {
    return (
        <header className="px-4 lg:px-6 h-16 flex items-center border-b">
            <Link href="/" className="flex items-center justify-center">
            <span className="font-bold text-xl">RateMyClasses</span>
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/majors" className="text-sm font-medium hover:underline underline-offset-4">
                Majors
            </Link>
            <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
                About
            </Link>
            <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">
                Login
            </Link>
            </nav>
        </header>
    )
}