import { IApiResponse, IServiceParams } from "@/utils/types";

export const get = async <T>(
  url: string,
  params: IServiceParams = {}
): Promise<IApiResponse<T>> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Convert params into query string
  const query = new URLSearchParams(
    params as Record<string, string>
  ).toString();
  const fullUrl = query ? `${url}?${query}` : url;

  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      headers,
    });

    const data: IApiResponse<T> = await response.json();

    return data;
  } catch (error) {
    console.error("GET request failed:", error);
    throw error;
  }
};
