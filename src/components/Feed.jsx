import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed} from '../utils/feedSlice'
import UserCard from './UserCard'
import { BASE_URL } from '../utils/constants'

const Feed = () => {
    const [userFeedData, setUserFeedData] = useState([]);
    const dispatch = useDispatch()
    const profileFeed = useSelector((store)=>store.feed)
    const handleFeed = async ()=> {
        // console.log(profileFeed)
        if(profileFeed) return;
        try {
          const profile= await axios.get(BASE_URL+"/feed?page=5&limit=1",{withCredentials:true})
          dispatch(addFeed(profile.data));
           console.log(profile.data)
          setUserFeedData(profile.data);
        //   console.log(profileFeed)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        handleFeed()
    }, [])
    
  return (
     <>{
        userFeedData && userFeedData.length > 0 ? <div className='flex justify-center my-8'>
            <UserCard key={1} userProfile ={userFeedData[0]} />
        </div>: <h1 className=''>No Profile in your feed</h1>
     }
     
     </>
  )
}

export default Feed