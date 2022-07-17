import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
//import Notes from "./components/Notes";
import Contact from "./components/Contact/Contact";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import PageNotFound from "./components/PageNotFound/PageNotFound";
//import Profile from "./components/Profile/Profile";
import AuthProvider from "./context/Auth";
import RequireAuth from "./components/RequireAuth";
const LazyNotes = React.lazy(() => import("./components/Notes/Notes"));

export default function App() {
  return (
    <main>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="notes"
            element={
              <React.Suspense fallback="Loading...">
                <LazyNotes />
              </React.Suspense>
            }
          >
            <Route
              path=":note"
              element={
                <React.Suspense fallback="Loading...">
                  <LazyNotes />
                </React.Suspense>
              }
            />
          </Route>
          <Route
            path="/contact"
            element={
              <RequireAuth>
                <Contact />
              </RequireAuth>
            }
          />
          <Route path="*" element={<PageNotFound />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </AuthProvider>
    </main>
  );
}
