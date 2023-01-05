import DmAndElement from "./DmAndGcElement";


const DirectAndGroupList = ({directMessages}) => {
    let dmsArr;

    if (!Object.keys(directMessages).length) dmsArr = null;
    else dmsArr = Object.values(directMessages);
    
    return (
        <div className="pod-list">
            {   dmsArr?.map( dm => (
                <DmAndElement key={dm.id} dm={dm} />
            ))

            }
    
        </div>
    )
}

export default DirectAndGroupList