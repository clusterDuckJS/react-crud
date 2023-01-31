import {useForm} from 'react-hook-form'


import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const[users, setUsers] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm();

  //to handle form submission
  const onCreate = (data) => {
    //prevents the refresh of page due to default app behavior during form submit
    // e.preventDefault();
    // sending post request with inputs data to apache server at port 80
    axios.post('http://localhost:80/api/user/save', data)
    .then(function(response){
      console.log(response.data)
    });
    console.log(data);
  }
//GET USER LIST
function getUsers() {
  axios.get('http://localhost:80/api/users/')
  .then(function(response) {
    
    console.log(response.data)
    setUsers(response.data)
  })
};

useEffect(()=> {
  getUsers();
},[]);
 
//DELETE USER
// const deleteUser = (id) => {
//   axios.delete(`http://localhost:80/api/user/${id}/delete`)
//   .then(function(response) {
//     console.log(response.data)
//     getUsers();
//   });
// }
const deleteUser = async (id) => {
  await axios.delete(`http://localhost:80/api/user/${id}/delete`)
  .then(response => {
      console.log(response.data);
      getUsers();
  })
  .catch(error => console.error(error));
}
  return (
    <div className="App">
      <form onSubmit={handleSubmit(onCreate)}>
        <label htmlFor="name">NAME</label>
        <input type="text" name='name'  {...register("name", { required: true })}/>
        {errors.name && <p>Please check the First Name</p>}

        <label htmlFor="age">AGE</label>
        <input type="number" name='age' {...register("age", { required: true })}/>
        {errors.age && <p>Please check the First Name</p>}

        <label htmlFor="state">STATE</label>
          <select name='state' {...register("state", { required: true })}>
            <option value="">----</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Himachal Pradesh">Himachal Pradesh</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Odisha">Odisha</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Telangana">Telangana</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="West Bengal">West Bengal</option>
        </select>
        {errors.state && <p>Please check the First Name</p>}

        <label htmlFor="role">ROLE</label>
        <select name='role' {...register("role", { required: true })}>
          <option value="">----</option>
          <option value="Batsman" >Batsman</option>
          <option value="Bowler">Bowler</option>
          <option value="All-rounder">All-rounder</option>
          <option value="Wicket-keeper">Wicket-keeper</option>
        </select>
        {errors.role && <p>Please check the First Name</p>}

        <button type='submit'>save</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>Role</th>
            <th>State</th>
            <th>Created on</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => 
           ( 
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.age}</td>
            <td>{user.role}</td>
            <td>{user.state}</td>
            <td>{user.created_at}</td>
            <td>
              <button onClick={()=> deleteUser(user.id)} >Delete</button>
            </td>
          </tr>))}
        </tbody>
      </table>

    </div>
  );
}

export default App;
