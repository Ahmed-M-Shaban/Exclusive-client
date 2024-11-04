import { toast } from "react-toastify";

import { apiSlice } from "../apiSlice";
import { logOut, setCredentials } from "./authSlice";
import { handleError } from "../../utils";
import { cartApiSlice } from "../cart/cartApiSlice";
import { wishlistSlice } from "../wishlist/wishlistSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { token: accessToken } = data;
          dispatch(setCredentials({ accessToken }));
        } catch (error) {
          handleError(error);
        }
      },
    }),

    signup: builder.mutation({
      query: (credentials) => ({
        url: "/api/v1/auth/signup",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { token: accessToken } = data;
          dispatch(setCredentials({ accessToken }));
        } catch (error) {
          handleError(error);
        }
      },
    }),

    refresh: builder.mutation({
      query: () => ({
        url: "/api/v1/auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { token: accessToken } = data;
          dispatch(setCredentials({ accessToken }));
        } catch (error) {
          handleError(error);
        }
      },
    }),

    sendLogout: builder.mutation({
      query: () => ({
        url: "/api/v1/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await toast.promise(queryFulfilled, {
            pending: "Logging out...",
            success: "Logged out successfully",
            error: {
              render({ data }) {
                return data.data.message;
              },
            },
          });

          dispatch(logOut());
          setTimeout(() => {
            //  The resetApiState utility function clears all cached data, error states, and request statuses associated with the API slice
            // dispatch(apiSlice.util.resetApiState());
            dispatch(cartApiSlice.util.resetApiState());
            dispatch(wishlistSlice.util.resetApiState());
          }, 100);
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useRefreshMutation,
  useSendLogoutMutation,
} = authApiSlice;
