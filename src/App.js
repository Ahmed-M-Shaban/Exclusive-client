import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/404";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import Cart from "./features/cart/Cart";
import Wishlist from "./pages/Wishlist";
import Layout from "./components/Layout";
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
import ProductList from "./pages/ProductList";
import Checkout from "./features/cart/Checkout";
import Prefetch from "./features/auth/Prefetch";
import AuthWrapper from "./features/auth/AuthWrapper";
import RequireAuth from "./features/auth/RequireAuth";

const App = () => {
  return (
    <AuthWrapper>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<Prefetch />}>
            {/* start: public routes */}
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="products">
              <Route path=":id" element={<Product />} />
              <Route index element={<ProductList />} />
              <Route path="deals" element={<ProductList type="deals" />} />
              <Route
                path="bestsellers"
                element={<ProductList type="bestsellers" />}
              />
              <Route
                path="category/:id"
                element={<ProductList type="category" />}
              />
            </Route>
            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<About />} />
            {/* end: public routes */}

            {/* start: private routes */}
            <Route element={<RequireAuth />}>
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            {/* end: private routes */}

            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </AuthWrapper>
  );
};

export default App;

// App.js
// import React from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import Layout from "./components/Layout";
// import Home from "./pages/Home";
// import Contact from "./pages/Contact";
// import About from "./pages/About";
// import Signup from "./features/auth/Signup";
// import Wishlist from "./pages/Wishlist";
// import Cart from "./features/cart/Cart";
// import Profile from "./pages/Profile";
// import Login from "./features/auth/Login";
// import Checkout from "./features/cart/Checkout";
// import NotFound from "./pages/404";
// import Product from "./pages/Product";
// import ProductList from "./pages/ProductList";
// import AuthWrapper from "./features/auth/AuthWrapper";
// import Prefetch from "./features/auth/Prefetch";
// import RequireAuth from "./features/auth/RequireAuth";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <AuthWrapper>
//         <Layout />
//       </AuthWrapper>
//     ),
//     children: [
//       {
//         element: <Prefetch />,

//         errorElement: <NotFound />,

//         children: [
//           // Public routes
//           { index: true, element: <Home /> },
//           { path: "login", element: <Login /> },
//           { path: "signup", element: <Signup /> },
//           {
//             path: "products",
//             children: [
//               { path: ":id", element: <Product /> },
//               { index: true, element: <ProductList /> },
//               { path: "deals", element: <ProductList type="deals" /> },
//               {
//                 path: "bestsellers",
//                 element: <ProductList type="bestsellers" />,
//               },
//               {
//                 path: "category/:id",
//                 element: <ProductList type="category" />,
//               },
//             ],
//           },
//           { path: "contact", element: <Contact /> },
//           { path: "about", element: <About /> },

//           // Private routes
//           {
//             element: <RequireAuth />,
//             children: [
//               { path: "wishlist", element: <Wishlist /> },
//               { path: "cart", element: <Cart /> },
//               { path: "checkout", element: <Checkout /> },
//               { path: "profile", element: <Profile /> },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ]);

// function App() {
//   return <RouterProvider router={router} />;
// }

// export default App;
