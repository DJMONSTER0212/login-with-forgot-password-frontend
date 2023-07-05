import axios from 'axios';
import React, { useState } from 'react'
axios.defaults.baseURL = "https://login-with-forgot-password.onrender.com"
const ForgotPassword = () => {
    const [email,setEmail] = useState("");
    const [message,setMessage] = useState("");
    const sendLink = async(e)=>{
        e.preventDefault();
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
            };
            const {data} = await axios.post("/api/user/forgot",{email},config)
            if(data){
                setMessage(true);
                setEmail("");
            }
        } catch (error) {
            
        }
    }
    return (
        <div className='container '>
            <h1 className='mt-5'>Enter Your Email</h1>
            {message?<p style={{color:"green",fontWeight:"bold"}}>Password reset link send successfully in your email</p>:""}
            <form>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input value={email} type="email" class="form-control" id="exampleInputEmail1" onChange={(e)=>setEmail(e.target.value)} aria-describedby="emailHelp"/>
                        
                </div> 
                <button type="submit" class="btn btn-primary" onClick={sendLink}>Send</button>
            </form>
        </div>
    )
}

export default ForgotPassword
