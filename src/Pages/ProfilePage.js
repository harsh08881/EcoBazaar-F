import React from 'react'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import Profile from '../Components/Profile/Profile'
import useAuthRedirect from '../Hooks/useAuthRedirect'

const ProfilePage = () => {
  useAuthRedirect();

  return (
   <>
   <Header/>
   <Profile/>
   <Footer/>
   </>
  )
}

export default ProfilePage
