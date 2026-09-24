"use client";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { useState } from "react";
import { loginSchema } from "@/schemas/auth/auth.schema";
import { getZodFieldErrors } from "@/lib/utils/zod";
import { loginUser } from "@/services/auth.service";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = loginSchema.safeParse(formData);

        if (!result.success) {
            setErrors(getZodFieldErrors(result.error));
            return;
        }

        setErrors({});
        setIsLoading(true);
        try {
            await loginUser(formData);
            router.replace("/dashboard");

        } catch (err: any) {
            const message = err.message || "Something went wrong";
            console.log("error", err);
            if (message.toLowerCase().includes("user") || message.toLowerCase().includes("email")) {
                setErrors({ email: message });
            } else {
                setErrors({ general: message });
            }
        } finally {
            setIsLoading(false);
        }

    }


    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                    Enter your email and password to continue.
                </CardDescription>
            </CardHeader>

            <CardContent className="max-h-[450px] overflow-y-auto pr-2">
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500">
                                {errors.password}
                            </p>
                        )}
                    </div>
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
