import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="mx-auto flex min-h-[80vh] max-w-7xl items-center px-6">
            <div className="max-w-2xl">
                <h1 className="text-5xl font-bold">
                    Manage Your Salon Like a Pro
                </h1>

                <p className="mt-6 text-lg text-gray-600">
                    SalonFlow helps salon owners manage appointments, employees
                    and customers from one dashboard.
                </p>

                <div className="mt-8 flex gap-4">
                    <Button>
                        <Link href="/register">Start Free Trial</Link>
                    </Button>

                    <Button variant="outline">Learn More</Button>
                </div>
            </div>
        </section>
    );
}
