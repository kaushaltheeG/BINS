import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../store/modalReducer';
import ProfileButton from '../TopNavigation/ProfileModal';


const Modal = ({closeModal}) => {

    return (
        <div className='modal-background' onClick={closeModal}>
            <div className='modal-child' onClick={e => e.stopPropagation()}>
                {/* <ProfileButton /> */}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        modal: state.ui.modal
    };
};

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal)