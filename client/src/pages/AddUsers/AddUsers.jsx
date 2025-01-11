import React, { useState } from 'react'
import Api from './../../Apis/Api';
function AddUsers() {
  const [search, setSearch] = useState("");
  const [users,setUsers]= useState([]);
  const searchUser = async() =>{
    const response =await Api({endpoint:"/secure/searchUsers",
      includeToken:true,
      data:{
        name:search
      }
    })
    console.log(response.data);
  }
  const addUser = async(id) =>{
    const response = await Api({
      endpoint:"/secure/addEmployee",
      includeToken:true,
      data:{
        employeeId:id
      }
    })
    console.log(response.data);
    if(response.status == 200){
      toast.success("user Added succesfully");
    }
  }
  return (
    <div>
      <input type='text' value={search} onChange={(e) =>setSearch(e.target.value)} placeholder='Enter the username' />
      <button onClick={searchUser}>get users</button>
      {users?.map((item,index) =>(
        <div>
        <p key={index}>{item.name}</p>
        <button  onClick={()=>addUser(item._id)}>addUser</button>
        </div>
      ))}
    </div>
  )
}

export default AddUsers