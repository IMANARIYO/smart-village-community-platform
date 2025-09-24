// 🔹 Central error handler (enhanced)
export function extractErrorMessage(error: unknown, fallback = "Something went wrong"): string {
    // Handle Axios-like errors
    if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
            response?: {
                data?: { message?: string | string[]; error?: string | string[] };
                status?: number;
                statusText?: string;
            };
            code?: string;
            message?: string;
        };

        const { data, status, statusText } = axiosError.response ?? {};

        // Handle validation arrays (e.g., ["Name is required", "Email is invalid"])
        if (Array.isArray(data?.message)) {
            return data?.message.join(", ");
        }
        if (Array.isArray(data?.error)) {
            return data?.error.join(", ");
        }

        // Prefer backend message/error
        if (typeof data?.message === "string") return data.message;
        if (typeof data?.error === "string") return data.error;

        // Add fallback with status code
        if (status) {
            return `${status} ${statusText || "Error"} – ${axiosError.message || fallback}`;
        }

        return axiosError.message || fallback;
    }

    // Handle plain JS errors
    if (error instanceof Error) {
        return error.message || fallback;
    }

    // Handle string errors
    if (typeof error === "string") {
        return error;
    }

    // Handle network-like errors (offline, timeout, etc.)
    if (
        error &&
        typeof error === "object" &&
        "code" in error &&
        typeof (error as { code: unknown }).code === "string"
    ) {
        const code = (error as { code: string }).code;
        if (code === "ECONNABORTED") return "Request timed out. Please try again.";
        if (code === "ERR_NETWORK") return "Network error. Please check your connection.";
        if (code === "ERR_CORS") return "CORS error. The server rejected this request.";
    }

    return fallback;
}
