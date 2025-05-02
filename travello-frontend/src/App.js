import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Favorites from "./pages/Favorites";
import CardDetail from "./pages/CardDetail";
import About from "./pages/About";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";
import GlobalProvider from "./routes/GlobalProvider";
import ResetPassword from "./pages/ResetPassword";
import PrivateRoute from "./routes/PrivateRoute";

const App = () => {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/account"
            element={
              <PrivateRoute>
                <Account />
              </PrivateRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog-detail/:id" element={<BlogDetail />} />
          <Route path="/card-detail/:id" element={<CardDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
};

export default App;
