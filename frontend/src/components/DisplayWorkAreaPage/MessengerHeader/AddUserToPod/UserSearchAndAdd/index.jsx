import "./SearchAndAdd.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import TagIcon from '@mui/icons-material/Tag';
import LockIcon from '@mui/icons-material/Lock';

const UserSearchAndAdd = () => {

    const { podId } = useParams();
    const pods = useSelector(state => state.pods);
    const currentPod = pods[parseInt(podId)]

    const members = currentPod ? Object.values(currentPod.members) : null;
    console.log(members)


    return (
        <div className="search-and-add-container">
            <div className="search-add-header">
                <div className="add-user-title-and-pod-name">
                    <span id="add-people-title">Add People</span>
                    <div className="pod-name-for-add-user">
                        {currentPod?.private &&
                            <LockIcon id="lock-tag-header-icon-add-form" />
                        }
                        {!currentPod?.private &&
                            <TagIcon id="lock-tag-header-icon-add-form" />
                        }
                        <span>{currentPod.name}</span>

                    </div>
                </div>
            </div>
            <div className="search-user-input">
                <div contentEditable="true" className="input-div" ><span>a</span><span>k</span></div >
            </div>
            <div className="add-user-to-pod-btn">
                <div className="inner-btn-container">
                    <button id="Add-user-btn">Add</button>
                    
                </div>
            </div>
            <div></div>
        </div>
    )

}

export default UserSearchAndAdd