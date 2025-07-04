import React from 'react'
import Navbar from './NavBar'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'




const Header = () => {
    return (
        <>
            <MainHeader>
                <div className='menuIcon'>
                    <NavLink to='/' >
                        <img className='icon-image' src='./images/icon.png' alt="logo" />
                    </NavLink>
                </div>
                <Navbar />
            </MainHeader>
        </>
    )
}

const MainHeader = styled.header`
  padding: 0 3.8rem;
  height: 4rem;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  justify-content: space-between;
  align-items: center;

  

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .icon-image{
    height:Auto;
    max-width:40%
    }
  }
`;

export default Header
