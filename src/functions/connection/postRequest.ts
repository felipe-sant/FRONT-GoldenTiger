import ErrorMessage from "../../types/ErrorMessage.type";

async function postRequest<T, U>(url: string, body: U, query?: Record<string, string>): Promise<T | ErrorMessage> {
    try {
        let fullUrl: string;
        query ? fullUrl = `${url}?${(new URLSearchParams(query)).toString()}` : fullUrl = url;
        const response = await fetch(fullUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const data: T = await response.json();
        return data;
    } catch (error) {
        console.error("Erro:", error);
        return { message: (error as Error).message };
    }
}

export default postRequest;