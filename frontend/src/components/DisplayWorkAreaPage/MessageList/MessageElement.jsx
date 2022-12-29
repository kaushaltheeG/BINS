import "./MessageElement.css"

const MessageElement = ({ message }) => {
    // const { id, body, createdAt, updatedAt, authorName } = message; //might need createdAt & modifiedAt

    console.log(message)
    return (
        <>
            <div className="message-container">
                {message && 
                <>
                    <div className="profile-icon">
                        <button className="profile-icon"  onClick='#'>{message.authorName[0].toUpperCase()}</button>
                    </div>
                    
                    <div className="author-time-body">
                        <div className="author-time">
                            <span className="author-name">{message.authorName}</span>
                            <span className="timestamp">{message.updatedAt}</span>
                        </div>
                        <span className="message-body">{message.body}</span>
                    </div>
                </>
                }
            </div>
        </>
    )

}

export default MessageElement