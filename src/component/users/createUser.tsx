import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { createUser } from "../../utils/users";

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await createUser(updates);
  return redirect(`/users`);
}

export default function CreateUser() {
	const navigate = useNavigate();
  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Full Name</span>
        <input
          placeholder="Full Name"
          aria-label="Full Name"
          type="text"
          name="fullName"
          // defaultValue={}
        />
				<span>User Name</span>
        <input
          placeholder="Username"
          aria-label="user name"
          type="text"
          name="userName"
        />
      </p>
      <label>
        <span>Email</span>
        <input
          type="email"
          name="email"
          placeholder="email"
        />
      </label>
      <label>
        <span>Phone No</span>
        <input
          placeholder="phone no"
          aria-label="Phone number"
          type="text"
          name="phoneNo"
        />
      </label>
      <label>
        <span>Password</span>
        <input
          placeholder="password"
          aria-label="password"
          type="password"
          name="password"
        />
      </label>
      <p> 
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate("/users")}>Cancel</button>
      </p>
    </Form>
  );
}