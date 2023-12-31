import { createBrowserRouter } from "react-router-dom";
import ArticleDetail from "./pages/ArticleDetail";
import ArticleList from "./pages/ArticleList";
import ArticleWrite from "./pages/ArticleWrite";
import ArticleModify from "./pages/ArticleModify";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Mypage from "./pages/Mypage";
import Signup from "./pages/Signup";
import Trade from "./pages/Trade";
import Root from "./root";
import NotFound from "./pages/NotFound";
import SideBar from "./components/article/SideBar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Main />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "trade",
        element: <Trade />,
        children: [{ path: ":tradeId", element: <Trade /> }],
      },
      {
        path: "article",
        element: <SideBar />,
        children: [
          {
            path: "",
            element: <ArticleList />,
          },
        ],
      },
      {
        path: "article/:articleId",
        element: <ArticleDetail />,
      },
      {
        path: "article/write",
        element: <ArticleWrite />,
      },
      {
        path: "article/modify/:articleId",
        element: <ArticleModify />,
      },
      {
        path: "mypage",
        element: <Mypage />,
      },
    ],
  },
  {
    path: "login/oauth2/code/google",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
