import React, { useEffect } from 'react'
import EditProfile from './EditProfile'
import { useDispatch, useSelector } from 'react-redux'
import { fixedFooter } from '../utils/footerSlice';
import FooterComponent from './FooterHandler';
import FooterHandler from './FooterHandler';

const Profile = () => {
    const loggedInUser = useSelector((store) => store.user);
    const dispatch = useDispatch();
    console.log(loggedInUser);
    useEffect(() => {
      // If feed is empty, set footer as fixed
      if (loggedInUser?.length === 0) {
          dispatch(fixedFooter(true));
      } else {
          dispatch(fixedFooter(false));
      }
  }, [loggedInUser, dispatch]);

  return (
    <div>{loggedInUser && <EditProfile loggedUser = {loggedInUser} />}
          {/* <FooterHandler data={loggedInUser}/> */}

    </div>
  )
}

export default Profile