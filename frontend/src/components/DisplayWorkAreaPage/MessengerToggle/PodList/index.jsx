import PodElement from "./PodElement"
import "./PodList.css"

const PodList = ({pods}) => {
    console.log('hit')
    console.log('workarea', pods)
    let podsArr;
   

    if (!Object.keys(pods).length) podsArr = null;
    else podsArr = Object.values(pods);
    console.log('pods arr', podsArr)
    return (
        <div className="pod-list">
            { podsArr?.map(pod => (
                <PodElement pod={pod} key={pod.id}/>
            )) 

            }
        </div>
    )
}

export default PodList