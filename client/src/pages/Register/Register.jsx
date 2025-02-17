// pages/SignUp.js
import React,{useState} from "react";
import Form from "./../../components/Form/Form";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import { Link } from "react-router-dom";
import {toast} from 'react-toastify';
import Api from "./../../Apis/Api";
const SignUp = () => {
  
  const formFields = [
    {
        name: "name",
        label: "Username",
        type: "text",
        required: true,
        validate: (value) =>value.length >= 3,
        errorMessage: "Username should be at least 3 characters",
    },
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
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      required: true,
      validate: (value, formValues) => value === formValues.password,
      errorMessage: "Passwords do not match",
    },
    {
        name:"UserType",
        label:"User Type",
        type:"select",
        required:true,
        values:['employee','manager'],
        validate: (value) => ['manager','employee'].includes(value)
    }
  ];

  const handleSubmit = async(data) => {
    const {confirmPassword,...finalData}=data; 
    const response =await Api({
      endpoint: "/register",
      method: "POST",
      data:finalData,
    });
    if(response.status === 201){
      toast.success("Account created successfully");}
      
  };

  return (
    <>
      <Form fields={formFields} onSubmit={handleSubmit} buttonLabel={"Sign Up"}/>
      <p>or</p>
      <p>Already have an accout <mark><Link to={"/login"}>Login</Link></mark></p>
          
    </>
  );
};

const RegisterPage = () => (
    <AuthLayout>
      <SignUp />
    </AuthLayout>
  );
  
  
  export default RegisterPage; 