import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Layout from "./components/layout";
import HomePage from "./pages/home";
import AboutUsPage from "./pages/aboutUs";
import ContactUsPage from "./pages/contactUs";
import DonatePage from "./pages/donate";
import ScammerListPage from "./components/ScammersList";
import BlogPage from "./pages/blog";
import BlogPostDetail from "./components/BlogPostDetail";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Layout */}
        <Route path="/" element={<Layout />}>
          {/* Nested routes within the layout */}
          <Route index element={<HomePage />} />
          <Route path="aboutus" element={<AboutUsPage />} />
          <Route path="contactus" element={<ContactUsPage />} />
          <Route path="donate" element={<DonatePage />} />
          <Route path="scammerslist" element={<ScammerListPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogPostDetail />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
