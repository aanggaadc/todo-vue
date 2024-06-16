import getErrorMessage from "../lib/error";

const fetcher = async <TData>(
  url: string,
  body?: unknown,
  options?: RequestInit
): Promise<TData> => {
  const baseUrl = "https://todo.api.devcode.gethired.id";
  let fullUrl = new URL(url, baseUrl).toString();

  const headers = {
    "Content-Type": "application/json",
    ...(options?.headers || {}),
  };

  const requestOptions: RequestInit = {
    ...options,
    headers,
    method: options?.method || "GET",
  };

  if (requestOptions.method !== "GET" && body) {
    requestOptions.body =
      body instanceof FormData ? body : JSON.stringify(body);
  }

  if (requestOptions.method === "GET" && body) {
    const searchParams = new URLSearchParams(body as Record<string, string>);
    fullUrl += `?${searchParams.toString()}`;
  }

  const response = await fetch(fullUrl, requestOptions);

  let responseData;
  try {
    responseData = await response.json();
  } catch (error) {
    throw new Error(`Failed to parse JSON response: ${getErrorMessage(error)}`);
  }

  if (!response.ok) {
    const errorMessage =
      responseData?.message ||
      `Fetch error: ${response.status} ${response.statusText}`;
    throw new Error(errorMessage);
  }

  return responseData as TData;
};

export default fetcher;
