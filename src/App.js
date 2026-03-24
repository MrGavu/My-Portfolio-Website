import { createBrowserRouter } from 'react-router-dom';
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import { paths } from "./constants/paths.constants";
import Projects from "./pages/projects/Projects";

export const routes = createBrowserRouter([
  {
    element: <Home />,
    path: paths.HOME
  },
  {
    element: <About />,
    path: paths.ABOUT
  },
  {
    element: <Projects />,
    path: paths.PROJECTS
  }
])
