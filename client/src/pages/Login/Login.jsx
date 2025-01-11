import React,{useState} from "react";
import Form from "./../../components/Form/Form";
import Api from './../../Apis/Api';
import AuthLayout from './../../components/AuthLayout/AuthLayout'
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const SignIn = () => {
  const from = location.state?.from?.pathname || `/taskpage`;
  const formFields = [
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      errorMessage: "Please enter a valid email address",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      required: true,
      validate: (value) => value.length >= 6,
      errorMessage: "Password must be at least 6 characters long",
    },
  ];

  const handleSubmit = async(data) => {
    const response =await Api({
      endpoint: "/login",
      method: "POST",
      data,
    });
    if(response.status === 200){
      localStorage.setItem("token",response.data.token);
      localStorage.setItem("id", response.data.id);
      toast.success("logged-in Succesfully");
      window.location.href = from;
    }
  };

  return (
    <>
      <Form fields={formFields} onSubmit={handleSubmit} buttonLabel={"Log In"}/>
      <p>or</p>
      <p>Don’t have an account? <mark><Link to={"/register"}>Register now</Link></mark></p>
    </>
    
  );
};


const SignInPage = () => (
    <AuthLayout>
      <SignIn />
    </AuthLayout>
  );
  
  
  export default SignInPage; 