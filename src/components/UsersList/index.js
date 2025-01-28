import {useState, useEffect} from 'react'

import './index.css'

const UsersList = () => {
  const [samuser, setSamUser] = useState([])
  const url = 'https://jsonplaceholder.typicode.com/users'
  const [users, setUsers] = useState([])
  const [table, setTable] = useState(true)
  const [update, setUpdate] = useState(false)
  const [updateduser, setUpdateduser] = useState([])
  const [add, setAdd] = useState(false)
  const [err, setErr] = useState('')
  const fetchUsers = async () => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      setUsers(data)
    } catch (er) {
      setErr('Failed to fetch users.')
    }
  }
  const updateButton = eachUser => {
    setUpdateduser(eachUser)
    setTable(false)
    setUpdate(true)
    setAdd(false)
  }
  const handleChange = e => {
    setUpdateduser({...updateduser, [e.target.name]: e.target.value})
  }
  const handleAddUser = e => {
    setSamUser({...samuser, [e.target.name]: e.target.value})
  }
  const EditUser = async id => {
    try {
      const method = 'PUT'
      const apiUrl = `${url}/${id}`
      const response = await fetch(apiUrl, {
        method,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updateduser),
      })
      const userupdated = await response.json()
      setUsers(users.map(user => (user.id === id ? userupdated : user)))
    } catch (er) {
      setErr('Failed to fetch users.')
    }
    setUpdate(false)
    setTable(true)
    setAdd(false)
  }
  const HandleAdd = () => {
    setTable(false)
    setUpdate(false)
    setAdd(true)
  }
  const AddUser = async () => {
    try {
      const method = 'POST'
      const response = await fetch(url, {
        method,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(samuser),
      })
      const updatedUser = await response.json()
      setUsers([...users, {...updatedUser, id: users.length + 1}])
    } catch (er) {
      setErr('Failed to add user')
    }
    setTable(true)
    setUpdate(false)
    setAdd(false)
  }
  const deleteUser = async id => {
    try {
      await fetch(`${url}/${id}`, {method: 'DELETE'})
      setUsers(users.filter(user => user.id !== id))
    } catch (er) {
      setErr('Failed to delete user.')
    }
  }
  useEffect(() => {
    fetchUsers()
  }, [])
  return (
    <div>
      {table && (
        <div className="table-container">
          {err && <p style={{color: 'red'}}>{err}</p>}
          <h1>Users List</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>DEPARTMENT</th>
              </tr>
            </thead>
            <tbody>
              {users.map(eachUser => (
                <tr>
                  <td>{eachUser.id}</td>
                  <td>{eachUser.name}</td>
                  <td>{eachUser.email}</td>
                  <td>{eachUser.department || 'N/A'}</td>
                  <td>
                    <button
                      type="button"
                      className="update-btn"
                      onClick={() => updateButton(eachUser)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        deleteUser(eachUser.id)
                      }}
                      type="button"
                      className="delete-button"
                    >
                      -Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button
              type="button"
              className="add-button"
              onClick={() => {
                HandleAdd()
              }}
            >
              +Add User
            </button>
          </div>
        </div>
      )}
      {update && (
        <div className="update-container">
          <h1>You can Update UserDetails Now</h1>
          <div className="small-container">
            <label htmlFor="name">Name :</label>
            <input
              onChange={handleChange}
              name="name"
              defaultValue={updateduser.name}
              type="textbox"
            />
          </div>
          <div className="small-container">
            <label htmlFor="username">Username :</label>
            <input
              onChange={handleChange}
              defaultValue={updateduser.username}
              name="username"
              type="textbox"
            />
          </div>
          <div className="small-container">
            <label htmlFor="email">Email :</label>
            <input
              onChange={handleChange}
              defaultValue={updateduser.email}
              name="email"
              type="textbox"
            />
          </div>
          <div className="small-container">
            <label htmlFor="phone">Phone :</label>
            <input
              onChange={handleChange}
              defaultValue={updateduser.phone}
              name="phone"
              type="textbox"
            />
          </div>
          <div className="small-container">
            <label htmlFor="website">Website :</label>
            <input
              onChange={handleChange}
              defaultValue={updateduser.website}
              name="website"
              type="textbox"
            />
          </div>
          <div className="small-container">
            <label htmlFor="address">Address :</label>
            <textarea
              onChange={handleChange}
              defaultValue={JSON.stringify(updateduser.address)}
              name="address"
              rows="8"
              cols="25"
            />
          </div>
          <div className="small-container">
            <label htmlFor="company">Company :</label>
            <textarea
              onChange={handleChange}
              defaultValue={JSON.stringify(updateduser.company)}
              name="company"
              rows="6"
              cols="25"
            />
          </div>
          <button
            type="button"
            className="update-button"
            onClick={() => {
              EditUser(updateduser.id)
            }}
          >
            Update
          </button>
        </div>
      )}
      {add && (
        <div className="update-container">
          <h1>You can Add User</h1>
          <div className="small-container">
            <label htmlFor="name">Name :</label>
            <input
              onChange={handleAddUser}
              name="name"
              defaultValue={samuser.name}
              type="textbox"
            />
          </div>
          <div className="small-container">
            <label htmlFor="username">Username :</label>
            <input
              onChange={handleAddUser}
              defaultValue={samuser.username}
              name="username"
              type="textbox"
            />
          </div>
          <div className="small-container">
            <label htmlFor="email">Email :</label>
            <input
              onChange={handleAddUser}
              defaultValue={samuser.email}
              name="email"
              type="textbox"
            />
          </div>
          <div className="small-container">
            <label htmlFor="phone">Phone :</label>
            <input
              onChange={handleAddUser}
              defaultValue={samuser.phone}
              name="phone"
              type="textbox"
            />
          </div>
          <div className="small-container">
            <label htmlFor="website">Website :</label>
            <input
              onChange={handleAddUser}
              defaultValue={samuser.website}
              name="website"
              type="textbox"
            />
          </div>
          <div className="small-container">
            <label htmlFor="address">Address :</label>
            <textarea
              onChange={handleChange}
              defaultValue={JSON.stringify(samuser.address)}
              name="address"
              rows="8"
              cols="25"
            />
          </div>
          <div className="small-container">
            <label htmlFor="company">Company :</label>
            <textarea
              onChange={handleAddUser}
              defaultValue={JSON.stringify(samuser.company)}
              name="company"
              rows="6"
              cols="25"
            />
          </div>
          <button
            type="button"
            className="update-button"
            onClick={() => {
              AddUser()
            }}
          >
            +Add
          </button>
        </div>
      )}
    </div>
  )
}
export default UsersList
