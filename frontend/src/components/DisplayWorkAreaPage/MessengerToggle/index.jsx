import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import PodList from "./PodList"
import { fetchUserPods } from "../../../store/podReducer";
import './MessengerToggle.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TagIcon from '@mui/icons-material/Tag';
import LockIcon from '@mui/icons-material/Lock';
import CreatePod from "./PodList/CreatePod";



const MessengerToggle = () => {
    const pods = useSelector(state => state.pods);
    const dispatch = useDispatch();
    const { workareaId, podId } = useParams();
    const currentPod = pods.pods[parseInt(podId)]
    const [showPods, setShowPods] = useState(true);
    useEffect(()=> {
        dispatch(fetchUserPods(workareaId))
    }, [dispatch, workareaId])

    const togglePodsDisplay = (e) => {
        e.preventDefault()
        setShowPods(oldVal => !oldVal);
    }

    return (
        <div className="messenger-toggle">
            <div className="spacer"></div>
            <div className="pod-title-container" onClick={togglePodsDisplay}>
                {showPods && 
                    <ArrowDropDownIcon id="down-arrow-icon"/>
                }
                { !showPods && 
                    <ArrowDropDownIcon id="side-arrow-icon" />
                }
                <div id="pod-name-header">Pods</div>
            </div>
            {showPods && 
             <>
                <PodList pods={pods} /> 
                <CreatePod />
             </>
            } 
            {!showPods && 
                <div className="pod-element pod-span-ele-active"  >
                    {currentPod.private &&
                        <LockIcon id="lock-hash-icon" />
                    }
                    {!currentPod.private &&
                        <TagIcon id="lock-hash-icon" />
                    }
                    <span id="pod-span-ele">{currentPod.name}</span>
                </div>
            }
            
        </div>
    )
}

export default MessengerToggle