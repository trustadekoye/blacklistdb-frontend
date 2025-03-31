import React from "react";
import Navbar from "./global/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./global/Footer";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Outlet will render the child routes/pages */}
      <main className="flex-grow pt-16">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
