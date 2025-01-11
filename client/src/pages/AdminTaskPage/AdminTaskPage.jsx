import React, { useState ,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Api from './../../Apis/Api'
function AdminTaskPage() {
    const [tasks,setTasks] = useState([]);
    const {userId} = useParams();
    const getTasks = async()=>{
        const response = await Api({
            endpoint:`/secure/getUserTasks/${userId}`,
            includeToken:true,
            method:'get',
        })
        console.log(response.data);
        setTasks(response.data.tasks);
    }
    useEffect(()=>{
        getTasks();
    },[])
      return (
    <div>
      <h1>Tasks</h1>
      {tasks.map((item)=>(
        <div key={item._id}>
            <h4>{item.name}</h4>
            <p>{item.content}</p>
        </div>
      ))}
      <select
            // onChange={(e) => setRating(index, parseInt(e.target.value), item.id)}
                    >
                        <option value={0}>Select Rating</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
      </select>
    </div>
  )
}

export default AdminTaskPage
