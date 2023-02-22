import React, { useEffect, useState } from 'react'

const UserTable = (props) => {
const [user,setUser] = useState([]);
const userValue = localStorage.getItem('user');
const [searchName, setSearchName] = useState(null);

useEffect(() => {
    // console.log('props',props, JSON.parse(userValue));
    setUser(JSON.parse(userValue))
}, [props])

const deleteUser = (id) => {
  const deleteUser = user.filter((task) => task.id !== id);
        setUser(deleteUser);
        localStorage.setItem("user", JSON.stringify(deleteUser));
        window.location.reload();
}

const editUser = (data) => {
  props.getUser(data, 'edit')
}

// useEffect(() => {
// console.log('search', searchName, user);
// if (searchName.length > 2) {
//   const reqData = user.map((item, index) => {
//     if (item.name.toLowerCase().indexOf(searchName.toLowerCase()) >= 0)
//     console.log(index);
//       // return origData[index];
//     // return null;
//   });
// }
// }, [searchName])


  return (
    <>
      {/* <input
        type="text"
        onChange={(e) => setSearchName(e.target.value)}
        className="form-control"
        placeholder="Enter your name"
      />
      <br /> <br /> */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Father Name</th>
            <th>Gender</th>
            <th>Country</th>
            <th>State</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {user && user.length > 0 ? (
            user.map((data, id) => (
              <tr key={data.id}>
                <td>{data.name}</td>
                <td>{data.fatherName}</td>
                <td>{data.gender}</td>
                <td>{data.country}</td>
                <td>{data.state}</td>
                <td>{data.city}</td>
                <td>
                  <button
                    className="button muted-button"
                    onClick={() => editUser(data)}
                  >
                    Edit
                  </button>
                  <button
                    className="button muted-button"
                    onClick={() => deleteUser(data.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No users</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default UserTable;