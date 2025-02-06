
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../utils/requestSlice'
import FooterHandler from './FooterHandler'
import { fixedFooter } from '../utils/footerSlice'

const Request = () => {
    const dispatch = useDispatch();
    const userConnection = useSelector((store) => store.request);
    const [isFooterFixed, setIsFooterFixed] = useState(false);

    const reviewRequest = async (status,id) =>{
        try {
            const res = await axios.post(BASE_URL+"/request/review/"+status+"/"+id,{},{withCredentials:true})
            dispatch(removeRequest(id))
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
     
    const fetchRequest = async () => {
        try {
            const reviewRequest = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true })
            dispatch(addRequest(reviewRequest.data))
            console.log(reviewRequest.data);
        } catch (error) {
            console.log(error)
        }

    }


    useEffect(() => {
        fetchRequest();
    }, []);

    
     
        // dispatch(fixedFooter(userConnection?.length===0))
        // <FooterHandler data={userConnection}/> 
        useEffect(() => {
            if ( userConnection?.length === 0) {
                console.log("true")
                dispatch(fixedFooter(true));  // Fix footer if data is empty
            } else {
                dispatch(fixedFooter(false)); // Unfix footer if data is present
                console.log("false "+ userConnection?.length);
            }
            console.log("footerHandler")
        }, [userConnection, dispatch]);
   

    if (!userConnection) return null;
    if (userConnection.length === 0) return <div className='font-bold text-white text-center my-10'>No connections found.</div>;

    return (
        <div className="text-center my-10">
            <h1 className="font-bold text-white text-3xl mb-10">Connections</h1>
             {/* FooterHandler to manage footer state */}
             {/* <FooterHandler data={userConnection}/> */}
            {userConnection && (
                <div className="space-y-6">
                    {userConnection.map((connect) => {
                        const { _id, firstName, lastName, photoUrl, age, gender, about } = connect.fromUserId;
                        return (
                            <div key={_id} className="flex justify-between items-center bg-base-300 rounded-lg p-6 w-3/4 mx-auto shadow-lg hover:shadow-xl transition-shadow">
                                {/* Image Section */}
                                <div className="flex-shrink-0">
                                    <img
                                        src={photoUrl || "https://via.placeholder.com/100"} // Default image if photoUrl is not available
                                        alt={`${firstName} ${lastName}`}
                                        className="w-24 h-24 rounded-full object-cover border-4 border-white"
                                    />
                                </div>

                                {/* Details Section */}
                                <div className="flex-grow ml-6 text-left">
                                    <h2 className="text-xl font-bold text-white">
                                        {firstName} {lastName}
                                    </h2>
                                    <p className="text-gray-400">{age && <span>{age} years, </span>} {gender}</p>
                                    <p className="text-gray-400 mt-2">{about}</p>
                                </div>

                                {/* Action Button (Optional) */}
                                <div className="flex-shrink-0">
                                    <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors " onClick={()=>reviewRequest("accepted",connect._id) }>
                                    Accept
                                    </button>
                                    <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors mx-3" onClick={()=>reviewRequest("rejected",connect._id) }>
                                    Reject
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Footer ke liye extra padding */}
            <div className="h-24"></div> {/* Adjust height according to your footer's height */}
        </div>
    );
    
}

export default Request