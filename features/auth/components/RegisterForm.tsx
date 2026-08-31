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

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        busniess_name: "",
        owner_name: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = registerSchema.safeParse(formData);

        if (!result.success) {
            setErrors(getZodFieldErrors(result.error));
            return;
        }

        setErrors({});

        console.log(formData);

    }


    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>
                    Enter your email and password to continue.
                </CardDescription>
            </CardHeader>

            <CardContent>
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
