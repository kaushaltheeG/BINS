
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ProfileModal from './ProfileModal';
import './TopNav.css';
import SearchBar from './SearchBar';
import slackLogo from '../.././utils/images/slack-logo-thumb.png'

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
    } else if (location.pathname === "/") {
        sessionLinks = (
            <>
                <div className='outside-workarea'>
                    <div className="outside-container">
                        <a className="binslogo " href="/" target="_self" >
                            <img src={slackLogo} alt="" id='logo-img'/>
                            <NavLink id="logo-title" exact to="/">BINS</NavLink>
                        </a>
                        <div className="entry-btns">
                            <div className="signin-btn btn-padding_outside" >
                                <NavLink id="outside-font" to="/signin">Sign In</NavLink>
                            </div>
                            <div className="createnew-btn btn-padding_outside" >
                                <NavLink id="outside-font"  to="/createnew">New to BINS?</NavLink>
                            </div>
                        </div>
                    </div>
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