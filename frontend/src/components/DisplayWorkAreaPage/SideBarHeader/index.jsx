import "./SideBarHeader.css";


const SideBarHeader = ({ workarea }) => {

    return (
        <div className='sideHeaderContainer'>
            
            <div className="side-bar-wa-name">
                <span id="side-bar-header-name">{workarea.name}
                    <i className="fa fa-sort-desc" aria-hidden="true"></i>
                </span>

            </div>
            
            <div className="icon-div-container">
                <button className="icon-container">
                    <i className="fa fa-pencil-square-o" aria-hidden="true" id='create-icon'></i>
                </button>
            </div>
            
        </div>
    )

}

export default SideBarHeader