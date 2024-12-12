import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { setUser } from './store/actions/authActions';
import axios from 'axios';
import StandarLayout from './Layouts/StandarLayout';
import SignRoute from './Components/SignRoute.jsx';
import Home from './Pages/Home.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import NotFound from './Pages/NotFound.jsx';
import DashBoard from './Pages/DashBoard.jsx';
import AdminRoute from "./Components/AdminRoute.jsx";
import Mangas from './Pages/Mangas.jsx';
import MangasAuth from './Pages/MangasAuth.jsx';
import NewRole from './Pages/NewRole.jsx';
import PrivateRoute from './Components/PrivateRoute.jsx';
import CreateAuthor from './Pages/CreateAuthor.jsx';
import CreateCompany from './Pages/CreateCompany.jsx';
import CreateManga from './Pages/CreateManga.jsx';
import CreateChapter from './Pages/CreateChapter.jsx';
import EditAuthor from './Pages/Profile.jsx';
import EditChapter from './Pages/EditChapter.jsx';
import AuthorCompanyRoute from './Components/AuthorCompanyRoute.jsx';
import MangaDetails from './Pages/MangaDetails.jsx';
import Chapter from './Pages/Chapter.jsx';
import ChapterList from './Components/ChapterList.jsx';

const router = createBrowserRouter([
  {
    element: <StandarLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/mangas", element: <PrivateRoute><Mangas /></PrivateRoute> },
      { path: "/mangas-manager", element: <PrivateRoute><AuthorCompanyRoute><MangasAuth /></AuthorCompanyRoute></PrivateRoute>},
      { path: "/manga-details/:id/:newIndex", element: <PrivateRoute><MangaDetails /></PrivateRoute> },
      { path: "/chapter/:id/:newIndex", element: <PrivateRoute><Chapter /></PrivateRoute> },
      { path: "/chapterlist/:id/:newIndex", element: <PrivateRoute><ChapterList /></PrivateRoute> },

      { path: "/register", element: <SignRoute><Register /></SignRoute> },
      { path: "/login", element: <SignRoute><Login /></SignRoute> },
      { path: "/dashboard", element: <AdminRoute><DashBoard /></AdminRoute> },

      { path: "/newrole", element: <PrivateRoute><NewRole /></PrivateRoute> },
      { path: "/createauthor", element: <PrivateRoute><CreateAuthor /></PrivateRoute> },
      { path: "/createcompany", element: <PrivateRoute><CreateCompany /></PrivateRoute> },
      { path: "/createmanga", element: <PrivateRoute><CreateManga /></PrivateRoute> },
      { path: "/profile", element: <PrivateRoute><EditAuthor /></PrivateRoute> },
      { path: "/createchapter/:id/", element: <PrivateRoute><CreateChapter /></PrivateRoute> },
      { path: "/editmanga/", element: <PrivateRoute><EditChapter /></PrivateRoute> },
      
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const validateToken = async (token) => {
  try {
    const response = await axios.get("http://localhost:8080/api/users/validateToken", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.response;
  } catch (error) {
    console.error("Error validating the token", error);
    return null;
  }
};

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      validateToken(token).then((user) => {
        if (user) {
          dispatch(setUser({ user, token }));
        }
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;