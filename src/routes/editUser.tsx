import { Formik } from 'formik'
import React from 'react'
import { Form, useLoaderData, redirect } from 'react-router-dom'
import { getUser, updateUser } from '../utils/users';

export async function editAction({ request, params }) {
  console.log("*** GOT HERE ***")
	const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const data = await updateUser(updates);
	console.log("--- UPDATED USER --- \n", data)
  return redirect(`/user/${params.username}`);
}

function EditUser() {
	const user = useLoaderData();
	console.log("USER FOR EDIT, --- \n",user)
	return (
		<div>
					<Form method="post" id="contact-form">
						<input id="q" name="username" placeholder="Username"  defaultValue={user.username} />
						<input id="q" name="fullname" placeholder="Fullname" defaultValue={user.fullname} />
						<input id="q" type="email" name="email" placeholder="Email" defaultValue={user.email} />
						<input id="q" type="number" name="phoneno" placeholder="Phone Number" defaultValue={user.phoneno} />
						<button type="submit">Update</button>
					</Form>
					<div>
					{/* <Form method="POST" action="destroy" onSubmit={(event) => {
						if (
							!confirm("Please confirm you want to delete this record")
						) {
							event.preventDefault();
						}
					}}>	
						<button type="submit">Delete</button>
					</Form> */}
				</div>
		</div>
	)
}

export default EditUser