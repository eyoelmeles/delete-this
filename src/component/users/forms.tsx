 import React from "react";
 import {Card, CardContent, Button, Typography, TextField, Checkbox, Radio, CircularProgress, FormControlLabel } from "@mui/material";
 import { Formik, Field, FieldAttributes, useField, FieldArray } from "formik";
//  import * as yup from "yup";
import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { createUser } from "../../utils/users";

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await createUser(updates);
  return redirect(`/users`);
}
 
//  const fakeLoading = (time: number) => new Promise((resolve) => setTimeout(resolve, time));
 
//  const validationScheme = yup.object({
// 	 fullName: yup.string().min(4, "Name must have at least 4 characters"),
// 	 userName: yup.string().min(4, "Name must have at least 4 characters"),
// 	 email: yup.string(),
// 	 password:  yup.string().required("Please enter your password").matches(
// 		 /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
// 		 "Password must contain at least 8 characters, one uppercase, one number and one special case character"
// 	 ),
// 	 visitedCountries: yup.array().of(yup.object({
// 		 country: yup.string().required("You need to provide the country"),
// 		 city: yup.string().required("You Should know which city you were in")
// 	 }))
//  });
 
 const CreateUserInputs = () => {
	const users = useLoaderData();
	const navigate = useNavigate();
	 return (
		 <div>
			 <Card sx={{margin: 4, padding: 2}}>
				 <CardContent>
					 <Typography variant="h4">Form Inputs Handled</Typography>
					 <Formik initialValues={{
						 ...users
					 }} onSubmit={async (values, {setSubmitting}) => { 
						 setSubmitting(true);
						//  await fakeLoading(4000);
						 console.log("-- Values --\n", values );
						 navigate("/users")
						 setSubmitting(false);
					 }}
					//  validationSchema={validationScheme}
						 // validate={values => {
						 //     const errors: Record<string, string> = {};
 
						 //     if (values.fullName.includes("bob")) {
						 //         errors.fullName = "no bob"
						 //     }
 
						 //     return errors
						 // }}
									 
					 >
						 {({ values, errors, isSubmitting, handleSubmit }) => (
							 <Form onSubmit={handleSubmit} method="post">
								 {/* or we can use the good old input method */}
								 {/* <TextField name="userName" onChange={handleChange} onBlur={handleBlur} value={values.userName} placeholder="username" /> */}
								 {/* <TextField name="password" type="passowrd" onChange={handleChange} onBlur={handleBlur} value={values.password} placeholder="password" /> */}
								 <div>
									 <MyTextField name="fullname" type="input" label="Full Name" placeholder="Full Name" />
								 </div>
								 <div>
									 <MyTextField name="username" type="input" label="Username" placeholder="username" />
								 </div>
								 <div>
									 <MyTextField name="email" type="input" label="Email" placeholder="E.x email@email.com" />
								 </div>
								 <div>
									 <MyTextField name="phoneno" type="input" label="Phone Number" placeholder="+251 ..." />
								 </div>
								 <div>
									 <MyTextField name="password" type="password" label="Password" placeholder="Password" />
								 </div>
								 <div>
									 <MyTextField name="re-password" type="password" label="Repeat Password" placeholder="Repeat Password" />
								 </div>
								 {/* <div>
									 <Field name="agree" type="checkbox" as={Checkbox} /> Agree to terms and services
								 </div>
								 <div>
									 <Field name="gender" type="radio" value="male" as={Radio} /> Male
									 <Field name="gender" type="radio" value="female" as={Radio} /> Female
								 </div>
								 <div>
									 <Field name="programmingLanguages" type="checkbox" value="javascript" as={Checkbox} /> JavaScript
									 <Field name="programmingLanguages" type="checkbox" value="python" as={Checkbox} /> Python
								 </div> */}
								 <Typography variant="h6">Add Country</Typography>
								 {/* <FieldArray name="visitedCountries">
									 {(arrayHelper) => (
										 <div>
											 {values.visitedCountries.map((visits, index) => {
												 const countryName = `visitedCountries.${index}.country`;
												 const cityName = `visitedCountries.${index}.city`;
												 return (
													 <div key={visits.id}>
														 <MyTextField name={countryName} placeholder="Visited Country" label="Country Name" />{"\t\t"}
														 <MyTextField name={cityName} placeholder="Visited City" label="City Name" />
														 <Button onClick={() => {arrayHelper.remove(index);}}>Delete</Button>
													 </div>
												 );
											 })}
											 <Button variant="outlined" onClick={() => {
												 arrayHelper.push({
													 country: "",
													 city: "",
													 id: ""+Math.random()
												 });
											 }} sx={{marginTop: 2, marginBottom: 2}}>Add Visited Country</Button>
										 </div>
									 )}
								 </FieldArray> */}
 
								 <div>
									 <Button disabled={isSubmitting} variant="outlined" type="submit">
										 {isSubmitting ? <CircularProgress sx={{ fontSize: ".5rem", marginRight: 2 }} /> : null }
																			 Enter
									 </Button>
								 </div>
								 {/* <Typography variant="h4" sx={{fontFamily: "Inconsolata", marginTop: 2}}>Live Data</Typography>
								 <pre>{JSON.stringify(values, null, 2)}</pre>
								 <pre>{JSON.stringify(errors, null, 2)}</pre> */}
							 </Form>
						 )}
					 </Formik>
				 </CardContent>
			 </Card>
		 </div>
	 );
 };
 
 type MyRadioProps = { label: string } & FieldAttributes<{}>;
 
 export const CustomRadio: React.FC<MyRadioProps> = ({label, ...props}) => {
	 const [field] = useField<{}>(props);
	 return <FormControlLabel {...field} control={<Radio />} label={label} />;
 };
 
 export const MyTextField: React.FC<MyRadioProps> = ({placeholder, label ,...props}) => {
	 const [field, meta] = useField<{}>(props);
	 const errorText = meta.error && meta.touched ? meta.error : "";
	 return <TextField fullWidth placeholder={placeholder} {...field} label={label} helperText={errorText} error={!!errorText} variant="standard" />;
 };
 
 
 export default CreateUserInputs;