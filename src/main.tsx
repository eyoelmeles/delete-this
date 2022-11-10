import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from './error-page';
import User, { loader as userLoader } from './routes/user';
import Root, { loader as rootLoader } from "./routes/root"
import Users from './routes/users';
import { action as deleteAction } from './component/users/deleteUser';
import UpdateUser, { updateUserAction } from './component/users/updateUser';
import CreateUser, { action as createAction } from './component/users/createUser';
import ResponsiveAppBar from './component/appbar';

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		loader: rootLoader,
		children: [
			{
				path: "/users",
				element: <Users />,
				loader: rootLoader,
			},
			{
				path: "user/:username",
				element: <User />,
				loader: userLoader,
			},
			{
				path: "user/:username/edit",
				element: <UpdateUser />,
				loader: userLoader,
				action: updateUserAction,
			},
			{
				path: "user/:username/delete",
				loader: userLoader,
				action: deleteAction,
			},
			{
				path: "/user/create",
				element: <CreateUser />,
				action: createAction,
			},
		]
	},
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
		<div>
				<ResponsiveAppBar />
				<RouterProvider router={router} />
		</div>
  </React.StrictMode>
)
