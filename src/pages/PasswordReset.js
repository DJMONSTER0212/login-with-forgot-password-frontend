import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
axios.defaults.baseURL = "https://login-with-forgot-password.onrender.com"
const PasswordReset = () => {
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const {id,token} = useParams();
    const userValid = async()=>{
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        const {data} = await axios.get(`/api/user/forgot/${id}/${token}`,config)
        if(data){
            console.log("user valid")
        }else{
            alert('Invalid Link')
            navigate("/forgot")
        }
    }

    useEffect(()=>{
        userValid()
    },[])
    const sendPassword = async (e)=>{
        e.preventDefault();
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        const { data } = await axios.post(`/api/user/reset/${id}/${token}`,{password},config)
        if(data){
            alert("password reset successfully");
            setPassword("");
            navigate("/");
        }else{
            alert("something went wrong. Generate a new link");
            navigate("/forgot")
        }
    }


    return (
        <div className='container '>
            <h1 className='mt-5'>Enter Your new Password</h1>
            {/* {  <p style={{ color: "green", fontWeight: "bold" }}>Password reset link send successfully in your email</p> : ""} */}
            <form>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">New Password</label>
                    <input value={password} type="password" class="form-control" id="exampleInputEmail1" onChange={(e)=>setPassword(e.target.value)} aria-describedby="emailHelp" placeholder='Enter New password' />

                </div>
                <button type="submit" class="btn btn-primary" onClick={sendPassword}>Send</button>
            </form>
        </div>
    )
}

export default PasswordReset
