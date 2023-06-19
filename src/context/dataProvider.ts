import simpleRestProvider from "ra-data-simple-rest";
import { useClient } from "./client";

export const dataProvider = simpleRestProvider(
  import.meta.env.VITE_SIMPLE_REST_URL
);

export function useDataProvider() {
  const client = useClient();

  const httpClient = async (url, options = {}) => {
    console.log({ ...options, url });
    const {
      status,
      headers,
      data,
      data: json,
    } = await client({ ...options, headers: undefined, url });
    console.log("fetchJson result", {
      status,
      headers,
      body: JSON.stringify(data),
      json,
    });
    return { status, headers, body: JSON.stringify(data), json };
  };

  return simpleRestProvider(import.meta.env.VITE_SIMPLE_REST_URL, httpClient);
}
