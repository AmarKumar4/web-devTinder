import React, { useEffect, useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import Cookies from 'js-cookie';

const EditProfile = ({ loggedUser }) => {
    const [firstName, setFirstName] = useState(loggedUser.firstName);
    const [lastName, setLastName] = useState(loggedUser.lastName);
    const [age, setAge] = useState(loggedUser.age);
    const [gender, setGender] = useState(loggedUser.gender);
    const [about, setAbout] = useState(loggedUser.about);
    const [photoUrl, setPhotoUrl] = useState(loggedUser.photoUrl);
    const [errorMessage, setErrorMessage] = useState("");
    const [toast, setToast] = useState(false)
    const dispatch = useDispatch()

    const handleProfile = async () => {
        // const token = Cookies.get('token');
        // const apiClient = axios.create({
        //     baseURL: BASE_URL, // Backend URL
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${token}`, // Add token if required
        //     },
        // });
        // apiClient.patch('/profile/edit',{
        //     data:"Your data",
        // }).then(response =>{
        //     console.log(response.data)
        // }).catch(error => {
        //     console.error('Error:', error);
        // });
        // axios.patch('http://localhost:3000/profile/edit', { firstName,
        //     lastName,
        //     photoUrl,
        //     age,
        //     gender,
        //     about,}, {
        //     withCredentials: true, // Include cookies in the request
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${token}`, // If you're sending a Bearer token
        //     },
        // })
        // .then(response => {
        //     console.log('Profile updated:', response.data);
        // })
        // .catch(error => {
        //     console.error('Error:', error);
        // });

        setErrorMessage("")
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName,
                lastName,
                photoUrl,
                age,
                gender,
                about,
            },
                { withCredentials: true }
            )

            dispatch(addUser(res?.data?.data))
            setToast(true)
            console.log(toast)
            setTimeout(() => {
                console.log("Toast")
                setToast(false);
                console.log(toast)
            }, 3000);
            console.log(toast)
        } catch (err) {
            setErrorMessage(err.response.data)
        }
    }
 

    return (
        <>
            <div className='flex justify-center my-10 '>
                <div className='flex justify-center mx-10'>
                    <div className="card bg-base-300 w-96 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title justify-center ">Edit Profile </h2>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">firstName</span>
                                    {/* <span className="label-text-alt">Top Right label</span> */}
                                </div>
                                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" className="input input-bordered w-full max-w-xs" />
                                <div className="label">

                                </div>
                            </label>

                            <label className="form-control w-full max-w-lg ">
                                <div className="label">
                                    <span className="label-text">lastName</span>
                                    {/* <span className="label-text-alt">Top Right label</span> */}
                                </div>
                                <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" className="input input-bordered w-full max-w-xs" />

                            </label>
                            <label className="form-control w-full max-w-lg ">
                                <div className="label">
                                    <span className="label-text">Age</span>
                                    {/* <span className="label-text-alt">Top Right label</span> */}
                                </div>
                                <input value={age} onChange={(e) => setAge(e.target.value)} type="text" className="input input-bordered w-full max-w-xs" />

                            </label>

                            <label className="form-control w-full max-w-lg ">
                                <div className="label">
                                    <span className="label-text">Gender</span>
                                    {/* <span className="label-text-alt">Top Right label</span> */}
                                </div>
                                <input value={gender} onChange={(e) => setGender(e.target.value)} type="text" className="input input-bordered w-full max-w-xs" />

                            </label>

                            <label className="form-control w-full max-w-lg ">
                                <div className="label">
                                    <span className="label-text">About</span>
                                    {/* <span className="label-text-alt">Top Right label</span> */}
                                </div>
                                <input value={about} onChange={(e) => setAbout(e.target.value)} type="text" className="input input-bordered w-full max-w-xs" />

                            </label>

                            <label className="form-control w-full max-w-lg ">
                                <div className="label">
                                    <span className="label-text">PhotoUrl</span>
                                    {/* <span className="label-text-alt">Top Right label</span> */}
                                </div>
                                <input value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} type="text" className="input input-bordered w-full max-w-xs" />
                                <div className="label text-red-700">
                                    {errorMessage}
                                </div>
                            </label>
                            <div className="card-actions justify-center">
                                <button className="btn btn-primary " onClick={handleProfile} >Save Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
                <UserCard userProfile={{ firstName, lastName, photoUrl, age, gender, about }} />

            </div>
            {toast && 
            (
                <div className="toast toast-top toast-center transition ease-in-out duration-300">
                
                <div className="alert alert-success">
                    <span>Profile save successfully.</span>
                </div>
            </div>
            )}
        </>
    )
}

export default EditProfile