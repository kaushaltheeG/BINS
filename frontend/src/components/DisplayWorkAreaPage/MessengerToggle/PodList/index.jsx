import PodElement from "./PodElement"


const PodList = ({pods}) => {
    console.log('hit')
    console.log('workarea', pods)
    let podsArr;
    let podsLvl = Object.values(pods)
    console.log('lvl', podsLvl);
    if (!podsLvl.length) podsArr = null 
    else  podsArr = Object.values(podsLvl.pop())
    console.log('pods arr', podsArr)
    return (
        <div className="pod-list">
            { podsArr?.map(pod => (
                <PodElement pod={pod} />
            )) 

            }
        </div>
    )
}

export default PodList