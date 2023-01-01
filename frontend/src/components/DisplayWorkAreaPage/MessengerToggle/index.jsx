import PodList from "./PodList"


const MessengerToggle = ({workarea}) => {
    console.log('PodList')

    return (
        <div className="messenger-toggle">
            <PodList workarea={workarea} /> 
        </div>
    )
}

export default MessengerToggle