export const cx = (...classNames: string[]): string => classNames.join(" ");

// const apiUrl = "http://localhost:3201/api";

// before publishing in prod use /api
const apiUrl = "/api";

interface RequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
}

export const callRequest = async <T>(
  url: string,
  method: string = "GET",
  privateKey: string = "",
  requestParams: Record<string, any> = {},
  options: RequestOptions = {},
  bodyData: Record<string, any> = {}
): Promise<T | undefined> => {
  try {
    // Construct the final URL by appending query parameters if the requestParams object is not empty
    const queryString =
      Object.keys(requestParams).length > 0
        ? `?${new URLSearchParams(requestParams).toString()}`
        : "";

    const requestConfig = {
      method,
      headers: {
        PRIVATEKEY: privateKey,
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: JSON.stringify(bodyData),
    };

    const response = await fetch(
      `${apiUrl}${url}${queryString}`,
      requestConfig
    );

    if (!response.ok) {
      throw new Error(
        `Fetch error: ${response.status} - ${response.statusText}`
      );
    }

    console.log("response is", response);

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
