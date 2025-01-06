import React from 'react'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import useAuthRedirect from '../Hooks/useAuthRedirect'

const Menu = () => {
    useAuthRedirect();
  return (
    <>
    <Header/>
    <Footer/>
    </>
  )
}

export default Menu
