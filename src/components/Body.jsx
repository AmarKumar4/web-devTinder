import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { addUser } from '../utils/userSlice'
import FooterHandler from './FooterHandler'

const Body = () => {
    const userData = useSelector((store)=>store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const fetchUser = async () =>{
        if(userData) return;
      
        try {
            const getProfile = await axios.get(BASE_URL+"/profile/view",{
                withCredentials:true,
            });
            dispatch(addUser(getProfile.data))
        } catch (err) {
             if(err.status == 401){
                navigate("/login");
             }
            console.log(err);
        }
    }

    useEffect(()=>{
        fetchUser();
    },[]);
   
  return (
    <div>
        <Navbar />
        <Outlet />
        <Footer />
        <FooterHandler data={userData}/>
    </div>
  )
}

export default Body