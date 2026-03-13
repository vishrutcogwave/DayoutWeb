import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Outlet /> {/* This renders the current route component */}
      <Footer />
    </>
  );
};

export default Layout;