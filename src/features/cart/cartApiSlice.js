import { toast } from "react-toastify";

import { apiSlice } from "../apiSlice";
import { handleError } from "../../utils";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: (id) => ({
        url: "/api/v1/cart",
        method: "GET",
      }),
      providesTags: ["Cart"],
      transformResponse: (responseData) => {
        const response = {
          ...responseData?.data,
          numberOfItems: responseData?.numberOfItems || 0,
        };
        return response;
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          if (error.error.status === 401)
            toast.error("You must be logged in to see your cart");
        }
      },
    }),

    changeQuantity: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: `/api/v1/cart/${productId}`,
        method: "PUT",
        body: { quantity },
      }),
      async onQueryStarted(
        { productId, quantity },
        { dispatch, queryFulfilled }
      ) {
        const putResult = dispatch(
          cartApiSlice.util.updateQueryData("getCart", "get-cart", (draft) => {
            // console.log(draft.cartItems.find((p) => p._id === productId));
            const product = draft.cartItems.find((p) => p._id === productId);
            // console.log(product);
            if (product) {
              draft.totalCartPrice +=
                (quantity - product.quantity) *
                (product.product.priceAfterDiscount || product.product.price);

              draft.totalPriceAfterDiscount =
                draft.coupon &&
                draft.totalCartPrice -
                  draft.totalCartPrice * (draft.coupon.discount / 100);

              product.quantity = quantity;

              product.price =
                quantity *
                (product.product.priceAfterDiscount || product.product.price);
            }
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          handleError(error);
          putResult.undo();
        }
      },
    }),

    applyCoupon: builder.mutation({
      query: (coupon) => ({
        url: "/api/v1/cart/applyCoupon",
        method: "PUT",
        body: coupon,
      }),
      async onQueryStarted({ coupon }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await toast.promise(queryFulfilled, {
            pending: "loading...",
            success: "Coupon applied successfully",
            error: {
              render({ data }) {
                return data.error.data.message;
              },
            },
          });

          dispatch(
            cartApiSlice.util.updateQueryData("getCart", "get-cart", (draft) => {
              draft.coupon = data.data.coupon;
              draft.totalPriceAfterDiscount = data.data.totalPriceAfterDiscount;
            })
          );
        } catch (error) {
          // handleError(error);
          // console.log(error);
        }
      },
    }),

    addToCart: builder.mutation({
      query: ({ productId }) => ({
        url: "/api/v1/cart",
        method: "POST",
        body: { product: productId },
      }),

      invalidatesTags: ["Cart"],

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const postResult = dispatch(
          cartApiSlice.util.updateQueryData("getCart", "get-cart", (draft) => {
            if (draft?.cartItems?.length) {
              const productIndex = draft.cartItems.findIndex(
                (item) =>
                  item.product._id.toString() === arg.productId.toString()
              );
              if (productIndex > -1) {
                draft.cartItems[productIndex].quantity += 1;
              } else {
                draft.cartItems.push({
                  product: {
                    _id: arg.productId,
                  },
                  quantity: 1,
                  _id: arg.productId,
                });
              }
            }
          })
        );

        try {
          await queryFulfilled;
          toast.info("item added to cart");
        } catch (error) {
          postResult.undo();
          handleError(error);
          toast.error(error.error.data.message || "Oops, something went wrong");
        }
      },
    }),

    removeFromCart: builder.mutation({
      query: (productId) => ({
        url: `/api/v1/cart/${productId}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Cart"],

      async onQueryStarted(productId, { dispatch, queryFulfilled }) {
        const deleteResult = dispatch(
          cartApiSlice.util.updateQueryData("getCart", "get-cart", (draft) => {
            const productIndex = draft.cartItems.findIndex(
              (item) => item._id.toString() === productId.toString()
            );

            console.log(productIndex);
            if (productIndex > -1) {
              draft.cartItems.splice(productIndex, 1);
            }
          })
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

    clearCart: builder.mutation({
      query: () => ({
        url: "/api/v1/cart",
        method: "DELETE",
      }),

      // invalidatesTags: ["Cart"],

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(
            cartApiSlice.util.updateQueryData("getCart", "get-cart", (draft) => {
              draft.cartItems = [];
              draft.totalCartPrice = 0;
              draft.totalPriceAfterDiscount = 0;
              draft.coupon = null;
            })
          );
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useGetCartQuery,
  useChangeQuantityMutation,
  useApplyCouponMutation,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} = cartApiSlice;
