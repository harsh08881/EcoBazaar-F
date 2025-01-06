import React from 'react'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import useAuthRedirect from '../Hooks/useAuthRedirect'
import Menu from '../Components/menu/Menu'

const MenuShow = () => {
    useAuthRedirect();
  return (
    <>
    <Header/>
    <Menu/>
    <Footer/>
    </>
  )
}

export default MenuShow;
