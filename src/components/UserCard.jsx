import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';

const UserCard = ({ userProfile }) => {
  const dispatch = useDispatch();
  const {_id, firstName, lastName, photoUrl, skills, about, age, gender } = userProfile;
  
  const handleSendReq = async(status,id)=>{
    try {
      const resFeed = await axios.post(BASE_URL+"/request/send/"+status+"/"+id,{},{withCredentials:true})
      // console.log("Hited")
      dispatch(removeFeed(id))
    } catch (error) {
     console.log(error) 
    }
   
  }


  return (
    <div><div className="card card-compact bg-base-300 w-96 shadow-xl">
      <figure>
        <img
          src={photoUrl}
          alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + "  " + gender}</p>}
        {about && <p>{about}</p>}
        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary"onClick={()=>handleSendReq("ignored",_id) }>Ignore</button>
          <button className="btn btn-secondary"onClick={()=>handleSendReq("interested",_id) }>Interested</button>
        </div>
      </div>
    </div></div>
  )
}

export default UserCard