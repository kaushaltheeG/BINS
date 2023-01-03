import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './ProfileModal.css'

function ProfileModal({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const history = useHistory();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout()).then(() => (
            history.push('/signin')
        ));
    };

    return (
        <>
            <div className="profile-modal-background">
                <div className="profile-modal-container">
                    <div className="profile-model-info font-profile-modal">
                        <li className="error-li">{user.name}</li>
                    </div>
                    <div className="profile-model-seperator_li">
                        <hr className="profile-model-seperator_hr" />
                    </div>
                    <div className="profile-model-info font-profile-modal">
                        <li className="error-li"> {user.email}</li>
                    </div>
                    <div className="profile-model-seperator_li">
                        <hr className="profile-model-seperator_hr" />
                    </div>
                    <div className="profile-model-info font-profile-modal">
                        <li className="error-li">
                            <div onClick={logout} id="signout">Sign out of current work area</div>
                        </li>

                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileModal;