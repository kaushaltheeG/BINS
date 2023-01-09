import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useModal } from 'react-hooks-use-modal';
import "./CreatePod.css"
import Form from './Form';


const CreatePod = () => {
    const [Modal, open, close, isOpen] = useModal('root', {
        preventScroll: true,
        focusTrapOptions: {
            clickOutsideDeactivates: true
        }
        
    })


    return (
        <>
            <div className="pod-element"  onClick={open}>
                <AddCircleOutlineIcon id="lock-hash-icon" />
                <span id="pod-span-ele">Create A Pod</span>
            </div>
            <Modal >
                <Form />
            </Modal>
        </>
    )
}

export default CreatePod