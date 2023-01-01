import { useHistory } from 'react-router-dom';

const WorkAreasListEle = ({workarea}) => {
    const history = useHistory();


    console.log('workarea', workarea)

    const handleClick = (e) => {
        e.preventDefault();
        history.push(`/client/workareas/${workarea.id}/pods/1`)
    }

    return (
        <>
            <button onClick={handleClick} key={workarea.id}>{workarea.name}</button>
        </>
    )
}

export default WorkAreasListEle;