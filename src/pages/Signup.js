import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
axios.defaults.baseURL = "https://login-with-forgot-password.onrender.com"
const Signup = () => {
    const [name,setName] = useState("");
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [cpassword,setCPassword] = useState("");
    const [loading,setLoading] = useState("");
    const toast = useToast();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true);
        if (!name || !email || !password || !cpassword) {
            toast({
                title: 'Please Fill all the Fields',
                description: "You have to fill the required fields",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            setLoading(false);
            return;
        }
        if (password !== cpassword) {
            toast({
                title: 'Passwords do not match',
                description: "You have to fill same password in confirm password input",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post('/api/user/sign-up', { name, email, password }, config);
            toast({
                title: 'Registeration Successfull',
                description: "We have successfully registered your account",
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            // console.log(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            setLoading(false);
            navigate("/")

        } catch (error) {
            
        }
    }
    return (
        <div className='container'>
            <h1 className='mb-5'>Sign-Up</h1>
            <div >
                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" aria-describedby="emailHelp" onChange={(e)=>setName(e.target.value)} />
                        {/* <div id="name" className="form-text">We'll never share your email with anyone else.</div> */}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                        onChange={(e)=>setEmail(e.target.value)}
                        />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"
                            onChange={(e)=>setCPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </form>

                {/* <span>Create An Account <NavLink to="/sign-up">Sign-Up</NavLink></span> */}
            </div>
        </div>
    )
}

export default Signup
