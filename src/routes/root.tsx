import { Outlet, useLoaderData, useNavigation } from "react-router-dom"
import Sidebar from "../component/sidebar";
import { getAllPermissions, getUsers, hasPermitted } from "../utils/users";

export async function loader() {
	const users = await getUsers(2, 10);
	const isPermitted = await hasPermitted();
	const allPerms = await getAllPermissions();
	return { users, isPermitted, allPerms }
}

export default function Root() {
	const { users, isPermitted, allPerms } = useLoaderData();
	const navigation = useNavigation();

	return (
		<div id="rootContainer">
			<Sidebar />
			<div id="detail" className={
				navigation.state === "loading" ? "loading" : ""
			}>
					<Outlet />
			</div>
		</div>
	)
}