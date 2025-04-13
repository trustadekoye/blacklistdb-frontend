import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ScamReportsProvider } from "./context/ScamReportsContext.tsx";
import { BlogProvider } from "./context/BlogContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ScamReportsProvider>
      <BlogProvider>
        <App />
      </BlogProvider>
    </ScamReportsProvider>
  </StrictMode>
);
