import { useHistory, useParams } from "react-router-dom";
import {useState, useEffect} from 'react';
import "./PodElement.css"
import TagIcon from '@mui/icons-material/Tag';
import LockIcon from '@mui/icons-material/Lock';

const PodElement = ({pod}) => {
    const { id, name } = pod 

    const { workareaId, typeId, type } = useParams();
    const [selected, setSelected] = useState(false);
    useEffect(() => {
        setSelected(true)
    },[])
    
    const history = useHistory();
    const handleSwitch = (e) => {
        e.preventDefault();
        history.push(`/client/workareas/${workareaId}/pods/${pod.id}`)
    }
    return (
        < > 
            { (id == typeId && type === "pods" )&& 
                <div className="pod-element pod-span-ele-active"  >
                    {pod.private && 
                        <LockIcon id="lock-hash-icon" />
                    }
                    {!pod.private && 
                        <TagIcon id="hash-icon-only" />
                    }
                    <span onClick={handleSwitch} id="pod-span-ele">{name}</span>
                </div>
            }
            {(id != typeId || type === "dms")&&
                <div className="pod-element" >
                    {pod.private &&
                        <LockIcon id="lock-hash-icon" />
                    }
                    {!pod.private &&
                        <TagIcon id="hash-icon-only" />
                    }
                    <span onClick={handleSwitch} id="pod-span-ele">{name}</span>
                </div>
            }
        </ >
    )
}

export default PodElement