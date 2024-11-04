import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "./auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000",
  credentials: "include", // Send cookies with requests
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403 && api.endpoint !== "refresh") {
    const refreshTokenResult = await baseQuery(
      "/api/v1/auth/refresh",
      api,
      extraOptions
    );

    if (refreshTokenResult?.data?.token) {
      api.dispatch(
        setCredentials({ accessToken: refreshTokenResult.data.token })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshTokenResult?.error?.status === 403) {
        refreshTokenResult.error.data.message = "Your session has expired.";
      }

      return refreshTokenResult;
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Cart", "Product"],
  endpoints: (builder) => ({}),
});
