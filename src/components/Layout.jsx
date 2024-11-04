import { Outlet } from "react-router-dom";

import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex flex-col w-screen">
      <Header />
      <Navbar />
      <Sidebar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
