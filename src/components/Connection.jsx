import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connections';
import { fixedFooter } from '../utils/footerSlice';
import FooterComponent from './FooterHandler';
import FooterHandler from './FooterHandler';

const Connection = () => {
    const dispatch = useDispatch();
    const userConnection = useSelector((store) => store.connection);

    const connection = async () => {
        try {
            const connections = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
            console.log(connections.data.data);
            dispatch(addConnection(connections.data.data));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        connection();
       
    }, [dispatch]);
    
    
    // useEffect(() => {
    //     // If feed is empty, set footer as fixed
    //     if (userConnection?.length === 0) {
    //         dispatch(fixedFooter(true));
    //     } else {
    //         dispatch(fixedFooter(false));
    //     }
    // }, [userConnection, dispatch]);

    if (!userConnection) return null;
    if (userConnection.length === 0) return <div className='font-bold text-white text-center my-10'>No connections found.</div>;

    return (
        <div className="text-center my-10">
            <h1 className="font-bold text-white text-3xl mb-10">Connections</h1>
             {/* FooterHandler to manage footer state */}
            <FooterHandler data ={userConnection} />
            {userConnection && (
                <div className="space-y-6">
                    {userConnection.map((connect) => {
                        const { _id, firstName, lastName, photoUrl, age, gender, about } = connect;
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
                                    <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                                    Chat
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
};

export default Connection;