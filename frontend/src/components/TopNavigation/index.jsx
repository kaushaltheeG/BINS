
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ProfileModal from './ProfileModal';
import './TopNav.css';
import SearchBar from './SearchBar';

const TopNavigation = () => {
    const sessionUser = useSelector(state => state.session.user);
    const location = useLocation(); //might new a useEffect but do need since useSelectior will cause the render 

    const [showProfile, setShowProfile] = useState(false);

    const openProfile = () => {
        if (showProfile) return;
        setShowProfile(true);
    };

    useEffect(() => {
        if (!showProfile) return;

        const closeProfile = () => {
            setShowProfile(false);
        };

        document.addEventListener('click', closeProfile);

        return () => document.removeEventListener("click", closeProfile);
    }, [showProfile]);




    /* 
        @splash: signin, createnew, home, and <a> links for other info within the splash 
        @workareas index:  none
        @workarea show: profile button and search bar 
    */



    let sessionLinks;
    if (sessionUser && location.pathname === "/client/workareas") {
        sessionLinks = (
            <>
                <div className='inside-workarea'>
                    <div></div>
                    {/* <div className='search-and-profile'> */}
                        <SearchBar />
                        {/* <ProfileButton user={sessionUser} /> */}
                        <div className='profile-icon-container'>
                            <div id="profile-icon">
                                <button onClick={openProfile}>{sessionUser.name[0].toUpperCase()}
                                    <i className="fa-solid fa-user-circle" />
                                </button>
                            </div>
                        </div>
                        

                    {/* </div> */}
                    
                </div>
                    { showProfile && 
                        <ProfileModal user={sessionUser} />
                    }
            </>
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