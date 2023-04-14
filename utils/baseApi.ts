async function baseApi(url: string, options: any = {}): Promise<any>{
    const defaultHeaders = {
    };
    const response = await fetch(url, {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'An error occurred while making the API call');
    }

    if (response.status !== 204) {
        const data = await response.json();
        return data;
    }
}

export default baseApi;