import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlice";

const productsAdapter = createEntityAdapter({
  selectId: (product) => product._id,
});
const initialState = productsAdapter.getInitialState();

export const productSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page = 1, type = "all", categoryId }) => {
        let url = `/api/v1/products?limit=20&page=${page}`;

        if (type === "deals") {
          url += "&priceAfterDiscount[gt]=0";
        } else if (type === "bestsellers") {
          url += "&sort=-sold&sold[gt]=0";
        } else if (type === "category") {
          url = `/api/v1/categories/${categoryId}/products?limit=20&page=${page}`;
        } else if (type === "wishlist") {
          url = `/api/v1/wishlist`;
        }

        return {
          url,
          method: "GET",
        };
      },

      transformResponse: (response, meta, { type }) => {
        if (type === "deals") {
          response.data =
            response?.data?.sort((a, b) => {
              const discountA = a.price - a.priceAfterDiscount;
              const discountB = b.price - b.priceAfterDiscount;
              return discountB - discountA;
            }) || [];
        }

        response.data = productsAdapter.setAll(initialState, response.data);

        return response;
      },

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await queryFulfilled;
      },

      providesTags: (result, error, arg) => {
        if (result?.data?.ids) {
          return [
            { type: "Product", id: "LIST" },
            ...result.data.ids.map((id) => ({ type: "Product", id })),
          ];
        } else {
          return [{ type: "Product", id: "LIST" }];
        }
      },

      //  Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpoints, queryArgs }) => {
        return {
          endpoints,
          type: queryArgs.type,
          categroy: queryArgs.categoryId,
        };
      },

      //  Always merge incoming data to the cache entry
      merge: (cachedData, responseData) => {
        productsAdapter.upsertMany(cachedData.data, responseData.data.entities);
        // cachedData.data.push(...responseData.data);
        cachedData.paginationResult = responseData.paginationResult;
        cachedData.results += responseData.results;
      },

      //  Only refetch when the page number changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg.page > (previousArg?.page || 1);
      },
    }),

    getProduct: builder.query({
      query: (productId) => ({
        url: `/api/v1/products/${productId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useLazyGetProductsQuery,
} = productSlice;

export const {
  selectIds: selectProductsIds,
  selectAll: selectAllProducts,
  selectById: selectProductById,
} = productsAdapter.getSelectors((state) => state.productSlice ?? initialState);

//  we can use this technique if we don't update the cached data
// const selectProductsResult = productSlice.endpoints.getProducts.select();

// const selectProductsData = createSelector(
//   selectProductsResult,
//   (productsResult) => productsResult.data
// );

// export const {
//   selectIds: selectProductsIds,
//   selectAll: selectAllProducts,
//   selectById: selectProductById,
// } = productsAdapter.getSelectors(
//   (state) => selectProductsData(state) ?? initialState
// );
