import { redirect } from "react-router-dom";
import { deleteUser } from "../../utils/users";

export async function action({ request, params }) {
  console.log("*** GOT HERE ***")
	const formData = await request.formData();
	const userid = formData.get("id");
  const deletedUserData = {
		userid,
		deleteduser: Object.fromEntries(formData),
	};
	await deleteUser(deletedUserData);
  return redirect("/users/");
}