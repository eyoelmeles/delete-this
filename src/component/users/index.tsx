import React from 'react'
import {Formik} from "formik";
import {Form} from 'react-router-dom';

function CreateUser() {
	return (
		<div>
			<Formik>
				{({}) => (
					<Form>
						<div>
						first name
						<input id="q" placeholder="First name" name="firstname" /> 
						</div>
						<div>
						last name
						<input id="q" placeholder="Lanst name" name="lastname" /> 
						</div>
						<div>
						email
						<input id="q" placeholder="Email" name="email" type="email" /> 
						</div>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default CreateUser