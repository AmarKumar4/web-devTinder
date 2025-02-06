import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { fixedFooter } from '../utils/footerSlice';

const Login = () => {
    const [emailId, setEmailId] = useState("elon@gmail.com");
    const [password,setPassword] = useState("Elon@1234");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(false);
    const [errorMessage,setErrorMessage] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate();
    // const userSelector =useSelector((store)=>store.user);
    const handleLogin = async ()=>{
        if(!isLoginForm){
        try{
        const res = await axios.post(BASE_URL+"/login",{emailId,password},{withCredentials: true})
        console.log(res.data);
        dispatch(addUser(res.data));
        navigate("/")
        }
        catch(err){
             setErrorMessage(err.response.data)
            console.log(err)
        }
       
    }
    else{
        try{
            const res = await axios.post(BASE_URL+"/signup",{firstName,lastName,emailId,password},{withCredentials: true})
            console.log(res.data.data);
            dispatch(addUser(res?.data?.data));
            navigate("/")
            }
            catch(err){
                 setErrorMessage(err.response.data)
                console.log(err)
            }
    }
    }
    // useEffect(() => {
    //     if ( userSelector?.length === 0) {
    //         console.log("true")
    //         dispatch(fixedFooter(true));  // Fix footer if data is empty
    //     } else {
    //         dispatch(fixedFooter(false)); // Unfix footer if data is present
    //         console.log("false "+ userSelector?.length);
    //     }
    //     console.log("footerHandler")
    // }, [userSelector, dispatch]);
    return (
        <div className='flex justify-center my-4  '>
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center ">{isLoginForm?"Sign Up" : "Login"} </h2>
                    
                   {isLoginForm && <>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">First Name</span>
                            {/* <span className="label-text-alt">Top Right label</span> */}
                        </div>
                        <input value={firstName} onChange={(e)=>setFirstName(e.target.value)} type="text" placeholder="Enter your First Name" className="input input-bordered w-full max-w-xs" />
                        <div className="label">

                        </div>
                    </label>
                     <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Last Name</span>
                            {/* <span className="label-text-alt">Top Right label</span> */}
                        </div>
                        <input value={lastName} onChange={(e)=>setLastName(e.target.value)} type="text" placeholder="Enter your Last Name" className="input input-bordered w-full max-w-xs" />
                        <div className="label">

                        </div>
                    </label>
                   </>} 
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
                            <span className="label-text">Password</span>
                            {/* <span className="label-text-alt">Top Right label</span> */}
                        </div>
                        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="text" placeholder="Enter your password" className="input input-bordered w-full max-w-xs" />
                        <div className="label text-red-700">
                                {errorMessage}
                        </div>
                    </label>
                    
                    <div className=" flex-col card-actions justify-center">
                    {isLoginForm?<><button className="btn btn-primary m-auto w-60 " onClick={handleLogin} >Sign Up</button></> : <><button className="btn btn-primary m-auto w-1/2" onClick={handleLogin} >Login</button></>}
                        <p className="m-auto cursor-pointer py-2" onClick={() => setIsLoginForm((value) => !value)}>{isLoginForm? "Existing User? Login Here" : "New User? Signup Here"}</p>
                    </div>
                </div>
            </div>
            <div className="h-auto"></div>
        </div>
    )
}

export default Login