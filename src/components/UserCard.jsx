import React from 'react'

const UserCard = ({userProfile}) => {
    const {firstName,lastName,photoUrl,skills,about,age,gender} = userProfile;
  return (
    <div><div className="card card-compact bg-base-300 w-96 shadow-xl">
    <figure>
      <img
        src={photoUrl}
        alt="Shoes" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{firstName +" "+ lastName}</h2>
     {age && gender && <p>{age+ "  " + gender}</p>}
     {about && <p>{about}</p> }
      <div className="card-actions justify-center my-4">
        <button className="btn btn-primary">Ignore</button>
        <button className="btn btn-secondary">Interested</button>
      </div>
    </div>
  </div></div>
  )
}

export default UserCard