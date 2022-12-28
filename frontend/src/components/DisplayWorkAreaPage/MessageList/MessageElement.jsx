import "./MessageElement.css"

const MessageElement = ({ message }) => {
    const { id, body, createdAt, updatedAt, authorName } = message; //might need createdAt & modifiedAt


    return (
        <>
            <div className="message-container">
                <div className="profile-icon">
                    <button className="profile-icon"  onClick='#'>{authorName[0].toUpperCase()}</button>
                </div>
                <div className="author-time-body">
                    <div className="author-time">
                        <span className="author-name">{authorName}</span>
                        <span className="timestamp">{updatedAt}</span>
                    </div>
                    <span className="message-body">{body}</span>
                </div>
            </div>
        </>
    )

}

export default MessageElement