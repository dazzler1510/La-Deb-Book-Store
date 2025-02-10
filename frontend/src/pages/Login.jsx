import React,{useState} from 'react'
import axios from 'axios';
 import { authActions } from '../store/auth';
import { useDispatch } from 'react-redux';
import { Link ,useNavigate} from "react-router-dom";
 

const Login = () => {
  const [Values,setValues]= useState({
    username:"",
  
    password:"",
  
  });
  const navigate=useNavigate(); 
  const dispatch= useDispatch();
  const change= (e)=>{
    const{name,value} = e.target;
    setValues({...Values,[name]:value});
  };
  const submit= async()=>{
    
    try {
      if(Values.username==="" || Values.password==="" )
      {
        alert("All fields are required");
      } else{
        const response= await axios.post(
          "http://localhost:1000/api/v1/sign-in",
           Values);
           //console.log(response.data.id)
           dispatch(authActions.login())
           dispatch(authActions.changeRole(response.data.role))
          localStorage.setItem("id",response.data.id)
          localStorage.setItem("token",response.data.token)
          localStorage.setItem("role",response.data.role)
          navigate("/profile")
          // navigate("/Login")
      };
      
    } catch (error) {
        alert(error.response.data.message);
    }
  }
  return (
    <div className="h-screen flex items-center justify-center bg-zinc-900">
      <div className="bg-zinc-800 rounded-lg px-8 py-8 w-full md:w-2/6">
        <p className="text-white text-2xl font-semibold text-center mb-6">
          Login
        </p>
        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="text-zinc-400 block">
              Username
            </label>
            <input
              type="text"
              className="w-full bg-zinc-900 text-white p-3 rounded-md outline-none border border-zinc-700 focus:border-blue-500"
              placeholder="username"
              name="username"
              required
              value= {Values.username}
              onChange={change}
            />
          </div>
          <div>
            <label htmlFor="password" className="text-zinc-400 block">
              Password
            </label>
            <input
              type="password"
              className="w-full bg-zinc-900 text-white p-3 rounded-md outline-none border border-zinc-700 focus:border-blue-500"
              placeholder="password"
              name="password"
              required
              value= {Values.password}
              onChange={change}
            />
          </div>
        </div>
        <div className="mt-6">
          <button className="w-full bg-blue-500 text-white font-semibold py-3 rounded-md hover:bg-blue-600 transition duration-300"
          onClick={submit}>
            Login
          </button>
        </div>
        <p className="flex mt-6 items-center justify-center text-zinc-200 font-semibold">
          Or
        </p>
        <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
          Dont have an account? &nbsp;
          <Link to="/signUp" className="hover:text-blue-500">
            <u>Sign Up</u>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
