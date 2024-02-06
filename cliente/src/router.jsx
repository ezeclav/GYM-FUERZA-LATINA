import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import AuthRoutes from "./routes/AuthRoutes";
import UserRoutes from "./routes/UserRoutes";
import NewExercisePage from "./pages/NewExercise/NewExercise";
import ExerciseList2 from "./pages/ExerciseList/ExerciseList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "auth/*",
        element: <AuthRoutes />,
      },
      {
        path: "user/*",
        element: <UserRoutes />,
      },
      {
        path: "/newExercise",
        element: <NewExercisePage />,
      },
      {
        path: "/exercises",
        element: <ExerciseList2 />,
      },
    ],
  },
]);

export default router;
