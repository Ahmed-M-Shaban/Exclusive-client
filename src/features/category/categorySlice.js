import { apiSlice } from "../apiSlice";

export const categorySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: "/api/v1/categories?sort=createdAt",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCategoriesQuery } = categorySlice;
