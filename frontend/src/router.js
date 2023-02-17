import { createBrowserRouter } from "react-router-dom";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Welcome from "./pages/Welcome";
import Users from "./pages/Users";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import ApiService from "./services/api-service";
import Teams from "./pages/Teams";

const createLoader = (endpoint) => async () => {
    return ApiService.get(endpoint);
}

export const createRouter = (authCtx) => {

    if (authCtx.isLoggedIn === false) {
        return createBrowserRouter([
            {
                path: '*',
                element: <Login/>,
                loader: async () => {
                    return ApiService.loginHandler(authCtx)
                },
                errorElement: <Error/>
            },
        ])
    }

    return createBrowserRouter([
        {
            path: '/',
            element: <Dashboard/>,
            errorElement: <Error/>,
            children: [
                {
                    index: true,
                    element: <Welcome/>
                },
                {
                    path: 'users',
                    loader: createLoader('users'),
                    element: <Users/>
                },
                {
                    path: 'teams',
                    loader: createLoader('teams'),
                    element: <Teams/>
                },
                {
                    path: 'projects',
                    loader: createLoader('projects'),
                    element: <Projects/>
                },
                {
                    path: 'tasks',
                    loader: createLoader('tasks'),
                    element: <Tasks/>
                }
            ]
        }
    ])
}