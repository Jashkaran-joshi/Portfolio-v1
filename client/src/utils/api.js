/**
 * Centralized API utility for handling fetch calls and consistent error responses.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const getApiUrl = (endpoint) => {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    const normalizedBase = BASE_URL.endsWith('/api') ? BASE_URL : `${BASE_URL}/api`;
    return `${normalizedBase}/${cleanEndpoint}`;
};

export const api = {
    /**
     * Sends a POST request to the specified endpoint.
     * @param {string} endpoint - The API endpoint (e.g., 'contact').
     * @param {object} data - The payload to send.
     * @returns {Promise<any>}
     */
    post: async (endpoint, data) => {
        try {
            const response = await fetch(getApiUrl(endpoint), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                // Return a structured error object
                throw {
                    status: response.status,
                    message: result.message || 'An unexpected error occurred.',
                    errors: result.errors || null,
                };
            }

            return result;
        } catch (error) {
            // Rethrow structured errors, or wrap network errors
            if (error.status) throw error;
            throw {
                status: 0,
                message: error.message || 'Network error — please check your connection.',
            };
        }
    },
};
