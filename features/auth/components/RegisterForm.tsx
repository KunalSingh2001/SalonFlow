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
import { registerSchema } from "@/schemas/auth/auth.schema";
import { getZodFieldErrors } from "@/lib/utils/zod";
import { registerUser } from "@/services/auth.service";

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        busniess_name: "",
        owner_name: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = registerSchema.safeParse(formData);

        if (!result.success) {
            setErrors(getZodFieldErrors(result.error));
            return;
        }

        setErrors({});
        // setServerError(null); // 👈 1. Clear previous server error
        setIsLoading(true);
        try {
            const data = await registerUser(formData);
            console.log("Registration successful:", data);

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
                <CardTitle>Register</CardTitle>
                <CardDescription>
                    Enter your email and password to continue.
                </CardDescription>
            </CardHeader>

            <CardContent className="max-h-[450px] overflow-y-auto pr-2">
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid gap-2">
                        <Label htmlFor="busniess_name">Busniess Name</Label>
                        <Input
                            id="busniess_name"
                            type="text"
                            placeholder="Enter Bussniess Name"
                            value={formData.busniess_name}
                            onChange={(e) => setFormData({ ...formData, busniess_name: e.target.value })}
                        />
                        {errors.busniess_name && (
                            <p className="text-sm text-red-500">
                                {errors.busniess_name}
                            </p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="owner_name">Owner Name</Label>
                        <Input
                            id="owner_name"
                            type="text"
                            placeholder="Enter Owner Name"
                            onChange={(e) => setFormData({ ...formData, owner_name: e.target.value })}
                        />
                        {errors.owner_name && (
                            <p className="text-sm text-red-500">
                                {errors.owner_name}
                            </p>
                        )}
                    </div>
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

                    <div className="grid gap-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input
                            id="confirm-password"
                            type="confirm_password"
                            placeholder="••••••••"
                            onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <Button type="submit" className="w-full">
                        Register
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
