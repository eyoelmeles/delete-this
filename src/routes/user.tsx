import {Form, useLoaderData, redirect, useLocation, useNavigate} from "react-router-dom";
import UsersTable from "../component/users-table";
import { getUser } from "../utils/users";
import { Button, Typography } from "@mui/material";
export async function loader({ params }) {
	const user = await getUser(params.username)
	return user;
}

export default function User() {
	const user = useLoaderData();
	const navigate = useNavigate();
	return (
		<div id="contact">
			<div>
				<h1>{user?.fullname || "No Name"}</h1>
					<small>
						{user?.email}
					</small>
				<div>
					<Button onClick={() => navigate(`/user/${user.username}/edit`, {state: {user}})}>Update</Button>
				<Form
                method="post"
                action="delete"
                onSubmit={(event) => {
                  if (
                    !confirm(
                      "Please confirm you want to delete this record."
                    )
                  ) {
                    event.preventDefault();
                  }
                }}
              >
                <input name="id" value={user.id} hidden/>
                <input name="fullname" value={user.fullname} hidden/>
                <input name="email" value={user.email} hidden/>
                <input name="phoneno" value={user.phoneno} hidden/>
                <input name="tranid" value={user.tranid} hidden />
                <input name="time" value={user.time} hidden />
                <input name="username" value={user.username} hidden />
                <input name="publickey" value={user.publickey} hidden />
                <input name="roles" type="select" value={user.roles} hidden />
                {/* <select name="roles" hidden>
                  <option value={user.roles}></option>
                </select> */}
                <input name="passwordhash" value={user.passwordhash} hidden />
                <input name="enabled" value={user.enabled} hidden />
                <Button type="submit" color="error">Delete</Button>
              </Form>
				</div>
			</div>
		</div>
	)
}
