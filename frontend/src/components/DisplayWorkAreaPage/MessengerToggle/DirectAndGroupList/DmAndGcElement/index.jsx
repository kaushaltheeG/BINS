import { useSelector } from "react-redux"
import { getCurrentUser } from "../../../../../store/session"
import Diversity3Icon from '@mui/icons-material/Diversity3';
import './DmAndGmEle.css';
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";


export const DmAndElement = ({ dm }) => {
   
    const {id, members, creator_id, isGroup} = dm 
    const currentUser = useSelector(getCurrentUser)
    const history = useHistory();
    const [concatted, setConcatted] = useState('')
    const {workareaId, type, typeId} = useParams();



    useEffect(() => {
        let result;
        result = Object.values(members).filter((member) => member.id !== currentUser.id)
            .map((member) => member.name)
            .toString()

        setConcatted(result)
    }, [])

    const handleSwitch = (e) => {
        e.preventDefault();
        history.push(`/client/workareas/${workareaId}/dms/${id}`)
    }

    return (
        <>
            {(id == typeId && type === "dms") &&
                <div className="pod-element pod-span-ele-active" id="extra-btm-marign" >
                    {isGroup &&
                        <>
                            <Diversity3Icon id="group-icon" />
                            <span id="pod-span-ele" onClick={handleSwitch}>{concatted}</span>
                        </>
                    }
                    {!isGroup &&
                        <>
                            <div className="extra-padding-dm">
                                <button className="profile-icon" id='size-override'>{concatted[0]?.toUpperCase()}</button>
                            </div>
                            <span id="pod-span-ele" onClick={handleSwitch}>{concatted}</span>
                        </>
                    }
                </div>
            }
            {(id != typeId || type === "pods") && 
                <div className="pod-element" id="extra-btm-marign">
                    {isGroup &&
                        <>
                            <Diversity3Icon id="group-icon" />
                            <span id="pod-span-ele" onClick={handleSwitch}>{concatted}</span>
                        </>
                    }
                    {!isGroup &&
                        <>
                            <div>
                                <button className="profile-icon" id='size-override'>{concatted[0]?.toUpperCase()}</button>
                            </div>
                            <span id="pod-span-ele" onClick={handleSwitch}>{concatted}</span>
                        </>

                    }
                </div>
            
            }
        
        </>
        
       
    )
}

export default DmAndElement