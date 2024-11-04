import { toast } from "react-toastify";

import { apiSlice } from "../apiSlice";
import { handleError } from "../../utils";

export const wishlistSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: (id) => ({
        url: "/api/v1/wishlist",
        method: "GET",
      }),

      providesTags: ["Wishlist"],

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          if (error.error.status === 401)
            toast.error("You must be logged in to see your wishlist");
        }
      },
    }),

    addToWishlist: builder.mutation({
      query: ({ productId }) => ({
        url: "/api/v1/wishlist",
        method: "POST",
        body: { product: productId },
      }),

      invalidatesTags: ["Wishlist"],

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const postResult = dispatch(
          wishlistSlice.util.updateQueryData(
            "getWishlist",
            "newWishlist",
            (draft) => {
              if (draft?.wishlistItems?.length) {
                const productIndex = draft.wishlistItems.findIndex(
                  (item) =>
                    item.product._id.toString() === arg.productId.toString()
                );
                if (productIndex > -1) {
                  draft.wishlistItems[productIndex].quantity += 1;
                } else {
                  draft.wishlistItems.push({
                    product: {
                      _id: arg.productId,
                    },
                    quantity: 1,
                    _id: arg.productId,
                  });
                }
              }
            }
          )
        );

        try {
          await queryFulfilled;
          toast.info("item added to wishlist");
        } catch (error) {
          postResult.undo();
          handleError(error);
          toast.error(error.error.data.message || "Oops, something went wrong");
        }
      },
    }),

    removeFromWishlist: builder.mutation({
      query: (productId) => ({
        url: `/api/v1/wishlist/${productId}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Wishlist"],

      async onQueryStarted(productId, { dispatch, queryFulfilled }) {
        const deleteResult = dispatch(
          wishlistSlice.util.updateQueryData(
            "getWishlist",
            "newWishlist",
            (draft) => {
              const productIndex = draft.wishlistItems.findIndex(
                (item) => item._id.toString() === productId.toString()
              );

              console.log(productIndex);
              if (productIndex > -1) {
                draft.wishlistItems.splice(productIndex, 1);
              }
            }
          )
        );

        try {
          await queryFulfilled;
        } catch (error) {
          deleteResult.undo();
          handleError(error);
          toast.error(
            error?.error?.data?.message || "Oops, something went wrong"
          );
        }
      },
    }),

    clearWishlist: builder.mutation({
      query: () => ({
        url: "/api/v1/wishlist",
        method: "DELETE",
      }),

      // invalidatesTags: ["Wishlist"],

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(
            wishlistSlice.util.updateQueryData(
              "getWishlist",
              "newWishlist",
              (draft) => {
                draft.wishlistItems = [];
                draft.totalWishlistPrice = 0;
                draft.totalPriceAfterDiscount = 0;
                draft.coupon = null;
              }
            )
          );
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useChangeQuantityMutation,
  useApplyCouponMutation,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useClearWishlistMutation,
} = wishlistSlice;
