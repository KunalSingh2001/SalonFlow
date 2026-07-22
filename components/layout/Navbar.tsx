"use client";
import Link from "next/link";
import { useEffect } from "react";
export default function Navbar() {
    useEffect(() => {
        console.log("Navbar Mounted");
    }, []);
    return (
        <header className="border-b">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <h1 className="text-xl font-bold">SalonFlow</h1>
                <nav className="flex gap-6">
                    <Link href="/">Home</Link>
                    <Link href="/pricing">Pricing</Link>
                    <Link href="/about">About</Link>
                    <Link href="/contact">Contact</Link>
                </nav>
            </div>
        </header>
    );
}
