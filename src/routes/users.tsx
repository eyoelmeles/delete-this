import {Form, useLoaderData, useNavigate} from "react-router-dom";
import UsersTable from "../component/users-table";
import { getUsers } from "../utils/users";
import {Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material"

export async function loader({ params }) {
	const users = await getUsers(2, 6)
	return users;
}

export default function User() {
	const { users, isPermitted } = useLoaderData();
	const navigate = useNavigate();
	return (
		<div id="contact">
			<UsersTable users={users} />
		</div>
	)
}