// const axios = require('axios');
import type { RegisterBody, LoginBody } from "../schemas/auth/auth.schema";
export const registerUser = async (data: RegisterBody) => {
    const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
    });
    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message || "Registeration failed");
    }
    return result;
};

export const loginUser = async (data: LoginBody) => {
    const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
    });
    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message || "Login failed");
    }
    return result;
};