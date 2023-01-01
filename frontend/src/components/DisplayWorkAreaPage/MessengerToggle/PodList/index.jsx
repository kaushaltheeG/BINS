import PodElement from "./PodElement"


const PodList = ({workarea}) => {
    console.log('hit')
    console.log('workarea', workarea)
    let pods = !Object.keys(workarea).length ? null : Object.values(workarea.pods)
    console.log('pods', pods)
    return (
        <div className="pod-list">
            { pods?.map(pod => (
                <PodElement pod={pod} />
            )) 

            }
        </div>
    )
}

export default PodList