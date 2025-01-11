import React, { useState } from 'react'
import styles from './TaskPage.module.css';
import Form from '../../components/Form/Form';
function TaskPage() {
    const [tasks,setTasks] = useState([]);
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
      const addTask = (data) =>{
        console.log(data)
        setTasks((prevdata) =>[...prevdata,data])
      }
      const submitTasks = ()=>{

      }
  return (
    <div className={styles.container}>
        <Form fields={formFields} onSubmit={addTask} buttonLabel={'submit'}/>
        {
            tasks.map((item,index)=>(
                <div key={index}>
                    <h1>{item.name}</h1>
                    <p>{item.content}</p>
                </div>
            ))
        }
        <button>submit tasks</button>
    </div>
  )
}

export default TaskPage
