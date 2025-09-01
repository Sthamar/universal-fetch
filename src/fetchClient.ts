export interface FetchOptions extends RequestInit {
    retries?: number;
}

export async function fetchClient<T>(
    url: string,
    options: FetchOptions = {}
): Promise<T> {
    const { retries = 0, ...fetchOptions } = options;
    for (let attempt = 0; attempt <= retries; attempt++) {
        try{
            const res = await fetch(url, fetchOptions);
            if(!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return (await res.json()) as T;
        }catch(error){
            if(attempt === retries){
                throw error;
            }
    }
        
    }
    throw new Error('Unreachable code');
}