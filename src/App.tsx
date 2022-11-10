import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

const GetUsersConfig = {
	method: "GET",
	url: "/api/query",
	params: {
		query: `{
			return core.getusers(2, 5)
		}`,
		access_token: localStorage.getItem('token')
	}
}

function App() {
  const [count, setCount] = useState(0)
	
	useEffect(() => {
		axios(GetUsersConfig).then(res => {
			console.log("DATA ---", res.data)
		}).catch(err => {
			console.log(err);
		})
	}, [])
  return (
    <div className="App">
      hello
    </div>
  )
}

export default App
