
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './TopNav.css';
import SearchBar from './SearchBar';

const TopNavigation = () => {
    const sessionUser = useSelector(state => state.session.user);
    const location = useLocation(); //might new a useEffect but do need since useSelectior will cause the render 
    console.log(location)

    /* 
        @splash: signin, createnew, home, and <a> links for other info within the splash 
        @workareas index:  none
        @workarea show: profile button and search bar 
    */

    let sessionLinks;
    if (sessionUser && location.pathname === "/client/workareas") {
        sessionLinks = (
            <div className='inside-workarea'>
                <div></div>
                <SearchBar />
                <ProfileButton user={sessionUser} />
            </div>
        );
    } else {
        sessionLinks = (
            <>
                <div className='outside-workarea'>
                    <NavLink exact to="/">BINS</NavLink>
                    <NavLink to="/signin">Sign In</NavLink>
                    <NavLink to="/createnew">New to BINS?</NavLink>
                </div>
            </>
        );
    }

    return (
        <div>
            
            {sessionLinks}
            
        </div>
    );
}

export default TopNavigation;