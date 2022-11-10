import React, {useContext} from 'react'
import { updateUser } from '../../utils/users';
import { Form, useLoaderData, redirect, useNavigate, useLocation } from "react-router-dom";
import {Button, TextField} from "@mui/material";

export async function updateUserAction({ request, params }) {
	console.log("DD GOT HERE");
	// const { user } = useContext(UserContext);
	const formData = await request.formData();
  const updates = { userInfo: Object.fromEntries(formData), };
	console.log("THESE ARE THE UPDATES \n",updates);
  await updateUser(updates);
  return redirect(`/user/${params.username}`);
}

export default function UpdateUser() {
	const { state } = useLocation();

	const navigate = useNavigate();
  return (
    <Form method="post" id="contact-form">
        <label>
        <span>Full Name</span>
      </label>
				<TextField name="fullname" type="text" placeholder='Full Name' defaultValue={state.user.fullname} />
				
      <label>
        <span>Email</span>
        {/* <input
          type="email"
          name="email"
          placeholder="email"
					defaultValue={state.user.email}
        /> */}
      </label>
			<TextField name="email" placeholder='Email' defaultValue={state.user.email} />
      <label>
        <span>Phone No</span>
        {/* <input
          placeholder="phone no"
          aria-label="Phone number"
          type="text"
          name="phoneNo"
					defaultValue={state.user.phoneno}
        /> */}
      </label>
				<TextField name="phoneno" type="text" placeholder='phone number' defaultValue={state.user.phoneno} />
      {/* <label>
        <span>Password</span>
        <input
          placeholder="password"
          aria-label="password"
          type="password"
          name="password"
        />
      </label> */}
				<input name="id" value={state.user.id} hidden/>
				<input name="tranid" value={state.user.tranid} hidden />
				<input name="time" value={state.user.time} hidden />
				<input name="username" value={state.user.username} hidden />
				<input name="publickey" value={state.user.publickey} hidden />
				{/* <input name="roles" type="select" value={state.user.roles} hidden /> */}
				<select name="roles" hidden>
          {state.user.roles.map(role => {
            <option value={role}></option>
          })}
				</select>
				<input name="password" value={state.user.passwordhash} hidden />
				<input name="enabled" value={state.user.enabled} hidden />
        <Button type="submit" variant="outlined">Update</Button>
        <Button type="button" variant="text" onClick={() => navigate("/users")}>Cancel</Button>
      <p>
      </p>
    </Form>
  );
}