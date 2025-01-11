import React, { useState , useEffect} from 'react'
import styles from './TaskPage.module.css';
import Form from '../../components/Form/Form';
import Api from './../../Apis/Api';
import { toast } from 'react-toastify';
function TaskPage({isAdmin}) {
    const [tasks,setTasks] = useState([]);
    const [isEditable,setIsEditable] = useState(true);
    const getTasks = async()=>{
        const response = await Api({
            endpoint:"/secure/getTasks",
            includeToken:true,
            method:'get',
        })
        console.log(response.data);
        setTasks(response.data.tasks);
    }
    useEffect(()=>{
        getTasks();
    },[])
    const formFields = [
        {
          name: "name",
          label: "name",
          type: "text",
          required: true,
          validate: (value) => value.length >= 2,
          errorMessage: "the name should be atleast 2 character",
        },
        {
          name: "content",
          label: "content",
          type: "text",
          required: true,
          validate: (value) => value.length >= 6,
          errorMessage: "content must be at least 6 characters long",
        },
      ];
      const addTask = async(data) =>{
        if(isEditable){
        
        console.log(data)
        setTasks((prevdata) =>[...prevdata,data])
        const response = await Api({
            endpoint:"/secure/addTask",
            includeToken:true,
            method:'post',
            data
        })
        if(response.status ==201){
            toast.success("Task created successfully");
        }}
        else{
            toast.error("you can no longer do changes")
        }
      }
      const submitTasks = async()=>{
        const response = await Api({
            endpoint:"/secure/submitTasks",
            includeToken:true,
            method:'post'
        });
        if(response.status ==201){
            toast.success("Data submitted to manager");
            setIsEditable(false);
        }
      }
  return (
    <div className={styles.container}>
        <Form fields={formFields} onSubmit={addTask} buttonLabel={'submit'}/>
        {
            tasks.map((item,index)=>(
                <div key={index}>
                    <h1>{item.name}</h1>
                    <p>{item.content}</p>
                    <button>edit</button>
                    <button>delete</button>
                </div>
            ))
        }
        <button onClick={submitTasks}>submit tasks</button>
    </div>
  )
}

export default TaskPage
