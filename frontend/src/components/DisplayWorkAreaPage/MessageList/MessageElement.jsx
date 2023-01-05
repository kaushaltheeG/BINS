import "./MessageElement.css"

const MessageElement = ({ message }) => {
    const { id, body, createdAt, updatedAt, authorName } = message; //might need createdAt & modifiedAt

    const timestamp = () => {
        //need to fix 
        let date = new Date(updatedAt)
        let hours = date.getUTCHours();
        let mins = date.getUTCMinutes();
        const isPm = hours > 12 ? 'AM' : 'PM';
        const adjustedHours = !(hours+4) % 12 ? 12 : (hours+4) % 12
        const adjustedMins = mins < 10 ? `0${mins}` : mins
        return `${adjustedHours}:${adjustedMins} ${isPm}`
    }
    // console.log(message)
    return (
        <>
            <div className="message-container">
                {message && 
                <>
                    <div className="profile-icon">
                        <button className="profile-icon" >{authorName[0].toUpperCase()}</button>
                    </div>
                    
                    <div className="author-time-body">
                        <div className="author-time">
                            <span className="author-name">{authorName}</span>
                            <span className="timestamp">{timestamp()}</span>
                        </div>
                        <span className="message-body">{body}</span>
                    </div>
                </>
                }
            </div>
        </>
    )

}

export default MessageElement