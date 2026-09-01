// const axios = require('axios');
import type { RegisterBody } from "../schemas/auth/auth.schema";
export const registerUser = async (data: RegisterBody) => {
    const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    return result;
};