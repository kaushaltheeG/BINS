

export const WorkAreaProfile = ({workarea}) => {
    const {name, owner} = workarea

    return (
        <div className="workarea-profile-modal">
            <div className="workeara-profile-icon-model">
                <button id="wa-icon-btn" onClick={e => e.preventDefault()}>{name[0].toUpperCase()}</button>
            </div>
            <div className="workarea-profile-info-modal">
                <p>{name}</p>
                <p id='owner-name'>{owner}</p>
            </div>
        </div>
    )
}

export default WorkAreaProfile;