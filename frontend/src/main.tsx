import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import client from "./lib/apolloClient";
import Projects from "./features/projects/pages/Projects"; // Your projects component
import App from "./App"; // Your home component
import "./index.css";
import AppShell from "./components/layout/AppShell";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/projects" element={
            <AppShell>
              <Projects />
            </AppShell>
          } />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
