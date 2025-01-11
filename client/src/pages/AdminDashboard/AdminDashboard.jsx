import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Api from './../../Apis/Api'
function AdminDashboard() {
    const [submissions, setSubmissions] = useState([]);

    const getSubmissions = async() =>{
        const response = await Api({
            endpoint:'/secure/getSubmissions',
            includeToken:true,
            method:'get',
        });
        console.log(response.data.submissions)
        setSubmissions(response.data.submissions)
        console.log(submissions)
    }

    useEffect(()=>{
        getSubmissions();
    },[])
    const setRating = async(index, rating, id) => {
        const updatedSubmissions = [...submissions];
        updatedSubmissions[index].rating = rating;
        setSubmissions(updatedSubmissions);
        const response = await Api({endpoint:"/secure/rateEmployeebyId",
            method:'post',
            includeToken:true,
            data:{
                rating,
                submissionId:id
            }
        })
        console.log(response)
    };

    return (
        <div>
            {submissions.map((item, index) => (
                <div key={index}>
                    <Link to={`/adminTaskPage/${item.employeeId._id}`}><h5>{item.employeeId.name}</h5></Link>
                    {
                        item.rating == 0 ?
                        
                    <select
                        value={item.rating}
                        onChange={(e) => setRating(index, parseInt(e.target.value), item._id)}
                    >
                        <option value={0}>Select Rating</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    :
                    <p>{item.rating}</p>  
                    }
                </div>
            ))}
        </div>
    );
}

export default AdminDashboard;
