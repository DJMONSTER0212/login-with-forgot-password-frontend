import React, { useState } from 'react'
import { NavLink } from "react-router-dom"
import axios from 'axios';
import { Toast, useToast } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import { Navigate } from 'react-router-dom';
axios.defaults.baseURL = "https://login-with-forgot-password.onrender.com"
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!email || !password) {
                Toast({
                    title: 'Please Fill all the Fields',
                    description: "You have to fill the required fields",
                    status: 'warning',
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom',
                });
                setLoading(false);
                return;
                // alert("Enter all the details")
            }
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
            };
            const { data } = await axios.post(
                "/api/user/login",
                { email, password },
                config
            );
            toast({
                title: 'Login Successfull',
                description: "You have Successfully logged IN",
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            // console.log(data);
            // alert(data)
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate("/home")
            // <Navigate replace to="/home"/>

        } catch (error) {

        }
    }
    return (
        <div className='container'>
            <h1 className='mb-5'>Login</h1>
            <div >
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"
                            onChange={(e) => setPassword(e.target.value)}
                        />


                        <div id="emailHelp" className="form-text" style={{ textAlign: 'end' }}><NavLink to="/forgot"><span style={{color:"blue"}}>Forgot Password?</span></NavLink></div>
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>{loading ? (<div class="d-flex justify-content-center">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>) : "Submit"}</button>
                </form>

                <span>Create An Account <NavLink to="/sign-up"><span style={{color :"blue",}}>Sign-Up</span></NavLink></span>
            </div>
        </div>
    )
}

export default Login
