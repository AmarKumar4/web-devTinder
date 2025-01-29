import React from 'react'
import EditProfile from './EditProfile'
import { useDispatch, useSelector } from 'react-redux'

const Profile = () => {
    const loggedInUser = useSelector((store) => store.user);
    console.log(loggedInUser)
  return (
    <div>{loggedInUser && <EditProfile loggedUser = {loggedInUser} />}</div>
  )
}

export default Profile