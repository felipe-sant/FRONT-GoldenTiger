import ErrorMessage from "../../types/ErrorMessage.type";
import { getCookie } from "../utils/getCookie";

async function getRequest<T>(url: string, query?: Record<string, string>): Promise<T | ErrorMessage> {
    try {
        const token = "Bearer " + getCookie('token')

        let fullUrl: string
        query ? fullUrl = `${url}?${(new URLSearchParams(query)).toString()}` : fullUrl = url

        const response = await fetch(fullUrl, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: T = await response.json();
        return data;
    } catch (error) {
        console.error("Erro:", error);
        return { message: (error as Error).message };
    }
}

export default getRequest;