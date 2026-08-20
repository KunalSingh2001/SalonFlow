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


// Build a RegisterForm with:

// Business Name
// Owner Name
// Email
// Password
// Confirm Password
// Register Button
export default function RegisterForm() {
    return (
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>
                        Enter your email and password to continue.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Busniess Name</Label>
                            <Input
                                id="busniess_name"
                                type="text"
                                placeholder="Enter Bussniess Name"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Owner Name</Label>
                            <Input
                                id="owner_name"
                                type="text"
                                placeholder="Enter Owner Name"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <Input
                                id="confirm-password"
                                type="confirm_password"
                                placeholder="••••••••"
                            />
                        </div>

                        <Button className="w-full">Register</Button>
                    </form>
                </CardContent>
            </Card>
    );
}
