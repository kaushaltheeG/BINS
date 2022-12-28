

const MessageElement = ({ message }) => {
    const { id, body, authorId, authorEmail } = message; //might need createdAt & modifiedAt

    return (
        <>
            <div>
                <h4>{body}</h4>
                <h5>{authorEmail}</h5>
            </div>
        </>
    )

}

export default MessageElement