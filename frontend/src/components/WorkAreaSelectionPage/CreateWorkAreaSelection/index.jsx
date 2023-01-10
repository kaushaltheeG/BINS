import "./CreateWaSelection.css"
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createWorkarea } from "../../../store/workareaReducer";


const CreateWorkAreaSelection = ({formState, setFormState, currentUser}) => {

    const [waName, setWaName] = useState("");
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();


    const handleCancel =  (e) => {
        e.preventDefault();
        setFormState(oldVal => 'Open')
    }

    const handleCreateAndSwitch = (e) => {
        e.preventDefault();
        setErrors([]);
        if (waName) {
            const data = {
                name: waName,
                user_id: currentUser.id
            }
            dispatch(createWorkarea(data)).then(res => {
                history.push(`/client/workareas/${res.id}/pods/${res.firstPod.id}`)
            })
            return 
        }
        setErrors(["Work Area Name Must Include Characters"])
    }

    
    return (
        <div className="create-container">
            <div className="input-create-wa-selection-container">
                <input value={waName} 
                    className="create-wa-input-selection" 
                    onChange={e => setWaName(e.target.value)}
                    placeholder="Work Area Name . . . "
                />
            </div>
                {errors?.map(error => (
                    <span id="error-styles">{error}</span>
                ))}
            <div className="cancel-and-create-wa-btns-container">
                <div className="padding-cancel-create">
                    <button onClick={handleCancel} className="selection-wa-btn" id="add-margin-to-cancel">Cancel</button>
                    <button onClick={handleCreateAndSwitch} className="selection-wa-btn">Create & Open</button>
                </div>
            </div>
        </div>
    )
}

export default CreateWorkAreaSelection