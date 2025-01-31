import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed} from '../utils/feedSlice'
import UserCard from './UserCard'
import { BASE_URL } from '../utils/constants'
import { fixedFooter } from '../utils/footerSlice'

const Feed = () => {
    const [userFeedData, setUserFeedData] = useState([]);
    const dispatch = useDispatch();
    const profileFeed = useSelector((store)=>store.feed)
    const handleFeed = async ()=> {
        // console.log(profileFeed)
        if(profileFeed) return;
        try {
          const profile= await axios.get(BASE_URL+"/feed?page=5&limit=1",{withCredentials:true})
          dispatch(addFeed(profile?.data));
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
    useEffect(() => {
        // If feed is empty, set footer as fixed
        if (profileFeed?.length === 0) {
            dispatch(fixedFooter(true));
        } else {
            dispatch(fixedFooter(false));
        }
    }, [profileFeed, dispatch]);
    if(!profileFeed) return;
    if(profileFeed.length <=0) return  <h1 className='flex justify-center my-10'>Now new users founds!</h1>
    return (
        <>
            {profileFeed && (
                <div className='flex justify-center my-8'>
                    <UserCard key={1} userProfile={profileFeed[0]} />
                </div>
            )}

            {/* Footer ke liye extra padding */}
            {/* <div className="h-2/5"></div> Adjust height according to your footer's height */}
        </>
    );
}

export default Feed