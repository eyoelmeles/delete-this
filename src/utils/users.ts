import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

interface CreateUser {
		userName: string,
		fullName: string,
		email: string,
		phoneNo: string,
		password: string,
}

export async function getUsers ( initial: number, count: number ) {
	const GETUSERSCONFIG = {
		method: "GET",
		url: "/api/query",
		params: {
			query: `{
				return core.getusers(${initial}, ${count})
			}`,
			access_token: localStorage.getItem('token')
		}
	}
	const res = await axios(GETUSERSCONFIG);
	console.log("--- DATA ---\n", res.data)
	const users = res.data
	return users;
}

export async function hasPermitted () {
	// SYSTEM_ROOT, ACCOUNTTING_POST_ADJUSTMENT
	const ISUSERPERMITTED = {
		method: "GET",
		url: "/api/query",
		params: {
			query: `{
				uid:core.getuser(pars.user).id,
				pid:core.getpermissionbykey(pars.perm).id,
				return core.IsPermitted(uid,pid)
			}`,
			pars:JSON.stringify({
				user:'root',
				perm:'SYSTEM_ROOT'
			}),
			access_token: localStorage.getItem('token')
		}
	}
	const res = await axios(ISUSERPERMITTED);
	const isPermitted = res.data;
	return isPermitted
}

export async function getUser(username: string) {
	const GETUSERCONFIG = {
		method: "GET",
		url: "/api/query",
		params: {
			query: `{
				return core.getuser(pars.user)
			}`,
			pars:JSON.stringify({
				user: username,
			}),
			access_token: localStorage.getItem('token')
		}
	}

	const res = await axios(GETUSERCONFIG)
	const data = res.data;

	return data;
}

export async function getAllPermissions() {
	const GETALLPERMSCONFIG = {
		method: "GET",
		url: "/api/query",
		params: {
			query: `{
				return core.GetAllPermissions()
			}`,
			access_token: localStorage.getItem('token')
		}
	}
	const res = await axios(GETALLPERMSCONFIG);
	const allPerms = res.data;
	return allPerms;
}

export async function createUser(newUserData: CreateUser) {
	const newUser = {
		user: {
			// id: "cb925df1-58f7-4ce3-99c1-747bd0770703",
			id: uuidv4(),
			email: newUserData.email,
			enabled: true,
			fullname: newUserData.fullName,
			// passwordhash: {},
			passwordhash: newUserData.password.toString(),
			phoneno: newUserData.phoneNo,
			publicKey: null,
			time: Date.now(),
			// tranid: "268d0ff8-9d47-480a-82e3-0c0b22217414",
			tranid: uuidv4(),
			username: newUserData.userName,
			roles: null,
			rootroleid: null,
			rootpermissionid: null,
		}
	}
	console.log("*** create user data *** \n", newUser)
	const CREATEUSERCONFIG = {
		method: "POST",
		url: "/api/transaction",
		params: {
			system_id: "c0662424-ad91-439d-a260-ec22e39a51a9",
			access_token: localStorage.getItem('token'),
			tran_type: "SYS_CREATE_USER",
		},
		data: newUser,
	}
	// const res = await axios(UPDATEUSERCONFIG);
	// const updatedUser = res.data;
	const res = await axios(CREATEUSERCONFIG);
	console.log("REPLAYED FROM CREATE USER WITH --- \n", res.data)
	return res.data;
}

export async function deleteUser(deletedData) {
	const DELELTEUSERCONFIG = {
		method: "POST",
		url: "/api/transaction",
		params: {
			system_id: "c0662424-ad91-439d-a260-ec22e39a51a9",
			access_token: localStorage.getItem('token'),
			tran_type: "SYS_DELETE_USER",
		},
		data: deletedData,
	}
	const res = await axios(DELELTEUSERCONFIG)
	return res.data;
}

export async function updateUser(user) {
	console.log("*** UPDATED USER DATA *** \n", user);
	const UPDATEUSERCONFIG = {
		method: "POST",
		url: "/api/transaction",
		params: {
			system_id: "c0662424-ad91-439d-a260-ec22e39a51a9",
			access_token: localStorage.getItem('token'),
			tran_type: "SYS_UPDATE_USER",
		},
		data: user,
	}
	const res = await axios(UPDATEUSERCONFIG)
	console.log(" This is the servers response --- \n", res.data)
	return res.data;
}
