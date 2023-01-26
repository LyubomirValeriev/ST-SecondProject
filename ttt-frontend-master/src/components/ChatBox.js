import React, {useRef} from "react";
import {Button} from "@mui/material";
import {offMessageReceived, onMessageReceived, sendMessage} from "../socketClient";
import {getLocalUser} from "../localStore";



class ChatBox extends React.Component {

    constructor(props) {
        super(props);
        this.messageRef = React.createRef();
        this.state = {
            messages: []
        }
        this.handleMessageSend = this.handleMessageSend.bind(this);
        this.updateChatBox = this.updateChatBox.bind(this);
        console.log("constructed")
    }

    componentDidMount() {
        onMessageReceived(this.updateChatBox)
        console.log("mounted")
    }

    componentWillUnmount() {
        console.log("unmounting...")
        offMessageReceived(this.updateChatBox)
    }


    updateChatBox(msgObj){
        console.log("Received:")
        console.log(msgObj)
        console.log(this.state.messages)
        this.setState((prevState) => {
            console.log("Setting state!")
            let cpy = {...prevState}
            cpy.messages = [...prevState.messages]
            console.log("Cpy")
            console.log(cpy)
            cpy.messages.push(msgObj)
            return cpy
        })

    }

    handleMessageSend(e) {
        e.preventDefault()
        const msg = this.messageRef.current.value
        const { username } = getLocalUser();
        const msgObj = {
            message: msg,
            user: username,
            gameId: this.props.gameId,
            timestamp: new Date().getTime()
        }
        sendMessage(msgObj)
        console.log("Sent message: " + msg)
    }

    render() {
        const { username } = getLocalUser();
        return <>
            <div className="chatBox">
                <span className="chatName">Chat</span>
                <div className="chat">
                    {
                        this.state.messages.map((msgObj) =>
                            <span key={msgObj.timestamp} style={{color: msgObj.user === username ? "black" : "red"}}>
                                {msgObj.user}: {msgObj.message} <br/>
                            </span>
                        )
                    }
                </div>
                <form onSubmit={this.handleMessageSend}>
                    <input ref={this.messageRef} type="text" placeholder="Chat here..."/>
                    <Button type="submit">Send</Button>
                </form>

            </div>

        </>;
    }
}

export default ChatBox;