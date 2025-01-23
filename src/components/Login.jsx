import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [emailId, setEmailId] = useState("sundar@gmail.com");
    const [password,setPassword] = useState("Sundar@1234");
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleLogin = async ()=>{
        try{
        const res = await axios.post(BASE_URL+"/login",{emailId,password},{withCredentials: true})
        console.log(res.data);
        dispatch(addUser(res.data));
        navigate("/")
        }
        catch(err){
            console.log(err)
        }
    }
    return (
        <div className='flex justify-center my-4'>
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center ">Login {emailId}</h2>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Email Id</span>
                            {/* <span className="label-text-alt">Top Right label</span> */}
                        </div>
                        <input value={emailId} onChange={(e)=>setEmailId(e.target.value)} type="text" placeholder="Enter your email" className="input input-bordered w-full max-w-xs" />
                        <div className="label">

                        </div>
                    </label>

                    <label className="form-control w-full max-w-lg ">
                        <div className="label">
                            <span className="label-text">Email Id</span>
                            {/* <span className="label-text-alt">Top Right label</span> */}
                        </div>
                        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="text" placeholder="Enter your email" className="input input-bordered w-full max-w-xs" />
                        <div className="label">

                        </div>
                    </label>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary " onClick={handleLogin} >Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login