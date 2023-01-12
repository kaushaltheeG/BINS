
import React from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ProfileModal from './ProfileModal';
import './TopNav.css';
import SearchBar from './SearchBar';
import slackLogo from '../.././utils/images/slack-logo-thumb.png'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useModal } from 'react-hooks-use-modal';
import classNames from "../../hooksAndMore/classNames"


const TopNavigation = () => {
    const sessionUser = useSelector(state => state.session.user);
    const location = useLocation(); //might new a useEffect but do need since useSelectior will cause the render 
    const currentWorkarea = useSelector(state => state.workarea.currentWorkarea);
    const [showProfile, setShowProfile] = useState(false);
    const [scroll, setScroll] = useState(false);

   
    const [Modal, open, close, isOpen] = useModal('root', {
        preventScroll: true,
        focusTrapOptions: {
            clickOutsideDeactivates: true
        }, 
        components: {
            Modal: ({ title, description, children }) => {
                return (
                    <div
                        style={{
                            borderRadius: '10px'
                        }}
                    >
                        {title && <h1>{title}</h1>}
                        {description && <p>{description}</p>}
                        {children}
                    </div>
                );
            },
            Overlay: () => {
                return (
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        }}
                    />
                );
            },
            Wrapper: ({ children }) => {
                return (
                    <div
                        style={{
                            position: 'fixed',
                            top: '50px',
                            right: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1000
                        }}
                    >
                        {children}
                    </div>
                );
            },
        },
    })

    




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

    useEffect(() => {
        if (location.pathname === "/") {
            window.addEventListener("scroll", () => {
                console.log(window.scrollY)
                setScroll(window.scrollY);
            });
            return () => window.removeEventListener("scroll", setScroll);
        }
    }, []); 



    /* 
        @splash: signin, createnew, home, and <a> links for other info within the splash 
        @workareas index:  none
        @workarea show: profile button and search bar 
    */



    let sessionLinks;
    if (sessionUser && location.pathname !== '/client/workareas' && location.pathname !== '/') {
        sessionLinks = (
            <>
                <div className='inside-workarea'>
                    
                    <div className='clock-icon-container'>
                        <AccessTimeIcon className='clock-styles'/>
                    </div>
                    <div className="main-search-bar-container">
                        <SearchBar />

                    </div>
                    <div className="profile-container">
                        <div className='profile-icon-container'>
                            <div >
                                <button id="profile-icon" onClick={open}>{sessionUser.name[0].toUpperCase()}
                                
                                </button>
                            </div>
                        </div>
                    </div>
                     
                        

                    {/* </div> */}
                    
                </div>
                    <Modal>
                        <ProfileModal user={sessionUser} workarea={currentWorkarea}/>
                    </Modal>
                    
            </>
        );
    } else if (location.pathname === "/") {
        sessionLinks = (
            <>
                <div className="extra-padding">
                    <div className={classNames('outside-workarea', "c-nav__row", scroll > 160 && 'is-fixed ')}>
                        <div className="outside-container o-nav--primary ">
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