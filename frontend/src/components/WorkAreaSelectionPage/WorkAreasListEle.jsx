import { useHistory } from 'react-router-dom';

const WorkAreasListEle = ({workarea}) => {
    const history = useHistory();


    const handleClick = (e) => {
        e.preventDefault();
        history.push(`/client/workareas/${workarea.id}`)
    }

    return (
        <>
            <button onClick={handleClick} key={workarea.id}>{workarea.name}</button>
        </>
    )
}

export default WorkAreasListEle;